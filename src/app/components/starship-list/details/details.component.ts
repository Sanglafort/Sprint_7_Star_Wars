import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { StarshipService } from '../../../services/starship.service';
import { StarshipDetails } from '../../../interfaces/starship.interface';
import { PilotsComponent } from './pilots/pilots.component';
import { FilmsComponent } from './films/films.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PilotsComponent, FilmsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  public starshipService = inject(StarshipService);
  public starshipId: string = '';
  public starshipCard: StarshipDetails | undefined;

  public pilots: string[] = [];
  public films: string[] = [];

  public pilotsLoaded: boolean = false;
  public filmsLoaded: boolean = false;

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.starshipId = params.get('id')!;
    });

    this.showCard(this.starshipId);
  }

  public showCard(id:any) {
    this.starshipService.getStarshipCard(id).subscribe({
      next: async (data: StarshipDetails) => {
        this.starshipCard = data;
        this.pilots = this.starshipCard.pilots;
        this.films = this.starshipCard.films;
        await this.showImage(id);
        this.pilotsLoaded = true;
        this.filmsLoaded = true;
      }
    });
  }

  public async showImage(id:any) {
    try {
      this.starshipCard!.url = await this.starshipService.getImages(id)
    } catch(error) {
      this.starshipCard!.url = 'assets/img/not_found.jpg'
    }

  }

}
