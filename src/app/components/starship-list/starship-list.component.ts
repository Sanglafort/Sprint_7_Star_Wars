
import { Component, OnInit, inject } from '@angular/core';
import { StarshipService } from '../../services/starship.service';

import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { StarshipDetails } from '../../interfaces/starship.interface';

@Component({
  selector: 'starship-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starship-list.component.html',
  styleUrl: './starship-list.component.css'
})
export class StarshipListComponent implements OnInit {

  public starshipList = inject(StarshipService);
  public starshipDetails: any[] = [];
  // public currentPage: number = 1;
  // public load:boolean = true;

  //constructor(public route: Route) {}

  ngOnInit(): void {
    this.showDetails();
  }

  public showDetails():void {
    this.starshipList.getStarshipList().subscribe({
      next: (data: StarshipDetails) => {
        this.starshipDetails = data.results;
        this.starshipDetails.forEach(ship => {
          ship.id = ship.url.split('/').reverse()[1];
        });
        console.log(this.starshipDetails);

      }
    })

  }



 // public starshipsList$ = this.starshipList.getStarshipList()

}
