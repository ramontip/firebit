from datetime import datetime

from django.contrib.auth.models import User
from rest_framework import serializers

from firebit_api.models import Bit, Bookmark, Category, Comment, Image, Like, Friendship, FriendshipStatus, UserDetails


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

    def create(self, validated_data):
        image = Image.objects.create(**validated_data)
        return image


class BitSerializer(serializers.ModelSerializer):
    images = ImageSerializer(source='image_set', many=True, required=False)

    class Meta:
        model = Bit
        fields = '__all__'

    def create(self, validated_data):
        hashtags = ' '
        for i in validated_data['content'].split():
            if i.startswith('#'):
                hashtags += i[1:] + ' '
        validated_data['hashtags'] = hashtags

        bit = Bit.objects.create(**validated_data)

        return bit

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.category = validated_data.get('category', instance.category)
        instance.updated_at = datetime.now()

        hashtags = ' '
        for i in validated_data['content'].split():
            if i.startswith('#'):
                hashtags += i[1:] + ' '
        instance.hashtags = hashtags

        instance.save()
        return instance


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'

    def create(self, validated_data):
        bookmark = Bookmark.objects.create(**validated_data)
        return bookmark


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


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

    def create(self, validated_data):
        like = Like.objects.create(**validated_data)
        return like


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = '__all__'

    def create(self, validated_data):
        friendship = Friendship.objects.create(**validated_data)
        return friendship

    def update(self, instance, validated_data):
        instance.friendship_status = validated_data.get('friendship_status', instance.friendship_status)
        instance.updated_at = datetime.now()

        instance.save()
        return instance


class FriendshipStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipStatus
        fields = '__all__'


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'

    def create(self, validated_data):
        user_details = UserDetails.objects.create(**validated_data)
        return user_details


class UserSerializer(serializers.ModelSerializer):
    userdetails = UserDetailsSerializer(required=True)

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.password = validated_data.get('password', instance.password)
        instance.username = validated_data.get('username', instance.username)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        # instance.updated_at = datetime.now()

        instance.save()
        return instance
