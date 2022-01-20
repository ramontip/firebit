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
    }
  }

  createOrUpdateBit() {
    if (this.bitFormGroup.controls['id'].value) {
      this.bitService.updateBit(this.bitFormGroup.value).subscribe(() => {
        this.appService.showSnackBar('Bit updated successfully!', 'Hide');
      })
      this.appService.refreshRoute();
    } else {
      this.bitService.createBit(this.bitFormGroup.value).subscribe((bit: any) => {
        if (this.file) {
          this.createImageForBit(bit.id);
          this.appService.showSnackBar('Bit created successfully!', 'Hide');
        } else {
          this.appService.refreshRoute();
        }
      })
    }
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

  createImageForBit(bitId: number) {
    const uniqueFileName = bitId + '-' + this.appService.generateUniqueString(16) + '.' + this.file.name.split('.').pop();
    const formData = new FormData();
    formData.append('bit', bitId.toString());
    formData.append('file', this.file, uniqueFileName);

    this.bitService.createImage(formData).subscribe(() => {
      console.log("Image should have been stored.");
      this.appService.refreshRoute();
    })
  }

}
