import { HeroeComponent } from './pages/heroe/heroe.component';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';


const routes: Routes=[
  {path: 'heroes', component: HeroesComponent},
  {path: 'heroe/:id', component: HeroeComponent},
  {path: '**',pathMatch: 'full', redirectTo: 'heroes'},

]

@NgModule({
  // declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
