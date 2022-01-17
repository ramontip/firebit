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
      { path: "settings", component: ProfileSettingsPageComponent },
      { path: "friends", component: ProfileFriendsPageComponent },
    ]
  },
  {
    path: "user/:username", canActivate: [AuthGuard], children: [
      { path: "", component: UserPageComponent },
      { path: "friends", component: UserFriendsPageComponent },
    ]
  },
  { path: "category/:name", component: CategoryPageComponent, canActivate: [AuthGuard] },
  {
    path: "activities", canActivate: [AuthGuard], children: [
      { path: "", component: ActivitiesPageComponent },
    ]
  },
  { path: "bookmarks", component: BookmarksPageComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
