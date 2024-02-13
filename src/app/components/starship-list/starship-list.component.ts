
import { Component, OnInit, inject } from '@angular/core';
import { StarshipService } from '../../services/starship.service';

import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Starship } from '../../interfaces/starship.interface';

@Component({
  selector: 'starship-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './starship-list.component.html',
  styleUrl: './starship-list.component.css'
})
export class StarshipListComponent implements OnInit {

  public starshipList = inject(StarshipService);
  public starship: any[] = [];
  public starshipDetails: any[] = [];
  public nextPage: string = '';
  // public load:boolean = true;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.showList();
  }

  public showList():void {
    this.starshipList.getStarshipList().subscribe({
      next: (data: Starship) => {
        this.starshipDetails = data.results;
        this.starshipDetails.forEach(starship => {
          starship.id = starship.url.split('/').reverse()[1];
        });
        console.log(this.starshipDetails);
      }
    })
  }

  public showStarship(id: string) {
    if(id) {
      this.router.navigate(['/starships', id])
    }
  }






}
