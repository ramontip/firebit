# Generated by Django 3.2.11 on 2022-01-23 10:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('firebit_api', '0013_passwordreset'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PasswordReset',
        ),
    ]