import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatButtonModule } from "@angular/material/button"
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select"
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatListModule } from "@angular/material/list";
import { HomeComponent } from './pages/home/home.component';
import { MatChipsModule } from "@angular/material/chips";
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BitComponent } from './components/bit/bit.component'
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { BitPageComponent } from './pages/bit-page/bit-page.component';
import { BitCommentComponent } from './components/bit-comment/bit-comment.component';
import { BitFormComponent } from './components/bit-form/bit-form.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { PublicProfilePageComponent } from './pages/public-profile-page/public-profile-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    HomeComponent,
    CategoryListComponent,
    BitComponent,
    BitPageComponent,
    BitCommentComponent,
    BitFormComponent,
    ProfilePageComponent,
    AboutMeComponent,
    ProfileStatsComponent,
    PublicProfilePageComponent,
    CategoryPageComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
