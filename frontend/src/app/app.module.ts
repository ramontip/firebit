import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatButtonModule} from "@angular/material/button"
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select"
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from '@angular/forms';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MatListModule} from "@angular/material/list";
import {HomeComponent} from './pages/home/home.component';
import {MatChipsModule} from "@angular/material/chips";
import {CategoryListComponent} from './components/category-list/category-list.component';
import {BitComponent} from './components/bit/bit.component'
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {BitPageComponent} from './pages/bit-page/bit-page.component';
import {BitCommentComponent} from './components/bit-comment/bit-comment.component';
import {BitFormComponent} from './components/bit-form/bit-form.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {AboutMeComponent} from './components/about-me/about-me.component';
import {ProfileStatsComponent} from './components/profile-stats/profile-stats.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {CategoryPageComponent} from './pages/category-page/category-page.component';
import {CategoryComponent} from './components/category/category.component';
import {ProfileSettingsPageComponent} from './pages/profile-settings-page/profile-settings-page.component';
import {ProfileFormComponent} from './components/profile-form/profile-form.component';
import {PasswordFormComponent} from './components/password-form/password-form.component';
import {ProfileFriendsPageComponent} from './pages/profile-friends-page/profile-friends-page.component';
import {FriendComponent} from './components/friend/friend.component';
import {UserFriendsPageComponent} from './pages/user-friends-page/user-friends-page.component';
import {ActivitiesPageComponent} from './pages/activities-page/activities-page.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ActivitiesLikedComponent} from './components/activities-liked/activities-liked.component';
import {ActivitiesCommentedComponent} from './components/activities-commented/activities-commented.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {ForgotPasswordFormComponent} from './components/forgot-password-form/forgot-password-form.component';
import {IndexComponent} from './pages/index/index.component';
import {MatCheckboxModule} from "@angular/material/checkbox"
import {BitEditComponent} from './pages/bit-edit/bit-edit.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BookmarksPageComponent} from './pages/bookmarks-page/bookmarks-page.component';
import {JwtModule} from "@auth0/angular-jwt";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {HashtagPageComponent} from './pages/hashtag-page/hashtag-page.component';
import {ErrorNotFoundComponent} from "./pages/error-not-found/error-not-found.component";
import {UserThumbnailComponent} from "./components/user-thumbnail/user-thumbnail.component";
import {UserDetailsFormComponent} from "./components/user-details-form/user-details-form.component";
import {BackgroundPatternComponent} from "./components/background-pattern/background-pattern.component";
import {NoDataComponent} from './components/no-data/no-data.component';
import {CookieService} from "ngx-cookie-service";
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {PasswordResetFormComponent} from './components/password-reset-form/password-reset-form.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {TermsPageComponent} from './pages/terms-page/terms-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {MatTableModule} from "@angular/material/table"
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner"
import {StatChipComponent} from './components/stat-chip/stat-chip.component'
import {FooterComponent} from './components/footer/footer.component'
import { NgxMasonryModule } from "ngx-masonry";
import { UserBadgeComponent } from './components/user-badge/user-badge.component'

function tokenGetter() {
  return localStorage.getItem('access_token');
}

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
    UserPageComponent,
    CategoryPageComponent,
    CategoryComponent,
    ProfileSettingsPageComponent,
    ProfileFormComponent,
    PasswordFormComponent,
    ProfileFriendsPageComponent,
    FriendComponent,
    UserFriendsPageComponent,
    ActivitiesPageComponent,
    ActivitiesLikedComponent,
    ActivitiesCommentedComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ForgotPasswordFormComponent,
    IndexComponent,
    BitEditComponent,
    BookmarksPageComponent,
    HashtagPageComponent,
    BreadcrumbsComponent,
    ErrorNotFoundComponent,
    UserThumbnailComponent,
    UserDetailsFormComponent,
    BackgroundPatternComponent,
    NoDataComponent,
    PasswordResetFormComponent,
    AboutUsComponent,
    SearchPageComponent,
    TermsPageComponent,
    AdminPageComponent,
    StatChipComponent,
    FooterComponent,
    UserBadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
    MatTabsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBadgeModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    NgxMasonryModule,
    JwtModule.forRoot({
      config: {tokenGetter: tokenGetter}
    }),
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
