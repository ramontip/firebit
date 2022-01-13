import json
from rest_framework import viewsets, permissions
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.decorators import action

from . import models
from .serializers import *


class BitViewSet(viewsets.ViewSet):

    def list(self, request, format=None):
        queryset = models.Bit.objects.all()

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
            queryset = models.Category.objects.filter(name=request.GET.get("title"))

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
