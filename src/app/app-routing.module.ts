import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PaintingsComponent } from './paintings/paintings.component';
import { DesignComponent } from './design/design.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePaintingsComponent } from './change-paintings/change-paintings.component';
import { ChangeCVComponent } from './change-cv/change-cv.component';



const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'paintings', component: PaintingsComponent},
  { path: 'contact', component: DesignComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'adminPaintings', component: ChangePaintingsComponent},
  { path: 'adminCv', component: ChangeCVComponent},
  { path: '**', redirectTo: '/admin', pathMatch: 'full'},
  

  
  //{ path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
