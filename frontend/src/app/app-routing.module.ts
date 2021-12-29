import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitPageComponent } from './pages/bit-page/bit-page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "bit/:id", component: BitPageComponent },
  { path: "profile", component: ProfilePageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
