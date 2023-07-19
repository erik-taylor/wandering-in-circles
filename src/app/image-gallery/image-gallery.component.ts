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
        .catch((error) => {
          this.imageFetchError = true;
          console.error(error);
        })
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
