import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaScuolaComponent } from './casa-scuola.component';

describe('CasaScuolaComponent', () => {
  let component: CasaScuolaComponent;
  let fixture: ComponentFixture<CasaScuolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasaScuolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaScuolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
