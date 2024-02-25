import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsComponent } from './films.component';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showFilms when filmsUrls change', () => {
    spyOn(component, 'showFilms');
    component.filmsUrls = ['url1', 'url2'];
    component.ngOnChanges({ filmsUrls: { currentValue: component.filmsUrls } } as any);
    expect(component.showFilms).toHaveBeenCalled();
  });


});

