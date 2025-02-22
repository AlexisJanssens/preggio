import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaPepeComponent } from './casa-pepe.component';

describe('CasaPepeComponent', () => {
  let component: CasaPepeComponent;
  let fixture: ComponentFixture<CasaPepeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasaPepeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaPepeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
