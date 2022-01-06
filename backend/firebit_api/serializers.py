from rest_framework import serializers

from datetime import datetime

from firebit_api.models import Bit, Bookmark, Category, Comment, Image, Like, Friendship, FriendshipStatus
from django.contrib.auth.models import User


class BitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bit
        fields = '__all__'

    def create(self, validated_data):
        bit = Bit.objects.create(**validated_data)
        return bit

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.hashtags = validated_data.get('hashtags', instance.hashtags)
        instance.category = validated_data.get('category', instance.category)
        instance.updated_at = datetime.now()

        instance.save()
        return instance


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        return comment


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = '__all__'


class FriendshipStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipStatus
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
