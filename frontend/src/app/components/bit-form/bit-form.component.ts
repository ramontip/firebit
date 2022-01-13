import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {BitService} from "../../services/bit.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Bit, Category} from "../../../types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bit-form',
  templateUrl: './bit-form.component.html',
  styleUrls: ['./bit-form.component.scss']
})
export class BitFormComponent implements OnInit {

  bitFormGroup: FormGroup;
  categoryOptions: Category[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private bitService: BitService, public categoryService: CategoryService, private router: Router) {
    this.bitFormGroup = new FormGroup({
      id: new FormControl(null),
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl(null),
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

  createOrUpdateBit() {
    const id = this.bitFormGroup.controls['id'].value
    if (id) {
      this.bitService.updateBit(this.bitFormGroup.value).subscribe(() => {
        alert('Bit updated successfully!');
      })
    } else {
      this.bitService.createBit(this.bitFormGroup.value).subscribe(() => {
        alert('Bit created successfully!');
      })
    }
  }

  deleteBit() {
    const id = this.bitFormGroup.controls['id'].value
    if (id) {
      this.bitService.deleteBit(this.bitFormGroup.value).subscribe(() => {
        alert('Bit deleted successfully!');
        this.router.navigate(['/'])
      })
    }
  }

}
