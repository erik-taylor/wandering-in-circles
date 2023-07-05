import { Component, OnInit } from '@angular/core';
import { NgFor, NgOptimizedImage } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-image-gallery',
  imports: [NgFor, NgOptimizedImage],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  tagUrl = 'https://res.cloudinary.com/wanderingincircles/image/list/wandering.json';
  exampleUrl = 'https://res.cloudinary.com/wanderingincircles/image/upload/v1688088193/053_i2limy.jpg';

  newImgArr: string[] = [];


  shuffleImages = () => {
    let randomizedImages = this.newImgArr.sort((a,b) => 0.5 - Math.random())
    //console.log(randomizedImages);
  }

  ngOnInit(): void {

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
      .finally(() => this.shuffleImages());
  }

  
}
