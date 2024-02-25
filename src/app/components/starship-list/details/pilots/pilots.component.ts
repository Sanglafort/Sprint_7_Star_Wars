import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pilot } from '../../../../interfaces/starship.interface';
import { StarshipService } from '../../../../services/starship.service';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.css'
})
export class PilotsComponent implements OnChanges {

  @Input() pilotsUrls: string[] = [];

  public pilotsArray: Pilot[] = [];

  constructor(public starshipService: StarshipService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pilotsUrls'] && changes['pilotsUrls'].currentValue) this.showPilots();
  }

  public showPilots() {
    this.pilotsUrls.forEach(pilotUrl => {
      const pilotId = pilotUrl.split("/").filter(seg => seg !== "").pop();
      this.starshipService.showPilot(pilotUrl)
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            const pilot: Pilot = {
              id: pilotId!,
              name: res.name,
              imageUrl: res.name
            }
            this.showPilotsImages(pilotId!, pilot);
            this.pilotsArray.push(pilot);
          }
        }
      )
    })
  }

  async showPilotsImages(id:string, pilot: Pilot):Promise<void> {
    try {
      pilot.imageUrl = await this.starshipService.showPilotImage(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}
