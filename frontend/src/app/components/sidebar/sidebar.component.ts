import {Component, OnInit} from '@angular/core';

interface SidebarItem {
  name: string
  icon?: string
  link?: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarItems: SidebarItem[] = [
    {name: "Bitmap", icon: "dashboard", link: "/bitmap"},
    {name: "Friends", icon: "people", link: "/profile/friends"},
    {name: "Activities", icon: "history", link: "/activities"},
    {name: "Bookmarks", icon: "bookmark", link: "/bookmarks"},
    {name: "Admin Dashboard", icon: "admin_panel_settings", link: "/admin"}, // TODO: Hide if not admin
    // { name: "Notifications", icon: "notifications" }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
