import json
from unicodedata import category
from rest_framework import viewsets, permissions
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.decorators import action


from . import models
from .serializers import *

from django.db.models import Q

class BitViewSet(viewsets.ViewSet):

    def list(self, request, format=None):

        queryset = models.Bit.objects.all()

        category = request.GET.get("category")
        user = request.GET.get("auth_user")

        if category:
            queryset = queryset.filter(category__title__iexact=category)
            # queryset = models.Bit.objects.filter(Q(category__pk=category) | Q(category__title=category))
        if user:
            queryset = queryset.filter(auth_user__username__iexact=user)

        serializer = BitSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request, format=None):
        serializer = BitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, format=None):
        try:
            bit = models.Bit.objects.get(
                pk=pk
            )
            serializer = BitSerializer(bit)
            return Response(serializer.data, status=200)

        except models.Bit.DoesNotExist:
            return Response(status=404)

    def update(self, request, pk=None, format=None):
        try:
            bit = models.Bit.objects.get(
                pk=pk
            )
            serializer = BitSerializer(bit, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=201
                )
            else:
                return Response(serializer.errors, status=400)
        except models.Bit.DoesNotExist:
            return Response(status=404)

    def partial_update(self, request, pk=None, format=None):
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        try:
            bit = models.Bit.objects.filter(
                pk=pk
            ).delete()
        except models.Bit.DoesNotExist:
            return Response(status=404)

        return Response(status=204)


class CommentViewSet(viewsets.ViewSet):

    def list(self, request, format=None):
        queryset = models.Comment.objects.all()

        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request, format=None):

        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, format=None):
        try:
            comment = models.Comment.objects.get(
                pk=pk
            )
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=200)

        except models.Comment.DoesNotExist:
            return Response(status=404)

    def update(self, request, pk=None, format=None):
        return Response(status=405)

    def partial_update(self, request, pk=None, format=None):
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        try:
            comment = models.Comment.objects.filter(
                pk=pk
            ).delete()
        except models.Comment.DoesNotExist:
            return Response(status=404)

        return Response(status=204)


class SearchViewSet(viewsets.ViewSet):

    @action(methods=['get'], detail=False, url_path='users', url_name='users')
    def user(self, request):
        return Response(status=501)

    @action(methods=['get'], detail=False, url_path='bits', url_name='bits')
    def bit(self, request):
        return Response(status=501)

    @action(methods=['get'], detail=False, url_path='categories', url_name='categories')
    def category(self, request):
        return Response(status=501)


class CategoryViewSet(viewsets.ViewSet):

    def list(self, request, format=None):

        if request.GET.get("title") is None:
            queryset = models.Category.objects.all()
        else:
            queryset = models.Category.objects.filter(title__iexact=request.GET.get("title"))

        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request, format=None):
        return Response(status=405)

    def retrieve(self, request, pk=None, format=None):
        try:
            comment = models.Category.objects.get(
                pk=pk
            )
            serializer = CategorySerializer(comment)
            return Response(serializer.data, status=200)

        except models.Comment.DoesNotExist:
            return Response(status=404)

    def update(self, request, pk=None, format=None):
        return Response(status=405)

    def partial_update(self, request, pk=None, format=None):
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        return Response(status=405)


class UserViewSet(viewsets.ViewSet):

    def list(self, request, format=None):
        queryset = models.User.objects.all()

        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, format=None):
        try:
            user = models.User.objects.get(
                pk=pk
            )
            serializer = UserSerializer(user)
            return Response(serializer.data, status=200)

        except models.User.DoesNotExist:
            return Response(status=404)

    def update(self, request, pk=None, format=None):
        try:
            user = models.User.objects.get(
                pk=pk
            )
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=201
                )
            else:
                return Response(serializer.errors, status=400)
        except models.User.DoesNotExist:
            return Response(status=404)

    def partial_update(self, request, pk=None, format=None):
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        try:
            user = models.User.objects.filter(
                pk=pk
            ).delete()
        except models.User.DoesNotExist:
            return Response(status=404)

        return Response(status=204)


class FriendshipViewSet(viewsets.ViewSet):

    def list(self, request, format=None):

        auth_user = request.GET.get("auth_user")
        status = request.GET.get("status")

        queryset = models.Friendship.objects.all()

        if auth_user:
            queryset = queryset.filter(Q(from_auth_user__username=auth_user) | Q(to_auth_user__username=auth_user))
        if status:
            queryset = queryset.filter(friendship_status=status)

        serializer = FriendshipSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request, format=None):
        serializer = FriendshipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, format=None):
        try:
            friendship = models.Friendship.objects.get(
                pk=pk
            )
            serializer = FriendshipSerializer(friendship)
            return Response(serializer.data, status=200)

        except models.Friendship.DoesNotExist:
            return Response(status=404)

    def update(self, request, pk=None, format=None):
        try:
            friendship = models.Friendship.objects.get(
                pk=pk
            )
            serializer = FriendshipSerializer(friendship, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=201
                )
            else:
                return Response(serializer.errors, status=400)
        except models.Friendship.DoesNotExist:
            return Response(status=404)

    def partial_update(self, request, pk=None, format=None):
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        try:
            friendship = models.Friendship.objects.filter(
                pk=pk
            ).delete()
        except models.Friendship.DoesNotExist:
            return Response(status=404)

        return Response(status=204)


class LikeViewSet(viewsets.ViewSet):

    def list(self, request, format=None):
        return Response(status=405)

    def create(self, request, format=None):
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, format=None):
        try:
            like = models.Like.objects.get(
                pk=pk
            )
            serializer = LikeSerializer(like)
            return Response(serializer.data, status=200)

        except models.Like.DoesNotExist:
            return Response(status=404)

    def update(self, request, pk=None, format=None):
        return Response(status=405)

    def partial_update(self, request, pk=None, format=None):
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        try:
            like = models.Like.objects.filter(
                pk=pk
            ).delete()
        except models.Like.DoesNotExist:
            return Response(status=404)

        return Response(status=204)


class BookmarkViewSet(viewsets.ViewSet):

    def list(self, request, format=None):
        return Response(status=405)

    def create(self, request, format=None):
        serializer = BookmarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, format=None):
        try:
            bookmark = models.Bookmark.objects.get(
                pk=pk
            )
            serializer = BookmarkSerializer(bookmark)
            return Response(serializer.data, status=200)

        except models.Bookmark.DoesNotExist:
            return Response(status=404)

    def update(self, request, pk=None, format=None):
        return Response(status=405)

    def partial_update(self, request, pk=None, format=None):
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        try:
            bookmark = models.Bookmark.objects.filter(
                pk=pk
            ).delete()
        except models.Bookmark.DoesNotExist:
            return Response(status=404)

        return Response(status=204)
