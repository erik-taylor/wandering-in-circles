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
  page: number = 1;


  shuffleImages = (): object => {
    let randomizedImages = this.newImgArr.sort((a,b) => 0.5 - Math.random());
    return randomizedImages;
  }

  fetchImages = async () => {
    try {
      const res = await fetch('https://res.cloudinary.com/wanderingincircles/image/list/wandering.json');
      this.imageFetchError = false;
      if (res.ok) {
        const data = await res.json();
        const resources = await data.resources;
  
        // Sort resources by created_at in descending order
        const sortedResources = resources.sort((a:any, b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  
        // Process the sorted resources
        sortedResources.forEach((img: any) => {
          const { public_id, version, format } = img;
          const imgUrl = `https://res.cloudinary.com/wanderingincircles/image/upload/c_scale,w_700/f_auto/q_auto/v${version}/${public_id}.${format}`;
          this.newImgArr.push(imgUrl);
        });
        console.log(this.newImgArr);
      } else {
        console.error(`Failed to fetch images. HTTP status: ${res.status}`);
        this.imageFetchError = true;
      }
    } catch (error) {
      console.error('An error occurred during image fetch:', error);
      this.imageFetchError = true;
    }
  };

  ngOnInit(): void {
    this.fetchImages();
  }

  
}
