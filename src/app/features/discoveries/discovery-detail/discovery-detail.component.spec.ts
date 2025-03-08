import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryDetailComponent } from './discovery-detail.component';

describe('DiscoveryDetailComponent', () => {
  let component: DiscoveryDetailComponent;
  let fixture: ComponentFixture<DiscoveryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoveryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
