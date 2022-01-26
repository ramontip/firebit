import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {BitService} from "../../services/bit.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Bit, Category} from "../../../types";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-bit-form',
  templateUrl: './bit-form.component.html',
  styleUrls: ['./bit-form.component.scss']
})
export class BitFormComponent implements OnInit {

  @ViewChild('fileUpload') fileUpload?: ElementRef;

  bit?: Bit;
  bitFormGroup: FormGroup;
  categoryOptions: Category[] = [];
  imageField = '';
  imageLimit = 3;
  files: File[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private bitService: BitService, public categoryService: CategoryService, private router: Router, public appService: AppService) {
    this.bitFormGroup = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.params.id)
    // check if edit mode
    if (id) {
      this.bitService.getBit(id).subscribe(bit => {
        this.bitFormGroup.patchValue(bit);
        this.bit = bit;
      })
      this.categoryService.getCategories().subscribe(categories => this.categoryOptions = categories);
    }
  }

  onFileSelected(event: any) {
    const filesNumber = event.target.files.length;
    for (let i = 0, n = filesNumber; i < n; i++) {
      this.files.push(event.target.files[i])
    }
    this.imageField = this.files.length + (this.files.length > 1 ? ' images added' : ' image added');

    // Check file number on create
    if (this.files.length > this.imageLimit) {
      alert("You can add a maximum of three images.");
    }

    // Check number on edit
    if (this.files.length + this.bit?.images?.length! > this.imageLimit) {
      alert("You can add a maximum of three images.");
    }
  }

  removeFiles() {
    this.files = [];
    this.imageField = "Add images to your Bit";
    if (this.fileUpload)
      this.fileUpload.nativeElement.value = '';
  }

  createOrUpdateBit() {
    const id = this.bitFormGroup.controls['id'].value

    if (id) {
      // console.log({form: this.bitFormGroup.value})

      let bitValue = {
        ...this.bitFormGroup.value,
        auth_user: this.bit?.user_details
      }

      this.bitService.updateBit(bitValue).subscribe(bit => {
        this.createImagesForBit(id);
        this.appService.showSnackBar('Bit updated successfully!', 'Hide');
        this.bit = bit
        // this.ngOnInit(); // TODO: on init should only be called once (by angular)
        this.router.navigate(["bit", id])
      })
    } else {
      this.bitService.createBit(this.bitFormGroup.value).subscribe((bit: any) => {
        this.createImagesForBit(bit.id);
        this.appService.showSnackBar('Bit created successfully!', 'Hide');
        this.appService.refreshRoute();
      })
    }
  }

  createImagesForBit(bitId: number) {
    if (this.files.length > 0) {
      this.files.forEach((file: File) => {
        const uniqueFileName = 'bit-' + bitId + '-' + this.appService.generateUniqueString(16) + '.' + file.name.split('.').pop();
        const formData = new FormData();
        formData.append('bit', bitId.toString());
        formData.append('file', file, uniqueFileName);

        this.bitService.createImage(formData).subscribe(() => {
          // console.log("Image should have been stored.");
          this.appService.refreshRoute();
        })
      });
    }
  }

  deleteBit() {
    if (confirm("Are you sure to delete this Bit?")) {
      if (this.bitFormGroup.controls['id'].value) {
        this.bitService.deleteBit(this.bitFormGroup.value).subscribe(() => {
          this.appService.showSnackBar('Bit deleted successfully!', 'Hide');
          this.router.navigate(['/bitmap']);
        })
      }
    }
  }

  deleteImage(id: number) {
    if (confirm("Are you sure to delete this image?")) {
      this.bitService.deleteImage(id).subscribe(() => {
        this.appService.showSnackBar('Image deleted successfully!', 'Hide');
        this.ngOnInit()
      })
    }
  }
}
