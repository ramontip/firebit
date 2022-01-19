import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Breadcrumb {
  display: string
  path?: string
  isLink?: boolean
}

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

    // TODO: Breadcrumbs: data.breadcrumbs: interpret as array like path

    let breadcrumbs: Breadcrumb[] = [{ display: "Home", path: "/bitmap", isLink: true }]

    // Create breadcrumb items from route object
    route.snapshot.pathFromRoot.forEach(r => {

      // console.log({ r })

      // Skip if it current object has no url (e.g. from nesting/grouping etc.)
      if (!r.url.length) {

        // TODO: Not sure, if we should keep this
        if (r.data.breadcrumbs && !r.component) {
          breadcrumbs.push({
            display: r.data.breadcrumbs
          })
        }

        return
      }

      // Url can haz multiple parts, divided by "/" in app-routing's path
      r.url.forEach(u => {
        // console.log({ u })

        path += u.path + "/"

        // console.log({ p: r.params, pm: r.paramMap })

        // If 
        if (!r.data.breadcrumbs)
          return

        // If the current part of the path is static, display the name from config
        // Otherwise display the current param part

        let display: string = r.data.breadcrumbs

        r.paramMap.keys.forEach(key => {
          if (r.paramMap.get(key) === u.path)
            display = u.path
        })

        breadcrumbs.push({
          display,
          path: path.slice(0, -1), // remove trailing slash
          isLink: !(r.data.isLink === false) || display !== r.data.breadcrumbs,
        })
      })

      // console.log({ r })

    })

    breadcrumbs = breadcrumbs.filter(b => b)

    // console.log({ breadcrumbs })

    if (breadcrumbs.length > 1)
      this.breadcrumbs = breadcrumbs

  }

  ngOnInit(): void { }

}
