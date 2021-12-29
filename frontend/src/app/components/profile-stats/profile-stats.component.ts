import { Component, OnInit } from '@angular/core';
import { Stat } from 'src/types';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss']
})
export class ProfileStatsComponent implements OnInit {

  stats: Stat[] = [
    { description: "friends", amount: 13, icon: "people" },
    { description: "bits liked", amount: 42, icon: "local_fire_department" },
    { description: "bits bookmarked", amount: 26, icon: "bookmark" },
  ]

  constructor() { }

  ngOnInit(): void { }

}
