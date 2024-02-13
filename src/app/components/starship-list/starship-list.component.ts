
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
  // public starship: StarshipDetails[] = [];
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
       // this.starshipList = [...this.starshipList, data.results]

        this.starshipList = data.results;
        this.starshipList.forEach(starship => {
          starship.id = starship.url.split('/').reverse()[1];
        });
        console.log(this.starshipList);


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
