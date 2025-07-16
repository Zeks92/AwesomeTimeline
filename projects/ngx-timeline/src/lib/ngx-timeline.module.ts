import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@NgModule({
  declarations: [TimelineComponent, TooltipComponent],
  imports: [CommonModule],
  exports: [TimelineComponent, TooltipComponent],
})
export class NgxTimelineModule {}
