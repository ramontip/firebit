# Generated by Django 3.2.10 on 2022-01-06 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firebit_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bit',
            name='hashtags',
            field=models.JSONField(null=True),
        ),
    ]