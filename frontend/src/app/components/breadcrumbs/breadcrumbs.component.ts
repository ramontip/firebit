import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: any[] = []

  constructor(private route: ActivatedRoute) {
    // console.log({ pathFromRoot: route.snapshot.pathFromRoot })

    let path = ""

    const breadcrumbs = route.snapshot.pathFromRoot.map(r => {

      if (!r.url.length)
        return null

      path += r.url.map(u => u.path).join("/") + "/"

      console.log({ r })

      return ({
        display: r.data.breadcrumbs,
        path: path.slice(0, -1),
        isLink: r.data.isLink ?? true,
      })

    }).filter(b => b)

    console.log({ breadcrumbs })

    this.breadcrumbs = breadcrumbs

  }

  ngOnInit(): void { }

}
