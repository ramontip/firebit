from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('bits', views.BitViewSet, basename="bits")
router.register('comments', views.CommentViewSet, basename="comments")
router.register('search', views.SearchViewSet, basename="search")
router.register('categories', views.CategoryViewSet, basename="categories")
router.register('users', views.UserViewSet, basename="users")
