# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-28 06:45
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0009_auto_20170726_2354'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documentation',
            name='document_uuid',
            field=models.CharField(blank=True, default=uuid.uuid4, max_length=255, unique=True, verbose_name='Document UUID'),
        ),
        migrations.AlterField(
            model_name='historicalworkflowlevel2',
            name='status',
            field=models.CharField(blank=True, choices=[('open', 'Open'), ('awaitingapproval', 'Awaiting Approval'), ('tracking', 'Tracking'), ('closed', 'Closed')], default='open', max_length=50),
        ),
        migrations.AlterField(
            model_name='workflowlevel2',
            name='status',
            field=models.CharField(blank=True, choices=[('open', 'Open'), ('awaitingapproval', 'Awaiting Approval'), ('tracking', 'Tracking'), ('closed', 'Closed')], default='open', max_length=50),
        ),
    ]