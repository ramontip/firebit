import json
from rest_framework import viewsets, permissions
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.response import Response

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
        # We do not allow partial updates here
        # So we return a 405 instead.
        return Response(status=405)

    def destroy(self, request, pk=None, format=None):
        try:
            bit = models.Bit.objects.filter(
                pk=pk
            ).delete()
        except models.Bit.DoesNotExist:
            return Response(status=404)

        return Response(status=204)
