import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PaintingsComponent } from './paintings/paintings.component';
import { DesignComponent } from './design/design.component';


const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'paintings', component: PaintingsComponent},
  { path: 'design', component: DesignComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full'},
  //{ path: '**', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
