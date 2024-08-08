import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidemainbarComponent } from './sidemainbar/sidemainbar.component';
import { ViewstudentComponent } from './viewstudent/viewstudent.component';
import { AddstudentComponent } from './addstudent/addstudent.component';

const routes: Routes = [
  { path:'', component: SidemainbarComponent,
  children: [
    { path: 'form', component: AddstudentComponent },
    { path: 'viewstudent', component: ViewstudentComponent },
    {path: 'form/:id', component:AddstudentComponent}
  ],
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
