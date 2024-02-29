import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Film } from '../../../../interfaces/starship.interface';
import { StarshipService } from '../../../../services/starship.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent implements OnChanges {

  @Input() filmsUrls: string[] = [];

  public filmsArray: Film[] = [];

  constructor( public starshipService: StarshipService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmsUrls'] && changes['filmsUrls'].currentValue) this.showFilms();
  }

  public showFilms() {
    this.filmsUrls.forEach(filmUrl => {
      const filmId = filmUrl.split("/").filter(seg => seg !== "").pop();
      this.starshipService.showFilm(filmUrl)
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            const film: Film = {
              id: filmId!,
              title: res.title,
              episode: 'Episode ' + res.episode_id,
              imageUrl: ''
            }
            this.showFilmsImage(filmId!, film);
            this.filmsArray.push(film);
          }
        }
      )
    })
  }

  async showFilmsImage(id:string, film: Film):Promise<void> {
    try {
      film.imageUrl = await this.starshipService.showFilmImage(id);
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

}
