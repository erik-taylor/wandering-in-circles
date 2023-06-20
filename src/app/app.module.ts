import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImageComponent,
    ImageGalleryComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
