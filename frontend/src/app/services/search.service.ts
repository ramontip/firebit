import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppService} from "./app.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient,
              private router: Router,
              private appService: AppService,
              private userService: UserService) {

  }

  getSearchResults(q: string) {
    return this.http.get<JSON>(this.appService.baseUrl + `/search/?q=${q}`).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )

  }

}
