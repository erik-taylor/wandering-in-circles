import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-image-gallery',
  imports: [NgFor, NgIf, NgOptimizedImage],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  tagUrl = 'https://res.cloudinary.com/wanderingincircles/image/list/wandering.json';
  exampleUrl = 'https://res.cloudinary.com/wanderingincircles/image/upload/v1688088193/053_i2limy.jpg';

  newImgArr: string[] = [];
  imageFetchError: boolean = false;


  shuffleImages = () => {
    let randomizedImages = this.newImgArr.sort((a,b) => 0.5 - Math.random());
    return randomizedImages;
  }

  fetchImages = () => {
    try {
      fetch('https://res.cloudinary.com/wanderingincircles/image/list/wandering.json')
        .then((res) => res.json())
        .then((data) => {
          data.resources.forEach((img: any) => {
            let {public_id, version, format} = img;
            let imgUrl = `https://res.cloudinary.com/wanderingincircles/image/upload/c_scale,w_400/f_auto/q_auto/v${version}/${public_id}.${format}`;
            this.newImgArr.push(imgUrl);        
          });
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.imageFetchError = false;
          this.shuffleImages();
        });  
    } catch (error) {
      console.error(`dun f*ckd up that http response`);
      this.imageFetchError = true;
    }
  }

  ngOnInit(): void {
    this.fetchImages();
  }

  
}
