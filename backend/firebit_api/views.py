from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models
from .serializers import *


class BitViewSet(viewsets.ViewSet):

    def list(self, request, format=None):

        queryset = models.Bit.objects.all()

        # TODO: "type" filter -> [own,other,liked,commented,bookmarked]

        category = request.GET.get("category")
        user = request.GET.get("auth_user")
        hashtag = request.GET.get("hashtag")

        if category:
            queryset = queryset.filter(category__title__iexact=category)
            # queryset = models.Bit.objects.filter(Q(category__pk=category) | Q(category__title=category))
        if user:
            queryset = queryset.filter(auth_user__username__iexact=user)
        if hashtag:
            queryset = queryset.filter(hashtags__contains=' ' + hashtag + ' ')

        queryset = queryset.order_by(request.GET.get("order_by") or "pk")

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

    # this creates the url: bits/{bitId}/comments/
    @action(methods=['get'], detail=True, url_path='comments', url_name='comments')
    def list_comments(self, request, pk=None):
        try:
            bit = models.Bit.objects.get(
                pk=pk
            )
            queryset = models.Comment.objects.filter(bit=bit)
            queryset = queryset.order_by(request.GET.get("order_by") or "pk")

            serializer = CommentSerializer(queryset, many=True)
            return Response(serializer.data, status=200)

        except models.Bit.DoesNotExist:
            return Response(status=404)

    # this creates the url: bits/{bitId}/likes/
    @action(methods=['get'], detail=True, url_path='likes', url_name='likes')
    def list_likes(self, request, pk=None):
        try:
            bit = models.Bit.objects.get(
                pk=pk
            )
            queryset = models.Like.objects.filter(bit=bit)
            queryset = queryset.order_by(request.GET.get("order_by") or "pk")

            serializer = LikeSerializer(queryset, many=True)
            return Response(serializer.data, status=200)

        except models.Bit.DoesNotExist:
            return Response(status=404)

    # this creates the url: bits/{bitId}/bookmarks/
    @action(methods=['get'], detail=True, url_path='bookmarks', url_name='bookmarks')
    def list_bookmarks(self, request, pk=None):
        try:
            bit = models.Bit.objects.get(
                pk=pk
            )

            queryset = models.Bookmark.objects.filter(bit=bit)
            queryset = queryset.order_by(request.GET.get("order_by") or "pk")

            serializer = BookmarkSerializer(queryset, many=True)
            return Response(serializer.data, status=200)

        except models.Bit.DoesNotExist:
            return Response(status=404)


class CommentViewSet(viewsets.ViewSet):

    def list(self, request, format=None):
        queryset = models.Comment.objects.all()
        queryset = queryset.order_by(request.GET.get("order_by") or "pk")

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

        queryset = queryset.order_by(request.GET.get("order_by") or "pk")

        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def create(self, request, format=None):
        return Response(status=405)

    def retrieve(self, request, pk=None, format=None):
        try:
            category = models.Category.objects.get(
                pk=pk
            )
            serializer = CategorySerializer(category)
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
        queryset = queryset.order_by(request.GET.get("order_by") or "pk")

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

    # this creates the url: user/{userId}/liked_bits/
    @action(methods=['get'], detail=True, url_path='liked_bits', url_name='Liked Bits')
    def list_liked_bits(self, request, pk=None):
        try:
            likes = models.Like.objects.filter(auth_user=pk)
            likes = likes.order_by(request.GET.get("order_by") or "pk")

            # "map" likes to the respective bits
            liked_bits = [l.bit for l in likes]

            # queryset = models.Bit.objects.filter(pk__in=liked_bits)
            serializer = BitSerializer(liked_bits, many=True)
            return Response(serializer.data, status=200)

        except models.User.DoesNotExist:
            return Response(status=404)

    # this creates the url: user/{userId}/liked_bits/
    @action(methods=['get'], detail=True, url_path='commented_bits', url_name='Commented Bits')
    def list_commented_bits(self, request, pk=None):
        try:
            # TODO: Comments have no auth_user attribute yet
            comments = models.Comment.objects.filter(auth_user=pk)
            comments = comments.order_by(request.GET.get("order_by") or "pk")

            # "map" likes to the respective bits
            # convert to a set to remove duplicates
            commented_bits = set([c.bit for c in comments])

            serializer = BitSerializer(commented_bits, many=True)
            return Response(serializer.data, status=200)

        except models.User.DoesNotExist:
            return Response(status=404)

    # this creates the url: user/{userId}/bookmarks/
    @action(methods=['get'], detail=True, url_path='bookmarks', url_name='Bookmarks')
    def list_bookmarks(self, request, pk=None):
        try:
            bookmarks = models.Bookmark.objects.filter(auth_user=pk)
            bookmarks = bookmarks.order_by(request.GET.get("order_by") or "pk")

            bookmarked_bits = [b.bit for b in bookmarks]

            serializer = BitSerializer(bookmarked_bits, many=True)
            return Response(serializer.data, status=200)

        except models.User.DoesNotExist:
            return Response(status=404)


class FriendshipViewSet(viewsets.ViewSet):

    def list(self, request, format=None):

        auth_user = request.GET.get("auth_user")
        status = request.GET.get("status")

        queryset = models.Friendship.objects.all()

        if auth_user:
            queryset = queryset.filter(Q(from_auth_user__username=auth_user) | Q(to_auth_user__username=auth_user))
        if status:
            queryset = queryset.filter(friendship_status=status)

        queryset = queryset.order_by(request.GET.get("order_by") or "pk")

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
        # return Response(status=405)

        queryset = models.Like.objects.all()
        queryset = queryset.order_by(request.GET.get("order_by") or "pk")

        serializer = LikeSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

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
        # return Response(status=405)

        queryset = models.Bookmark.objects.all()
        queryset = queryset.order_by(request.GET.get("order_by") or "pk")

        serializer = BookmarkSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

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
