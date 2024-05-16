import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratsModalComponent } from './congrats-modal.component';

describe('CongratsModalComponent', () => {
  let component: CongratsModalComponent;
  let fixture: ComponentFixture<CongratsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongratsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
