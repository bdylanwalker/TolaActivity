# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-09-18 10:01
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0016_auto_20170913_0614'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='level',
            name='workflowlevel1',
        ),
    ]