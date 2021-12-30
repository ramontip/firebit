import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitPageComponent } from './pages/bit-page/bit-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileFriendsPageComponent } from './pages/profile-friends-page/profile-friends-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { PublicProfilePageComponent } from './pages/public-profile-page/public-profile-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "bit/:id", component: BitPageComponent },
  { path: "profile", component: ProfilePageComponent },
  { path: "profile/settings", component: ProfileSettingsPageComponent },
  { path: "profile/friends", component: ProfileFriendsPageComponent },
  { path: "user/:username", component: PublicProfilePageComponent },
  { path: "category/:name", component: CategoryPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
