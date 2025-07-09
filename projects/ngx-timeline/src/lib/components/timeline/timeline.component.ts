import { Component, Input } from '@angular/core';
import { TimelineUser, TimelineItem } from '../../models/timeline.model';

@Component({
  selector: 'ngx-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  @Input() users: TimelineUser[] = [];
  @Input() items: TimelineItem[] = [];
  @Input() viewMode: 'day' | 'hour' = 'day';

  getHour(date: Date): number {
    return new Date(date).getHours();
  }

  getItemsForUser(userId: string): TimelineItem[] {
    return this.items.filter(item => item.userId === userId);
  }


}
