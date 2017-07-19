# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-19 11:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0006_auto_20170719_0011'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicalworkflowlevel2',
            name='activity_sort',
        ),
        migrations.RemoveField(
            model_name='workflowlevel1',
            name='project_sort',
        ),
        migrations.RemoveField(
            model_name='workflowlevel2',
            name='activity_sort',
        ),
        migrations.AddField(
            model_name='historicalworkflowlevel2',
            name='sort',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='workflowlevel1',
            name='sort',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='workflowlevel2',
            name='sort',
            field=models.IntegerField(default=0),
        ),
    ]
