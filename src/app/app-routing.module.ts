import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from './manage-test-category/category-details/category-details.component';
import { CategoryListComponent } from './manage-test-category/category-list/category-list.component';

const routes: Routes = [

  {
    path: "",
    component : CategoryListComponent,
    pathMatch : "full"
    
  },
  {
    path: "home",
    component : CategoryListComponent,
    pathMatch : "full"
    
  },
  {
    path: "testCategory",
    component : CategoryListComponent,
    pathMatch : "full"
    
  },
  {
    path: "testCategory/create",
    component : CategoryDetailsComponent,
    pathMatch : "full"
    
  },
  {
    path: "testCategory/:id",
    component : CategoryDetailsComponent,
    pathMatch : "full"
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
