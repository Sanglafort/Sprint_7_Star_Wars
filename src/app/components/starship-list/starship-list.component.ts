
import { Component, OnInit, inject } from '@angular/core';
import { StarshipService } from '../../services/starship.service';

import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Starship, StarshipDetails } from '../../interfaces/starship.interface';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'starship-list',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './starship-list.component.html',
  styleUrl: './starship-list.component.css'
})
export class StarshipListComponent implements OnInit {

  public starshipService = inject(StarshipService);
  public starshipList: StarshipDetails[] = [];
  public currentPage: number = 1;
  public load: boolean = true;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.showList();
  }

  public showList():void {
    this.starshipService.getStarshipList(this.currentPage).subscribe({
      next: (data: Starship) => {
        console.log(data);
        const moreStarships = data.results;
        if(data.next !== null) {
          moreStarships.forEach(starship => {
            starship.id = starship.url.split('/').reverse()[1];
          })
          this.starshipList = this.starshipList.concat(moreStarships)
          console.log(this.starshipList);
        }
      },
      error: (error) => {
        console.error('Load starships error', error)
      }
    })
  }

  public showStarship(id: string) {
    if(id) {
      this.router.navigate(['/starships', id])
    }
  }

  onScroll() {
    if(this.load) {
      this.currentPage ++;
      this.showList();
    }
  }

  scrollUp() {
    if(this.load) {
      this.currentPage --;
      this.showList();
    }
  }


}
