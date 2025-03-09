import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenSliderComponent } from './full-screen-slider.component';

describe('FullScreenSliderComponent', () => {
  let component: FullScreenSliderComponent;
  let fixture: ComponentFixture<FullScreenSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullScreenSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullScreenSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
