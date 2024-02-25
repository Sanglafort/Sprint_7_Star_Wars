import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StarshipListComponent } from './starship-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';

describe('StarshipListComponent', () => {
  let component: StarshipListComponent;
  let fixture: ComponentFixture<StarshipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipListComponent, CommonModule, HttpClientModule, RouterModule, InfiniteScrollModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showList on ngOnInit', () => {
    spyOn(component, 'showList');
    component.ngOnInit();
    expect(component.showList).toHaveBeenCalled();
  });

  it('should call showList on onScroll', fakeAsync(() => {
    spyOn(component, 'showList');
    component.onScroll();
    tick();
    expect(component.showList).toHaveBeenCalled();
  }));

  it('should call showList on scrollUp', fakeAsync(() => {
    spyOn(component, 'showList');
    component.scrollUp();
    tick();
    expect(component.showList).toHaveBeenCalled
  }));

  it('should navigate to starship details on showStarship', () => {
    spyOn(component.router, 'navigate');
    const id = '123';
    component.showStarship(id);
    expect(component.router.navigate).toHaveBeenCalledWith(['/starships', id]);
  });


});
