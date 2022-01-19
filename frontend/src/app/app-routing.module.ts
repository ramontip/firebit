import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesPageComponent } from './pages/activities-page/activities-page.component';
import { BitPageComponent } from './pages/bit-page/bit-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileFriendsPageComponent } from './pages/profile-friends-page/profile-friends-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { UserFriendsPageComponent } from './pages/user-friends-page/user-friends-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { IndexComponent } from "./pages/index/index.component";
import { BitEditComponent } from "./pages/bit-edit/bit-edit.component";
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { AuthGuard } from "./guards/auth.guard";
import { ActivitiesLikedComponent } from './components/activities-liked/activities-liked.component';
import { ActivitiesCommentedComponent } from './components/activities-commented/activities-commented.component';

const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "login", component: IndexComponent },
  { path: "register", component: IndexComponent },
  { path: "reset-password", component: IndexComponent },
  { path: "bitmap", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "bit/:id", canActivate: [AuthGuard], children: [
      { path: "", component: BitPageComponent },
      { path: "edit", component: BitEditComponent },
    ]
  },
  {
    path: "profile", canActivate: [AuthGuard], children: [
      { path: "", component: ProfilePageComponent },
      { path: "settings", component: ProfileSettingsPageComponent, data: { breadcrumbs: "Settings" } },
      { path: "friends", component: ProfileFriendsPageComponent, data: { breadcrumbs: "Friends" } },
    ],
    data: { breadcrumbs: "Profile" },
  },
  {
    path: "user/:username", canActivate: [AuthGuard], children: [
      { path: "", component: UserPageComponent },
      { path: "friends", component: UserFriendsPageComponent },
    ],
    // data: { breadcrumbs: "User", isLink: false }
  },
  { path: "category/:name", component: CategoryPageComponent, canActivate: [AuthGuard], data: { breadcrumbs: "Category", isLink: false } },
  {
    // path: "", children: [
    //   {
    path: "activities", component: ActivitiesPageComponent, canActivate: [AuthGuard], data: { breadcrumbs: "Activities" }, children: [
      { path: "", redirectTo: "liked", pathMatch: "full" },
      { path: "liked", component: ActivitiesLikedComponent, data: { name: "Bits I Liked" } },
      { path: "commented", component: ActivitiesCommentedComponent, data: { name: "Bits I Commented" } },
    ]
    // data: { breadcrumbs: "Activities" }
  },
  { path: "bookmarks", component: BookmarksPageComponent, canActivate: [AuthGuard], data: { breadcrumbs: "Bookmarks" } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
