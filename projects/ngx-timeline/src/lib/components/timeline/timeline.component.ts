import { Component, Input, OnInit } from '@angular/core';
import { TimelineUser, TimelineItem, GroupedTimelineItem } from '../../models/timeline.model';

@Component({
  selector: 'ngx-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() users: TimelineUser[] = [];
  @Input() items: TimelineItem[] = [];
  @Input() viewMode: 'day' | 'week' = 'day';

  viewColumns: (number | string)[] = [];
  activeTooltipItem: TimelineItem | null = null;
  activeGroupTooltipId: string | null = null;
  activeUserWithTooltip: string | null = null;

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

    private getStartOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  isLastUser(index: number): boolean {
    return index === this.users.length - 1;
  }

  getWeekDayIndex(date: Date): number {
    const jsDay = new Date(date).getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }
    getGroupedItemsForUserAndDay(userId: string, dayIndex: number): GroupedTimelineItem | null {
    if (this.viewMode !== 'week') return null;

    const itemsForUser = this.items.filter(item => item.userId === userId);
    let referenceDateForWeek: Date;
    if (this.items && this.items.length > 0) {
      referenceDateForWeek = new Date(this.items[0].start);
    } else {
      referenceDateForWeek = new Date();
    }

    const startOfWeek = new Date(this.getStartOfDay(referenceDateForWeek));
    startOfWeek.setDate(startOfWeek.getDate() - this.getWeekDayIndex(startOfWeek));

    const targetDay = new Date(startOfWeek);
    targetDay.setDate(startOfWeek.getDate() + dayIndex);

    const itemsForTargetDay = itemsForUser.filter(item => {
      const itemDay = this.getStartOfDay(item.start);
      return itemDay.getTime() === targetDay.getTime();
    });

    if (itemsForTargetDay.length > 0) {
      itemsForTargetDay.sort((a, b) => a.start.getTime() - b.start.getTime());
      return {
        date: targetDay,
        items: itemsForTargetDay,
        count: itemsForTargetDay.length,
        id: `${userId}-${targetDay.toISOString().split('T')[0]}`
      };
    }
    return null;
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
    if (this.viewMode === 'day') {
      return this.items.filter((item) => item.userId === userId);
    }
    return [];
  }

  getItemLeftOffset(item: TimelineItem): number {
    if (this.viewMode === 'day') {
      const hour = item.start.getHours();
      const minutes = item.start.getMinutes();
      const cellWidth = 100;
      return (hour * cellWidth) + (minutes / 60) * cellWidth;
    }
    return 0;
  }

  getItemWidth(item: TimelineItem): number {
    if (this.viewMode === 'day') {
      const start = item.start.getTime();
      const end = item.end.getTime();
      const durationMinutes = (end - start) / (1000 * 60);
      const cellWidth = 100;
      return (durationMinutes / 60) * cellWidth;
    }
    return 100;
  }

  getWeekItemLeftOffset(dayIndex: number): number {
    const cellWidth = 100;
    return dayIndex * cellWidth;
  }

    getTimelineRowZIndex(userId: string): number {
    if (this.activeUserWithTooltip === userId) {
      return 10000;
    }
    return 1;
  }
}
