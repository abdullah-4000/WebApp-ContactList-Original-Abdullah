import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TestCategoryService } from '../test-category.service';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  constructor(private router: Router,
    private testCategoryService: TestCategoryService,
    private route: ActivatedRoute) { }

  categoryId: number = 0;
  currentDate = new Date();
  categoryDate = formatDate(this.currentDate, 'dd-MM-yyyy hh:mm a', 'en-US');


  CategoryDetailsForm = new FormGroup({
    categoryName: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    email: new FormControl(''),
    contactNumber: new FormControl(''),
    companyName: new FormControl(''),
    active: new FormControl(true),
  })

  ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 0 && !isNaN(id)) {

      this.categoryId = id;
      this.getCategory(this.categoryId);
    }

  }

  getCategory(categoryId: number) {
    this.testCategoryService.getCategories()
      .then((categories) => {
        let category = categories.find((object: { categoryID: number; }) => {
          return object.categoryID === categoryId;
        })
        console.table(categories);
        console.table(category);

        this.CategoryDetailsForm.setValue({
          categoryName: category.categoryName,
          email: category.email,
          contactNumber: category.contactNumber,
          companyName: category.companyName,
          active: category.active,
        })

      })

  }

  showErrorMessageName(fieldName: string) {
    let errors = this.CategoryDetailsForm.get(fieldName)?.errors;

    if (errors) {
      if (errors['required']) return 'Category name is required';
      if (errors['required']) return 'category name must be 5 characters long';
      return '';
    }
    else return '';
  }

  showErrorMessageEmail(fieldName: string) {
    let errors = this.CategoryDetailsForm.get(fieldName)?.errors;

    if (errors) {
      if (errors['required']) return 'Email is required';
      return '';
    }
    else return '';
  }

  showErrorMessageContactNumber(fieldName: string) {
    let errors = this.CategoryDetailsForm.get(fieldName)?.errors;

    if (errors) {
      if (errors['required']) return 'Contact Number is required';
      return '';
    }
    else return '';
  }

  showErrorMessageCompanyName(fieldName: string) {
    let errors = this.CategoryDetailsForm.get(fieldName)?.errors;

    if (errors) {
      if (errors['required']) return 'Phone Number is required';
      return '';
    }
    else return '';
  }

  resetForm() {
    //console.log("Reset Button works !!");

    this.CategoryDetailsForm.reset()
    console.log('Form Reset Sucessfully!!');
  }

  saveTestCategory() {
    //console.log("save Button Works !!");

    this.testCategoryService.saveCategory({
      categoryID: this.categoryId,
      categoryName: this.CategoryDetailsForm.get('categoryName')?.value,
      email: this.CategoryDetailsForm.get('email')?.value,
      contactNumber: this.CategoryDetailsForm.get('contactNumber')?.value,
      companyName: this.CategoryDetailsForm.get('companyName')?.value,
      active: this.CategoryDetailsForm.get('active')?.value,
      createDate: this.categoryDate,
      isDeleted: false
    })
      .then(() => {
        this.router.navigateByUrl('testCategory');
      })
      .catch((error) => {
        console.log(error);
      })

    // console.log('Category ID :' + this.categoryId);
    // console.log('Created Date :' + Date.now());

    // let categoryName = this.CategoryDetailsForm.get('categoryName')?.value;
    // console.log('Category Name : ' + categoryName);

    // let email = this.CategoryDetailsForm.get('email')?.value;
    // console.log('Email : ' + email);

    // let contactNumber = this.CategoryDetailsForm.get('contactNumber')?.value;
    // console.log('Contact Number : ' + contactNumber);

    // let companyName = this.CategoryDetailsForm.get('companyName')?.value;
    // console.log('Company Name : ' + companyName);

    // let active = this.CategoryDetailsForm.get('active')?.value;
    // console.log('Active : ' + active);

  }

  cancelTestCategory() {
    //console.log("Caoncel Button Wroks !!");

    this.router.navigateByUrl("testCategory")

      .catch((error) => {
        console.log(error)
      })
  }
}
