import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-thumbnail-form',
  templateUrl: './thumbnail-form.component.html',
  styleUrls: ['./thumbnail-form.component.scss']
})
export class ThumbnailFormComponent implements OnInit {

  file?: File;
  imageField = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private appService: AppService) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.imageField = this.file?.name + ' added';
  }

  createOrUpdateThumbnail() {
    alert("thumbnail will be stored");
  }

}
