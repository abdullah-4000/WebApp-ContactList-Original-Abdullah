import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestCategoryService {

  constructor() { }

  categoryArray : any = [];

  async saveCategory(categoryData : any){

    let parsedCategoryData = localStorage.getItem('categories');
    this.categoryArray = JSON.parse(parsedCategoryData!) || [];

    if (categoryData.categoryID) {
      this.categoryArray[categoryData.categoryID - 1] = categoryData
    }
    else{
      categoryData.categoryID = this.categoryArray.length + 1;
      this.categoryArray.push(categoryData);
    }

    let stringifyCategoryData = JSON.stringify(this.categoryArray);
    localStorage.setItem('categories' , stringifyCategoryData);

    console.table(this.categoryArray);

  }

  async getCategories(){
    let parsedCategoryData = localStorage.getItem('categories');
    this.categoryArray = JSON.parse(parsedCategoryData!) || [];

    return this.categoryArray;
  }

  async deleteCategory(category: any) {

    this.categoryArray = JSON.parse(localStorage.getItem('categories')!);
    this.categoryArray[category.categoryID - 1].isDeleted = category.isDeleted;

    let stringifyCategoryData = JSON.stringify(this.categoryArray);

    localStorage.setItem('categories' , stringifyCategoryData);
    console.table(this.categoryArray);

    return this.categoryArray;

  }


}
