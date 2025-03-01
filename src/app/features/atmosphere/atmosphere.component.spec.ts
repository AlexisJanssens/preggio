import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmosphereComponent } from './atmosphere.component';

describe('AtmosphereComponent', () => {
  let component: AtmosphereComponent;
  let fixture: ComponentFixture<AtmosphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmosphereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmosphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
