import {Component, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Bit, User} from "../../../types";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchParam: string | null = null;
  searchResultUsers: User[] = [];
  searchResultBits: Bit[] = [];

  resUsers = new BehaviorSubject<User[]>([])

  query: string | null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {

      this.query = paramMap.get("query")
      if (this.query) {
        this.searchService.getSearchResults(this.query).subscribe(
          (searchResult) => {
            // console.log(searchResult);
            this.searchResultUsers = searchResult.users;
            // console.log(this.searchResultUsers)
            this.searchResultBits = searchResult.bits;
          });
      }
    });
  }


}
