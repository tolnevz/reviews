import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewRoutingModule } from './review-routing.module';
import { FormsModule } from '@angular/forms';
import { ReviewDetailComponent } from './review-detail/review-detail.component';

@NgModule({
  declarations: [ReviewListComponent, ReviewDetailComponent],
  imports: [CommonModule, ReviewRoutingModule, FormsModule],
})
export class ReviewModule {}
