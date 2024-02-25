import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotsComponent } from './pilots.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('PilotsComponent', () => {
  let component: PilotsComponent;
  let fixture: ComponentFixture<PilotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotsComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showPilots when pilotsUrls change', () => {
    spyOn(component, 'showPilots');
    component.pilotsUrls = ['url1', 'url2'];
    component.ngOnChanges({ pilotsUrls: { currentValue: component.pilotsUrls } } as any);
    expect(component.showPilots).toHaveBeenCalled();
  });

});
