# Generated by Django 3.2.10 on 2022-01-17 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firebit_api', '0006_auto_20220114_1451'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bit',
            name='hashtags',
            field=models.TextField(null=True),
        ),
    ]