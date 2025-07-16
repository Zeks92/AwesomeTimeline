import { Component, Input, OnInit } from '@angular/core';
import { TimelineUser, TimelineItem } from '../../models/timeline.model';

@Component({
  selector: 'ngx-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() users: TimelineUser[] = [];
  @Input() items: TimelineItem[] = [];
  @Input() viewMode: 'day' | 'week' | 'month' = 'day';

  viewColumns: (number | string)[] = [];
  showTooltip: string | null = null;

  ngOnInit(): void {
    this.generateColumns();
  }

  ngOnChanges(): void {
    this.generateColumns();
  }

  private generateColumns(): void {
    if (this.viewMode === 'day') {
      this.viewColumns = Array.from({ length: 24 }, (_, i) => i);
    } else if (this.viewMode === 'week') {
      this.viewColumns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (this.viewMode === 'month') {
      this.viewColumns = Array.from({ length: 31 }, (_, i) => i + 1);
    }
  }

  getInnerWidth(): string {
    return this.viewMode === 'week'
      ? `${this.viewColumns.length * 100}px`
      : '2400px';
  }

  isLastUser(index: number): boolean {
    return index === this.users.length - 1;
  }

  getWeekDayIndex(date: Date): number {
    const jsDay = new Date(date).getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }

  getItemsForCell(userId: string, cellIndex: number): TimelineItem[] {
    return this.items.filter((item) => {
      const matchesUser = item.userId === userId;
      if (this.viewMode === 'day') {
        return matchesUser && this.getHour(item.start) === cellIndex;
      } else if (this.viewMode === 'week') {
        return matchesUser && this.getWeekDayIndex(item.start) === cellIndex;
      }
      return false;
    });
  }

  getTooltipText(userId: string, cellIndex: number): string {
    const items = this.getItemsForCell(userId, cellIndex);
    return items.map((i) => i.title).join(', ');
  }

  getHour(date: Date): number {
    return new Date(date).getHours();
  }

  getItemsForUser(userId: string): TimelineItem[] {
    return this.items.filter((item) => item.userId === userId);
  }
}
