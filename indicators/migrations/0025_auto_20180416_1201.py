# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-04-16 19:01
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('indicators', '0024_auto_20180406_1901'),
    ]

    operations = [
        migrations.AlterField(
            model_name='level',
            name='create_date',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2018, 4, 16, 19, 1, 47, 973253, tzinfo=utc), verbose_name='Create date'),
            preserve_default=False,
        ),
    ]