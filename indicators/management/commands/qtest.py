import datetime
from django.db.models import Sum, Count, Q, When, Case, F, Max, OuterRef, Subquery, Value, DecimalField
from django.contrib.auth.models import User
from indicators.models import Indicator, PeriodicTarget, CollectedData
from workflow.models import Country, Program, TolaUser

from django.core.management.base import BaseCommand, CommandError
from indicators.models import *
from django.utils import timezone


class WickedSum(Subquery):
    template = 'SELECT SUM("target") FROM %s' % Subquery


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):

        currdate = datetime.date(2020,8,3)

        """
        Try a regular annotation 
        """
        print "Test #1: Regular annotation"
        inds = Indicator.objects.filter(program__country__in=[12])
        inds.prefetch_related('collecteddata_set', 'periodictargets')

        last_target = PeriodicTarget.objects \
            .filter(indicator=OuterRef('pk'), end_date__lt=currdate) \
            .order_by('-end_date', '-pk')

        last_achieved = CollectedData.objects \
            .filter(indicator=OuterRef('pk'), periodic_target__end_date__lt=currdate) \
            .order_by('-date_collected', '-pk')

        inds2 = inds.annotate(
            program_to_date_target=Sum(
                Case(
                    When(
                        Q(unit_of_measure_type=Indicator.NUMBER) &
                        Q(is_cumulative=False) &
                        Q(periodictargets__isnull=False) &
                        Q(periodictargets__end_date__lte=Subquery(last_target.values('end_date')[:1])),
                        then=F('periodictargets__target')

                    ),
                    default=Value(0)

                )
            ),
            program_to_date_achieved=Sum(
                Case(
                    When(
                        Q(unit_of_measure_type=Indicator.NUMBER) &
                        Q(is_cumulative=False) &
                        Q(periodictargets__collecteddata__isnull=False) &
                        Q(periodictargets__collecteddata__date_collected__lte=Subquery(
                            last_achieved.values('date_collected')[:1])),
                        then=F('periodictargets__collecteddata__achieved')
                    ),
                    default=Value(0)

                )
            )
        )

        # print inds2.query
        self.print_queryset(inds2, currdate)

        """
        Try an annotation with a Subquery
        """
        print "Test #2: Annotation with Subquery"

        last_target = PeriodicTarget.objects \
            .filter(indicator=OuterRef('pk'), end_date__lt=currdate) \
            .order_by('-end_date', '-pk')

        achieved_total = CollectedData.objects \
            .filter(indicator=OuterRef('pk')) \
            .order_by()\
            .values('indicator_id')\
            .annotate(total=Sum('achieved'))\
            .values('total')

        achieved_total_8166 = CollectedData.objects \
            .filter(periodic_target=8166) \
            .order_by() \
            .values('periodic_target') \
            .annotate(total=Sum('achieved'))\
            .values('total')
        print 'achieved total for pt-8166', achieved_total_8166

        # target_total = PeriodicTarget.objects \
        #     .filter(indicator=OuterRef('pk'), end_date__lt=currdate) \
        #     .order_by()\
        #     .values('indicator_id')\
        #     .annotate(total=Sum('achieved'))\
        #     .values('total')

        inds3 = inds.annotate(
            program_to_date_target=Sum(
                Case(
                    When(
                        Q(unit_of_measure_type=Indicator.NUMBER) &
                        Q(is_cumulative=False) &
                        Q(periodictargets__isnull=False) &
                        Q(periodictargets__end_date__lte=Subquery(last_target.values('end_date')[:1])),
                        then=F('periodictargets__target')

                    ),
                    default=Value(0)

                )
            ),
            program_to_date_achieved=Sum(
                Case(
                    When(
                        Q(unit_of_measure_type=Indicator.NUMBER) &
                        Q(is_cumulative=False) &
                        Q(periodictargets__end_date__lte=Subquery(last_target.values('end_date')[:1])),
                        then=Subquery(achieved_total)
                    ),
                    default=Value(0)

                )
            )
        )

        #print inds2.query
        self.print_queryset(inds3, currdate)

        """
        Try an annotation with a Subquery
        """
        print "Test #3: Separate target and collected data queries"

        last_target = PeriodicTarget.objects \
            .filter(indicator=OuterRef('pk'), end_date__lt=currdate) \
            .order_by('-end_date', '-pk')

        achieved_total_8166 = CollectedData.objects \
            .filter(periodic_target=8166) \
            .order_by() \
            .values('periodic_target') \
            .annotate(total=Sum('achieved')) \
            .values('total')
        print 'achieved total for pt-8166', achieved_total_8166

        data_values = {}

        target_queryset = inds.annotate(
            program_to_date_target=Sum(
                Case(
                    When(
                        Q(unit_of_measure_type=Indicator.NUMBER) &
                        Q(is_cumulative=False) &
                        Q(periodictargets__isnull=False) &
                        Q(periodictargets__end_date__lte=Subquery(last_target.values('end_date')[:1])),
                        then=F('periodictargets__target')

                    ),
                    default=Value(0)

                )
            )
        )

        achieved_queryset = inds.annotate(
            program_to_date_achieved=Sum(
                Case(
                    When(
                        Q(unit_of_measure_type=Indicator.NUMBER) &
                        Q(is_cumulative=False) &
                        Q(periodictargets__end_date__lte=Subquery(last_target.values('end_date')[:1])),
                        then=F('periodictargets__collecteddata__achieved')
                    ),
                    default=Value(0)

                )
            )
        )

        for indicator in inds:
            i_id = indicator.id
            for target in target_queryset.get(id=i_id).periodictargets.all():

            data_values[i_id]{'targets'}=target_queryset = target_queryset.filter(id=i_achieved.id).annotate(program_to_date_achieved=Value(i_achieved.program_to_date_achieved, output_field=DecimalField()))
            print target_queryset.get(id=i_achieved.id).program_to_date_achieved

        self.print_queryset(target_queryset, currdate)

    def print_queryset(self, indicator_queryset, currdate):
        # for i in indicator_queryset:
        #     print i.id, i.name[:30],'target',i.program_to_date_target,'achieved', i.program_to_date_achieved
        # print(indicator_queryset.count())
        from django.core.exceptions import FieldError

        print 'date used:', currdate
        print '{i.id}, {i.name}'.format(i=indicator_queryset.get(id=4986))
        try:
            print 'target={i.program_to_date_target}, achieved={i.program_to_date_achieved}'.format(
                i=indicator_queryset.get(id=4986))
        except AttributeError:
            try:
                print 'target={i.program_to_date_target}'.format(i=indicator_queryset.get(id=4986))
            except AttributeError:
                pass
            try:
                print 'achieved={i.program_to_date_achieved}'.format(i=indicator_queryset.get(id=4986))
            except AttributeError:
                pass

        print 'all 4986 targets', ['end {1}: {0}'.format(pt.target, pt.end_date) for pt in Indicator.objects.get(id=4986).periodictargets.all()]
        print 'all 4986 achieved', ['{1}: {0}'.format(cd.achieved, cd.date_collected) for cd in Indicator.objects.get(id=4986).collecteddata_set.all()]
        print "\n++++++++++++++++++++++++++++++++++++\n"


    def get_results_data(self, indicator_queryset):

        results_data = {}


        for indicator in indicator_queryset:
            periodic_targets = indicator.periodictargets.all()
            print 'id', indicator.id
            for pt in indicator.periodictargets.all():
                print 'pt', pt.period, str(pt.end_date)
