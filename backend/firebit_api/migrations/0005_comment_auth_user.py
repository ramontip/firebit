# Generated by Django 3.2.10 on 2022-01-14 09:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('firebit_api', '0004_alter_friendship_friendship_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='auth_user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='auth.user'),
            preserve_default=False,
        ),
    ]