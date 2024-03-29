import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Pilot, Starship, StarshipDetails } from "../interfaces/starship.interface";


@Injectable({ providedIn: 'root' })
export class StarshipService {

  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = 'https://swapi.dev/api/starships';
  private readonly _imagesUrl = 'https://starwars-visualguide.com/assets/img';

  getStarshipList(page: number): Observable<Starship> {
    return this._http.get<Starship>(`${this._apiUrl}/?page=${page.toString()}`)
  }

  getStarshipCard(id: string): Observable<any> {
    return this._http.get<StarshipDetails>(`${this._apiUrl}/${id}`);
  }

  // Mostrar starship-cards

  async getImages(id:string):Promise<any>{
    try {
      const res = await fetch(`${this._imagesUrl}/starships/${id}.jpg`);
      if(res.ok) {
        const resData = await res.blob();
        const imgUrlData = URL.createObjectURL(resData);
        console.log(imgUrlData);
        return imgUrlData;
      } else {
        throw new Error ('Image not available');
      }
    } catch(error) {
      console.error(error)
      throw error
    }
  }

  // Mostrar pilotos

  showPilot(url: string) {
    return this._http.get<any>(url);
  }

  async showPilotImage(id: string):Promise<any> {
    try {
      const res = await fetch(`${this._imagesUrl}/characters/${id}.jpg`);

      if(res.ok) {
        const resData = await res.blob();
        const imageUrl = URL.createObjectURL(resData);
        console.log(imageUrl);
        return imageUrl;
      } else throw new Error ('Image not avalaible');

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Mostrar films

  showFilm(url: string) {
    return this._http.get<any>(url);
  }

  async showFilmImage(id: string):Promise<any> {
    try {
      const res = await fetch(`${this._imagesUrl}/films/${id}.jpg`);

      if(res.ok) {
        const resData = await res.blob();
        const imageUrl = URL.createObjectURL(resData);
        console.log(imageUrl);
        return imageUrl;
      } else throw new Error ('Image not avalaible');

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
