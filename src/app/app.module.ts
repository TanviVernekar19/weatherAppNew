import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { RecentsearchComponent } from './components/recentsearch/recentsearch.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { RemoveFavComponent } from './components/remove-fav/remove-fav.component';
import { RemoveRecentComponent } from './components/remove-recent/remove-recent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    FavouriteComponent,
    RecentsearchComponent,
    RemoveFavComponent,
    RemoveRecentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
