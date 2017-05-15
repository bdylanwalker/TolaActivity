# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2017-05-11 14:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0002_auto_20170511_0756'),
        ('indicators', '0003_auto_20170511_0756'),
        ('workflow', '0010_auto_20170315_0944'),
    ]

    operations = [
        migrations.CreateModel(
            name='WorkflowLevel1',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gaitid', models.CharField(blank=True, max_length=255, unique=True, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, verbose_name='Name')),
                ('funding_status', models.CharField(blank=True, max_length=255, verbose_name='Funding Status')),
                ('cost_center', models.CharField(blank=True, max_length=255, null=True, verbose_name='Fund Code')),
                ('description', models.TextField(blank=True, max_length=765, null=True, verbose_name='Description')),
                ('start_date', models.DateTimeField(blank=True, null=True)),
                ('end_date', models.DateTimeField(blank=True, null=True)),
                ('create_date', models.DateTimeField(blank=True, null=True)),
                ('edit_date', models.DateTimeField(blank=True, null=True)),
                ('budget_check', models.BooleanField(default=False, verbose_name='Enable Approval Authority')),
                ('public_dashboard', models.BooleanField(default=False, verbose_name='Enable Public Dashboard')),
                ('country', models.ManyToManyField(to='workflow.Country')),
                ('fund_code', models.ManyToManyField(blank=True, to='workflow.FundCode')),
                ('sector', models.ManyToManyField(blank=True, to='workflow.Sector')),
                ('user_access', models.ManyToManyField(blank=True, to='workflow.TolaUser')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.RemoveField(
            model_name='program',
            name='country',
        ),
        migrations.RemoveField(
            model_name='program',
            name='fund_code',
        ),
        migrations.RemoveField(
            model_name='program',
            name='sector',
        ),
        migrations.RemoveField(
            model_name='program',
            name='user_access',
        ),
        migrations.RemoveField(
            model_name='office',
            name='province',
        ),
        migrations.AddField(
            model_name='office',
            name='country',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='workflow.Country', verbose_name='Admin Level 1'),
        ),
        migrations.AlterField(
            model_name='documentation',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workflow.WorkflowLevel1'),
        ),
        migrations.AlterField(
            model_name='historicalprojectagreement',
            name='community_project_description',
            field=models.TextField(blank=True, help_text='Description must describe how the Community Proposal meets the project criteria', null=True, verbose_name='Describe the project you would like to consider'),
        ),
        migrations.AlterField(
            model_name='historicalprojectagreement',
            name='program',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='workflow.WorkflowLevel1'),
        ),
        migrations.AlterField(
            model_name='historicalprojectcomplete',
            name='program',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='workflow.WorkflowLevel1'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='community_project_description',
            field=models.TextField(blank=True, help_text='Description must describe how the Community Proposal meets the project criteria', null=True, verbose_name='Describe the project you would like to consider'),
        ),
        migrations.AlterField(
            model_name='projectagreement',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='agreement', to='workflow.WorkflowLevel1', verbose_name='Program'),
        ),
        migrations.AlterField(
            model_name='projectcomplete',
            name='program',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='complete', to='workflow.WorkflowLevel1'),
        ),
        migrations.AlterField(
            model_name='tolabookmarks',
            name='program',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='workflow.WorkflowLevel1'),
        ),
        migrations.DeleteModel(
            name='Program',
        ),
    ]
