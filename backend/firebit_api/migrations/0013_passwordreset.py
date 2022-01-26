# Generated by Django 3.2.11 on 2022-01-23 10:18

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('firebit_api', '0012_auto_20220121_1019'),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordReset',
            fields=[
                ('auth_user_email', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='auth.user')),
                ('token', models.CharField(max_length=50)),
                ('validation_date', models.DateTimeField(verbose_name=datetime.datetime(2022, 1, 24, 11, 18, 47, 122081))),
            ],
            options={
                'verbose_name_plural': 'Password Reset',
            },
        ),
    ]
