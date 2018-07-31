from django.db.models import Sum, Count, Q, When, Case, F, Max, OuterRef, Subquery
from django.contrib.auth.models import User
from indicators.models import Indicator, PeriodicTarget, CollectedData
from workflow.models import Country, Program, TolaUser

from django.core.management.base import BaseCommand, CommandError
from indicators.models import *
from django.utils import timezone


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        u = User.objects.get(username='mkhan')
        # u.tola_user.country
        countries = u.tola_user.countries.all()

        inds = Indicator.objects.filter(program__country__in=countries)
        inds = inds.prefetch_related('collecteddata_set', 'periodictargets')
        currdate = timezone.now()

        last_target = PeriodicTarget.objects \
            .filter(indicator=OuterRef('pk'), end_date__lt=currdate, collecteddata__isnull=False) \
            .order_by('-end_date', '-pk')

        # last_target = PeriodicTarget.objects.filter(
        #         indicator=OuterRef('pk'), end_date__lt=currdate).order_by('-end_date', '-pk')

        inds2 = inds.annotate(
            results_noncumulative_sum=Sum(
                Case(
                    When(
                        Q(unit_of_measure_type=Indicator.NUMBER) &
                        Q(is_cumulative=False) &
                        Q(collecteddata__periodic_target__isnull=False) &
                        Q(collecteddata__date_collected__lt=Subquery(last_target.values('end_date')[:1])),
                        then=F('collecteddata__achieved')
                    ),
                )
            ),
            results_cumulative_sum=Sum(
                Case(
                    When(
                        Q(is_cumulative=True) &
                        Q(collecteddata__periodic_target__end_date=Subquery(last_target.values('end_date')[:1])),
                        then=F('collecteddata__achieved')
                    ),
                )
            )
        )

        for i in inds2:
            print(i.id, i.results_noncumulative_sum, i.results_cumulative_sum)
        print(inds2.count())
