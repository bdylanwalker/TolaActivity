from django.db.models import Sum, Count, Q, When, Case, F, Max, OutputField
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
        inds2 = inds.annotate(
            # last_target = Get the Last PASSED TARGET
            last_target=Max(
                Case(
                    When(periodictargets__end_date__lt=currdate),
                    then=F('collecteddata__achieved')
                )
            ),
            targets_sum=Sum(
                        Case(
                            When(
                                Q(unit_of_measure_type=Indicator.NUMBER) &
                                Q(is_cumulative=False) &
                                Q(collecteddata__periodic_target__isnull=False) &
                                Q(collecteddata__date_collected__lt=currdate),
                                then=F('collecteddata__achieved')
                            ),
                        )
                    )
                )

        for i in inds2:
            print(i.id, i.targets_sum, i.last_target)
        print(inds2.count())
