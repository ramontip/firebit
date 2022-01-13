from django.contrib import admin
from firebit_api import models


class BitAdmin(admin.ModelAdmin):
    pass


class CategoryAdmin(admin.ModelAdmin):
    pass


class CommentAdmin(admin.ModelAdmin):
    pass


class LikeAdmin(admin.ModelAdmin):
    pass


class ImageAdmin(admin.ModelAdmin):
    pass


class FriendshipAdmin(admin.ModelAdmin):
    pass


class FriendshipStatusAdmin(admin.ModelAdmin):
    pass


class UserDetailsAdmin(admin.ModelAdmin):
    pass


admin.site.site_header = 'Firebit API'
admin.site.register(models.Bit, BitAdmin)
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Comment, CommentAdmin)
admin.site.register(models.Like, LikeAdmin)
admin.site.register(models.Image, ImageAdmin)
admin.site.register(models.Friendship, FriendshipAdmin)
admin.site.register(models.FriendshipStatus, FriendshipStatusAdmin)
admin.site.register(models.UserDetails, UserDetailsAdmin)
