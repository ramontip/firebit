from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('bit', views.BitViewSet, basename="bit")
router.register('comment', views.CommentViewSet, basename="comment")
router.register('search', views.SearchViewSet, basename="search")
