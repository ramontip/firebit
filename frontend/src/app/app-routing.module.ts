import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivitiesPageComponent} from './pages/activities-page/activities-page.component';
import {BitPageComponent} from './pages/bit-page/bit-page.component';
import {CategoryPageComponent} from './pages/category-page/category-page.component';
import {HomeComponent} from './pages/home/home.component';
import {ProfileFriendsPageComponent} from './pages/profile-friends-page/profile-friends-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {ProfileSettingsPageComponent} from './pages/profile-settings-page/profile-settings-page.component';
import {UserFriendsPageComponent} from './pages/user-friends-page/user-friends-page.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {IndexComponent} from "./pages/index/index.component";
import {BitEditComponent} from "./pages/bit-edit/bit-edit.component";
import {BookmarksPageComponent} from './pages/bookmarks-page/bookmarks-page.component';
import {AuthGuard} from "./guards/auth.guard";
import {NotAuthGuard} from './guards/not-auth.guard';
import {ActivitiesLikedComponent} from './components/activities-liked/activities-liked.component';
import {ActivitiesCommentedComponent} from './components/activities-commented/activities-commented.component';
import {ErrorNotFoundComponent} from './pages/error-not-found/error-not-found.component';
import {HashtagPageComponent} from "./pages/hashtag-page/hashtag-page.component";
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {TermsPageComponent} from "./pages/terms-page/terms-page.component";
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {AdminGuard} from './guards/admin.guard';

const routes: Routes = [
  // TODO: Guard for logged in -> redirect login/redirect to bitmap
  // Maybe group all auth guard routes in one route as child routes
  {path: "", component: IndexComponent, canActivate: [NotAuthGuard]},
  {path: "login", component: IndexComponent, canActivate: [NotAuthGuard]},
  {path: "register", component: IndexComponent, canActivate: [NotAuthGuard]},
  {path: "reset-password", component: IndexComponent, canActivate: [NotAuthGuard]},
  {path: "bitmap", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "terms", component: TermsPageComponent},
  {
    path: "bit/:id", canActivate: [AuthGuard], children: [
      {path: "", component: BitPageComponent},
      {path: "edit", component: BitEditComponent, data: {breadcrumbs: "Edit", isLink: true}},
    ],
    data: {breadcrumbs: "Bit", isLink: false}
  },
  {
    path: "profile", canActivate: [AuthGuard], children: [
      {path: "", component: ProfilePageComponent},
      {path: "settings", component: ProfileSettingsPageComponent, data: {breadcrumbs: "Settings"}},
      {path: "friends", component: ProfileFriendsPageComponent, data: {breadcrumbs: "Friends"}},
    ],
    data: {breadcrumbs: "Profile"},
  },
  {
    path: "user/:username", canActivate: [AuthGuard], children: [
      {path: "", component: UserPageComponent},
      {path: "friends", component: UserFriendsPageComponent, data: {breadcrumbs: "Friends", isLink: true}},
    ],
    data: {breadcrumbs: "User", isLink: false}
  },
  {path: "category/:name", component: CategoryPageComponent, canActivate: [AuthGuard]},
  {path: "search/:query", component: SearchPageComponent, canActivate: [AuthGuard]},
  {path: "hashtag/:hashtag", component: HashtagPageComponent, canActivate: [AuthGuard]},
  {
    // path: "", children: [
    //   {
    path: "activities",
    component: ActivitiesPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumbs: "Activities"},
    children: [
      {path: "", redirectTo: "liked", pathMatch: "full"},
      {path: "liked", component: ActivitiesLikedComponent, data: {name: "Bits I Liked"}},
      {path: "commented", component: ActivitiesCommentedComponent, data: {name: "Bits I Commented"}},
    ]
    // data: { breadcrumbs: "Activities" }
  },
  {path: "bookmarks", component: BookmarksPageComponent, canActivate: [AuthGuard], data: {breadcrumbs: "Bookmarks"}},
  {path: "admin", component: AdminPageComponent, canActivate: [AuthGuard, AdminGuard], data: {breadcrumbs: "Admin"}},
  {path: "**", component: ErrorNotFoundComponent} // 404 Must be the last entry, because "**" matches everything
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
