from django.db import models
from django.contrib.auth.models import User


# UserThumbnail
class UserDetails(models.Model):
    auth_user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=100)
    content_type = models.CharField(max_length=100)
    path = models.CharField(max_length=100)
    about = models.CharField(max_length=255)

    def __str__(self):
        return '{}'.format(self.file_name)

    class Meta:
        verbose_name_plural = 'User Details'


class FriendshipStatus(models.Model):
    status = models.CharField(max_length=100)

    def __str__(self):
        return '{}'.format(self.status)

    class Meta:
        verbose_name_plural = 'Friendship Status'


class Friendship(models.Model):
    from_auth_user = models.ForeignKey(User, related_name='from_auth_user', on_delete=models.CASCADE)
    to_auth_user = models.ForeignKey(User, related_name='to_auth_user', on_delete=models.CASCADE)
    friendship_status = models.ForeignKey(FriendshipStatus, on_delete=models.PROTECT, default=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.id)

    class Meta:
        verbose_name_plural = 'Friendships'


class Category(models.Model):
    title = models.CharField(max_length=100)
    color = models.IntegerField()

    def __str__(self):
        return '{}'.format(self.title)

    class Meta:
        verbose_name_plural = 'Categories'


class Bit(models.Model):
    auth_user = models.ForeignKey(User, on_delete=models.PROTECT)
    title = models.CharField(max_length=100)
    content = models.TextField()
    hashtags = models.JSONField(null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.title)

    class Meta:
        verbose_name_plural = 'Bits'
        ordering = ['-created_at']


class Comment(models.Model):
    bit = models.ForeignKey(Bit, on_delete=models.PROTECT)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.content)

    class Meta:
        verbose_name_plural = 'Comments'


class Like(models.Model):
    bit = models.ForeignKey(Bit, on_delete=models.PROTECT)
    auth_user = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.id)

    class Meta:
        verbose_name_plural = 'Likes'


class Bookmark(models.Model):
    bit = models.ForeignKey(Bit, on_delete=models.PROTECT)
    auth_user = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.id)

    class Meta:
        verbose_name_plural = 'Bookmarks'


class Image(models.Model):
    bit = models.ForeignKey(Bit, on_delete=models.PROTECT)
    file_name = models.CharField(max_length=255)
    content_type = models.CharField(max_length=100)
    path = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.file_name)

    class Meta:
        verbose_name_plural = 'Images'
