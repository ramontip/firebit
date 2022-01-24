import os

from django.contrib.auth import authenticate
from django.core.mail import EmailMultiAlternatives
from django.db.models import Q
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.parsers import FileUploadParser
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

        if category is not None:
            queryset = queryset.filter(category__title__iexact=category)
            # queryset = models.Bit.objects.filter(Q(category__pk=category) | Q(category__title=category))
        if user is not None:
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
            bit = models.Bit.objects.get(
                pk=pk
            )
            for image in bit.image_set.all():
                if os.path.isfile(image.file.path):
                    os.remove(image.file.path)
            bit.delete()

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


class ImageViewSet(viewsets.ViewSet):
    parser_class = (FileUploadParser,)

    def list(self, request, format=None):
        return Response(status=405)

    def create(self, request, format=None):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, format=None):
        # images are only retrieved through bits
        return Response(status=405)

    def update(self, request, pk=None, format=None):
        return Response(status=405)

    def partial_update(self, request, pk=None, format=None):
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        try:
            image = models.Image.objects.get(
                pk=pk
            )
            if os.path.isfile(image.file.path):
                os.remove(image.file.path)
            image.delete()

        except models.Image.DoesNotExist:
            return Response(status=404)

        return Response(status=204)


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
        try:
            search_filters = ['username', 'first_name', 'last_name']
            filter_backends = (filters.SearchFilter,)

            queryset = models.User.objects.all()
            queryset = queryset.order_by(request.GET.get("order_by") or "pk")
            serializers = UserSerializer(queryset, many=True)
            return Response(serializers.data, status=200)
        except models.User.DoesNotExist:
            return Response(status=404)

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

        if request.GET.get("username") is not None:
            queryset = queryset.filter(username=request.GET.get("username"))
        if request.GET.get("email") is not None:
            queryset = queryset.filter(email=request.GET.get("email"))

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
        try:
            user = models.User.objects.get(pk=pk)

            # update password
            if "password" in request.data:
                user.set_password(request.data["password"])
                request.data["password"] = user.password

            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():

                serializer.save()
                return Response(serializer.data, status=201)
            else:
                return Response(serializer.errors, status=400)
        except models.User.DoesNotExist:
            return Response(status=404)

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
            # only get count
            if request.GET.get("count") == "true":
                like_count = models.Like.objects.filter(auth_user=pk).count()
                return Response({"liked_bits": like_count}, status=200)

            likes = models.Like.objects.filter(auth_user=pk)
            likes = likes.order_by(request.GET.get("order_by") or "pk")

            # print(likes)
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
            # only get count
            if request.GET.get("count") == "true":
                comment_count = models.Comment.objects.filter(auth_user=pk).count()
                return Response({"commented_bits": comment_count}, status=200)

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
            # only get count
            if request.GET.get("count") == "true":
                bookmark_count = models.Bookmark.objects.filter(auth_user=pk).count()
                return Response({"bookmarks": bookmark_count}, status=200)

            bookmarks = models.Bookmark.objects.filter(auth_user=pk)
            bookmarks = bookmarks.order_by(request.GET.get("order_by") or "pk")

            bookmarked_bits = [b.bit for b in bookmarks]

            serializer = BitSerializer(bookmarked_bits, many=True)
            return Response(serializer.data, status=200)

        except models.User.DoesNotExist:
            return Response(status=404)

    # Check password without generating a token
    # Not sure if this is the optimal way
    @action(methods=['post'], detail=False, url_path='check_password', url_name='Check password')
    def check_password(self, request, pk=None):
        # Check required fields
        error = {}

        if "username" not in request.data:
            error["username"] = "Username is required"
        if "password" not in request.data:
            error["password"] = "Password is required"

        if error != {}:
            return Response({"field_error": error}, status=400)

        # Check credentials
        user = authenticate(username=request.data["username"], password=request.data["password"])

        if user is None:
            return Response({"error": "Invalid username or password"}, status=200)
        else:
            return Response({}, status=200)


