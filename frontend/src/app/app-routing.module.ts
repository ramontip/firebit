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
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "login", component: IndexComponent},
  {path: "register", component: IndexComponent},
  {path: "reset-password", component: IndexComponent},
  {path: "bitmap", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "bit/:id", component: BitPageComponent, canActivate: [AuthGuard]},
  {path: "bit/:id/edit", component: BitEditComponent, canActivate: [AuthGuard]},
  {
    path: "profile", children: [
      {path: "", component: ProfilePageComponent, canActivate: [AuthGuard]},
      {path: "settings", component: ProfileSettingsPageComponent, canActivate: [AuthGuard]},
      {path: "friends", component: ProfileFriendsPageComponent, canActivate: [AuthGuard]},
    ]
  },
  {
    path: "user/:username", children: [
      {path: "", component: UserPageComponent, canActivate: [AuthGuard]},
      {path: "friends", component: UserFriendsPageComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: "category/:name", component: CategoryPageComponent, canActivate: [AuthGuard]},
  {
    path: "activities", children: [
      {path: "", component: ActivitiesPageComponent, canActivate: [AuthGuard]},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
