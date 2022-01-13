import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesPageComponent } from './pages/activities-page/activities-page.component';
import { BitPageComponent } from './pages/bit-page/bit-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfileFriendsPageComponent } from './pages/profile-friends-page/profile-friends-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { UserFriendsPageComponent } from './pages/user-friends-page/user-friends-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginPageComponent },
  { path: "bits/:id", component: BitPageComponent },
  {
    path: "profile", children: [
      { path: "", component: ProfilePageComponent },
      { path: "settings", component: ProfileSettingsPageComponent },
      { path: "friends", component: ProfileFriendsPageComponent },
    ]
  },
  {
    path: "users/:username", children: [
      { path: "", component: UserPageComponent },
      { path: "friends", component: UserFriendsPageComponent },
    ]
  },
  { path: "categories/:name", component: CategoryPageComponent },
  {
    path: "activities", children: [
      { path: "", component: ActivitiesPageComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
