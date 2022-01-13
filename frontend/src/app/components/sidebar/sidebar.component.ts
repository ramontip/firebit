import { Component, OnInit } from '@angular/core';

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
    { name: "Bitmap", icon: "dashboard", link: "/" },
    { name: "Friends", icon: "people", link: "/profile/friends" },
    { name: "Activities", icon: "history", link: "/activities" },
    { name: "Bookmarks", icon: "bookmark" },
    { name: "Notifications", icon: "notifications" }
  ]

  constructor() { }

  ngOnInit(): void { }

}