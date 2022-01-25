import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

interface SidebarItem {
  name: string
  icon?: string
  link?: string
  show?: boolean
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarItems: SidebarItem[] = []

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.isAdmin.subscribe(isAdmin => {

      this.sidebarItems = [
        { name: "Bitmap", icon: "dashboard", link: "/bitmap" },
        { name: "Friends", icon: "people", link: "/profile/friends" },
        { name: "Activities", icon: "history", link: "/activities" },
        { name: "Bookmarks", icon: "bookmark", link: "/bookmarks" },
        { name: "Admin Dashboard", icon: "admin_panel_settings", link: "/admin", show: isAdmin },
        // { name: "Notifications", icon: "notifications" }
      ]

    })

  }

}
