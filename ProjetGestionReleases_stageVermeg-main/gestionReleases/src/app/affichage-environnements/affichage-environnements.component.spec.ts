import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageEnvironnementsComponent } from './affichage-environnements.component';

describe('AffichageEnvironnementsComponent', () => {
  let component: AffichageEnvironnementsComponent;
  let fixture: ComponentFixture<AffichageEnvironnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageEnvironnementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichageEnvironnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
