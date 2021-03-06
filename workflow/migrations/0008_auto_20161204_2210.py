# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-12-05 06:10
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workflow', '0007_auto_20161204_2113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tolabookmarks',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tolabookmark', to='workflow.TolaUser'),
        ),
        migrations.AlterField(
            model_name='tolauser',
            name='organization',
            field=models.ForeignKey(blank=True, default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='workflow.Organization'),
        ),
    ]
