import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface TabLink {
  name: string
  path?: string
}

@Component({
  selector: 'app-activities-page',
  templateUrl: './activities-page.component.html',
  styleUrls: ['./activities-page.component.scss']
})
export class ActivitiesPageComponent implements OnInit {

  activeLink?= ""
  links?: TabLink[]

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.links = this.route.routeConfig?.children
      ?.filter(r => r.data?.name)
      ?.map(r => {
        if (r.path && this.router.url.endsWith(r.path)) {
          this.activeLink = r.path
        }
        return { name: r.data?.name, path: r.path, }
      })
  }

}
