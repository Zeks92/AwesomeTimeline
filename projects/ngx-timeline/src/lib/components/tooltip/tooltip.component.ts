import { Component, Input } from '@angular/core';
import { TimelineItem } from '../../models/timeline.model';

@Component({
  selector: 'ngx-timeline-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() items: TimelineItem[] = [];

  formatTime(date: Date): string {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
