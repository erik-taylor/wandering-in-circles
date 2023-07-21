import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from "@angular/common";
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  standalone: true,
  selector: 'app-image-gallery',
  imports: [NgFor, NgIf, NgOptimizedImage, NgxPaginationModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  newImgArr: string[] = [];
  imageFetchError: boolean = false;
  p: number = 1;


  shuffleImages = (): object => {
    let randomizedImages = this.newImgArr.sort((a,b) => 0.5 - Math.random());
    return randomizedImages;
  }

  reverseImages = (): object => {
    let reversedArr = this.newImgArr.reverse();
    return reversedArr;
  }

  fetchImages = async() => {
    let res = await fetch('https://res.cloudinary.com/wanderingincircles/image/list/wandering.json');
    if(res.ok) {
      let data = await res.json();
      let resources = await data.resources;
      resources.forEach((img: any) => {
        let {public_id, version, format} = img;
        let imgUrl = `https://res.cloudinary.com/wanderingincircles/image/upload/c_scale,w_700/f_auto/q_auto/v${version}/${public_id}.${format}`;
        this.newImgArr.push(imgUrl);
        this.shuffleImages();  
        //this.reverseImages();  
      });
    } else {
      console.error(`dun f*ckd up that http response`);
      this.imageFetchError = true;
    }
  }

  ngOnInit(): void {
    this.fetchImages();
  }

  
}
