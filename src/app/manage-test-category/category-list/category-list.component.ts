import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TestCategory } from 'src/app/model/category.model';
import { TestCategoryService } from '../test-category.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements AfterViewInit {

  constructor(private router: Router,
    private testCategoryService: TestCategoryService) { }

  @ViewChild(MatSort)
  sort: MatSort = new MatSort()

  displayedColumns: string[] = ['categoryName', 'email', 'contactNumber', 'companyName', 'active', 'createDate', 'action']
  dataSource = new MatTableDataSource<TestCategory>([])


  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  ngAfterViewInit(): void {
    this.getCategories();
  }


  getCategories() {
    this.testCategoryService.getCategories()
      .then((categories) => {

        let filteredCategories = categories.filter((object: { isDeleted: boolean }) => {
          return object.isDeleted == false;
        });

        this.dataSource = new MatTableDataSource<TestCategory>(filteredCategories);
        this.dataSource.sort = this.sort;

        console.table(categories);
      })
      .catch((error) => {
        console.log(error)
      })

  }

  testCategory() {
    this.router.navigateByUrl('testCategory/create')

      .catch((error) => {
        console.log(error)
      })
  }

  editCategory(categoryId: number) {

    this.router.navigateByUrl('testCategory/' + categoryId)

      .catch((error) => {
        console.log(error)
      })

  }

  deleteCategory(categoryId: number) {
    this.testCategoryService.deleteCategory({
      categoryID: categoryId,
      isDeleted: true
    })
      .then((categories) => {
        let filteredCategories = categories.filter((object: { isDeleted: boolean }) => {
          return object.isDeleted == false;
        });
        this.dataSource = new MatTableDataSource<TestCategory>(filteredCategories);
      });

  }




}
