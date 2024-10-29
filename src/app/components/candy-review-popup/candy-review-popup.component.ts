import { Component, Input } from '@angular/core';
import { setData } from '../../../backend/firebase';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candy-review-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './candy-review-popup.component.html',
  styleUrl: './candy-review-popup.component.css'
})

export class CandyReviewPopupComponent {
  @Input() title: string = "Test";
  @Input() description: string = "No rating";
  newRating: string = '';

  async submitRating() {
    if (this.newRating.trim()) {
      await setData(this.title, this.newRating);
      this.description = `Candy rating: ${this.newRating}`;
      this.newRating = '';
    }
  }
}
