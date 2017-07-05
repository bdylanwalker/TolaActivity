# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-07-05 08:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0012_auto_20170630_0101'),
    ]

    operations = [
        migrations.CreateModel(
            name='Award',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True, verbose_name='Award Name/Title')),
                ('amount', models.IntegerField(blank=True, default=0, verbose_name='Amount')),
                ('status', models.CharField(choices=[('open', 'Open'), ('funded', 'Funded'), ('awaiting', 'Awaiting Funding'), ('closed', 'Closed')], default='Open', max_length=50)),
                ('create_date', models.DateTimeField(blank=True, null=True)),
                ('edit_date', models.DateTimeField(blank=True, null=True)),
                ('countries', models.ManyToManyField(blank=True, related_name='countries_award', to='workflow.Country', verbose_name='Countries')),
                ('donors', models.ManyToManyField(blank=True, to='workflow.Stakeholder')),
                ('organization', models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='workflow.Organization')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.AlterField(
            model_name='workflowmodules',
            name='modules',
            field=models.CharField(choices=[('approval', 'Approval'), ('budget', 'Budget'), ('stakeholders', 'Stakeholders'), ('documents', 'Documents'), ('risk_issues', 'Risks and Issues'), ('case_management', 'Case Management'), ('procurement_plan', 'Procurement Plan')], default='open', max_length=50),
        ),
    ]
