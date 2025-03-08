import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeSliderComponent } from './fade-slider.component';

describe('FadeSliderComponent', () => {
  let component: FadeSliderComponent;
  let fixture: ComponentFixture<FadeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FadeSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FadeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
