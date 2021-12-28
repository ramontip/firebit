import { Component, OnInit } from '@angular/core';

interface SidebarItem {
  name: string
  icon?: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarItems: SidebarItem[] = [
    { name: "Bitmap", icon: "dashboard" },
    { name: "Friends", icon: "people" },
    { name: "Bookmarks", icon: "bookmark" },
    { name: "Notifications", icon: "notifications" }
  ]

  constructor() { }

  ngOnInit(): void { }

}