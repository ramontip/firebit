import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {BitService} from "../../services/bit.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../types";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-bit-form',
  templateUrl: './bit-form.component.html',
  styleUrls: ['./bit-form.component.scss']
})
export class BitFormComponent implements OnInit {

  bitFormGroup: FormGroup;
  categoryOptions: Category[] = [];
  fileName = '';
  file: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private bitService: BitService, public categoryService: CategoryService, private router: Router, private appService: AppService) {
    this.bitFormGroup = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      // image: new FormControl(null)
    })
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.params.id)
    if (id) {
      this.bitService.getBit(id).subscribe(bit => {
        this.bitFormGroup.patchValue(bit);
      })
      this.categoryService.getCategories().subscribe(categories => this.categoryOptions = categories);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
      this.fileName = file.name + ' added';
      // this.bitFormGroup.value.image = file.name;


      /*
          const formData = new FormData();

          formData.append("thumbnail", file);

          const upload$ = this.http.post("/api/thumbnail-upload", formData);

          upload$.subscribe();
       */
    }
  }

  createOrUpdateBit() {
    if (this.bitFormGroup.controls['id'].value) {
      this.bitService.updateBit(this.bitFormGroup.value).subscribe(() => {
        this.appService.showSnackBar('Bit updated successfully!', 'Hide');
      })
    } else {
      this.bitService.createBit(this.bitFormGroup.value).subscribe((res: any) => {
        const formData = new FormData();
        formData.append("bit", res.id);
        formData.append("file", this.file, this.file.name);
        this.bitService.createImage(formData).subscribe(() => {
          console.log("file shoud have been stored");
        })

        this.appService.showSnackBar('Bit created successfully!', 'Hide');
      })
    }
    this.appService.refreshRoute();
  }

  deleteBit() {
    if (confirm("Are you sure to delete this bit?")) {
      if (this.bitFormGroup.controls['id'].value) {
        this.bitService.deleteBit(this.bitFormGroup.value).subscribe(() => {
          this.appService.showSnackBar('Bit deleted successfully!', 'Hide');
          this.router.navigate(['/bitmap']);
        })
      }
    }
  }

}
