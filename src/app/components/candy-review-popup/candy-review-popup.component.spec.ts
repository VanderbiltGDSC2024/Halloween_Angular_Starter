import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyReviewPopupComponent } from './candy-review-popup.component';

describe('CandyReviewPopupComponent', () => {
  let component: CandyReviewPopupComponent;
  let fixture: ComponentFixture<CandyReviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandyReviewPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandyReviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