class PasswordResetViewSet(viewsets.ViewSet):
    """
    API endpoint that allows users to reset their password.
    """

    def retrieve(self, request, email=''):
        try:
            email = models.User.objects.get(email=email)
            serializer = UserSerializer(email)
            return Response(serializer.data, status=200)
        except models.User.DoesNotExist:
            return Response(status=404)


class UserDetailsViewSet(viewsets.ViewSet):
    parser_class = (FileUploadParser,)

    def list(self, request, format=None):
        return Response(status=405)

    def create(self, request, format=None):
        serializer = UserDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=201
            )
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, format=None):
        # userdetails are only retrieved through users
        return Response(status=405)

    def update(self, request, pk=None, format=None):
        return Response(status=405)

    def partial_update(self, request, pk=None, format=None):
        try:
            userdetails = models.UserDetails.objects.get(
                pk=pk
            )

            serializer = UserDetailsSerializer(userdetails, data=request.data, partial=True)
            if serializer.is_valid():
                # delete old thumbnail if new one is uploaded
                if 'file' in request.data:
                    # additional check because file could be empty
                    if userdetails.file:
                        if os.path.isfile(userdetails.file.path):
                            os.remove(userdetails.file.path)

                serializer.save()
                return Response(
                    serializer.data,
                    status=201
                )
            else:
                return Response(serializer.errors, status=400)

        except models.Bit.DoesNotExist:
            return Response(status=404)

    def destroy(self, request, pk=None, format=None):
        try:
            userdetails = models.UserDetails.objects.get(
                pk=pk
            )
            if os.path.isfile(userdetails.file.path):
                os.remove(userdetails.file.path)
            userdetails.delete()

        except models.UserDetails.DoesNotExist:
            return Response(status=404)

        return Response(status=204)


class FriendshipViewSet(viewsets.ViewSet):

    def list(self, request, format=None):

        auth_user = request.GET.get("auth_user")
        from_auth_user = request.GET.get("from_auth_user")
        to_auth_user = request.GET.get("to_auth_user")

        status = request.GET.get("status")

        # friendshipType = request.GET.get("type")

        queryset = models.Friendship.objects.all()

        # with username to request 
        if auth_user is not None:
            queryset = queryset.filter(Q(from_auth_user__username=auth_user) | Q(to_auth_user__username=auth_user))

        if from_auth_user is not None:
            queryset = queryset.filter(from_auth_user=from_auth_user)
        if to_auth_user is not None:
            queryset = queryset.filter(to_auth_user=to_auth_user)

        if status is not None:
            queryset = queryset.filter(friendship_status=status)

        # only get count
        if request.GET.get("count") == "true":
            friendship_count = queryset.count()
            return Response({"friendships": friendship_count}, status=200)

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

    # this creates the url: friendships/{Id}/accept/
    @action(methods=['post'], detail=True, url_path='accept', url_name='accept')
    def accept(self, request, pk=None):
        try:
            friendship: Friendship = models.Friendship.objects.filter(pk=pk).first()

            if friendship.friendship_status.id != 1:
                return Response({"error": "Must be a request to accept"}, status=400)

            friendship.friendship_status = models.FriendshipStatus.objects.get(pk=2)
            friendship.save()

            serializer = FriendshipSerializer(friendship)
            return Response(serializer.data, status=201)

        except (models.Friendship.DoesNotExist, AttributeError):
            return Response(status=404)

    # this creates the url: friendships/{Id}/decline/
    @action(methods=['post'], detail=True, url_path='decline', url_name='decline')
    def decline(self, request, pk=None, format=None):
        try:
            friendship: Friendship = models.Friendship.objects.filter(pk=pk).first()

            if friendship.friendship_status.id != 1:
                return Response({"error": "Must be a request to decline"}, status=400)

            return self.destroy(request, pk, format)

        except (models.Friendship.DoesNotExist, AttributeError):
            return Response(status=404)


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
            return Response(serializer.data, status=201)
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


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Firebit"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
