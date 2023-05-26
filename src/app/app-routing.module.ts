import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { RecentsearchComponent } from './components/recentsearch/recentsearch.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favourite', component: FavouriteComponent },
   { path: 'recent', component: RecentsearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
