import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { StarshipDetails } from "../interfaces/starship.interface";


@Injectable({ providedIn: 'root' })
export class StarshipService {

  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = 'https://swapi.dev/api/starships';
  private readonly _imagesUrl = 'https://starwars-visualguide.com/assets/img';

  getStarshipList(): Observable<StarshipDetails> {
    return this._http.get<StarshipDetails>(this._apiUrl);
  }






}
