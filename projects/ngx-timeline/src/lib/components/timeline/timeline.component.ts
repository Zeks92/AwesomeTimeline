import { Component, Input, OnInit } from '@angular/core';
import {
  TimelineUser,
  TimelineItem,
  GroupedTimelineItem,
} from '../../models/timeline.model';

@Component({
  selector: 'ngx-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() users: TimelineUser[] = [];
  @Input() items: TimelineItem[] = [];
  @Input() viewMode: 'day' | 'week' = 'day';
  @Input() selectedDate: Date = new Date();

  viewColumns: (number | string)[] = [];
  activeTooltipItem: TimelineItem | null = null;
  activeGroupTooltipId: string | null = null;
  activeUserWithTooltip: string | null = null;
  draggingItem: any = null;
  dragStartX: number = 0;
  dragHandle: 'left' | 'right' | null = null;
  originalStartTime: Date = new Date();
  originalEndTime: Date = new Date();
  originalItemLeftOffset: number = 0;
  originalItemWidth: number = 0;
  originalDraggingItemState: TimelineItem | null = null;
  selectedDateStartOfDay: Date = new Date();

  ngOnInit(): void {
    this.generateColumns();
    this.selectedDateStartOfDay = this.getStartOfDay(this.selectedDate);
  }

  ngOnChanges(): void {
    this.generateColumns();
    this.selectedDateStartOfDay = this.getStartOfDay(this.selectedDate);
  }

  private generateColumns(): void {
    if (this.viewMode === 'day') {
      this.viewColumns = Array.from({ length: 24 }, (_, i) => i);
    } else if (this.viewMode === 'week') {
      this.viewColumns = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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

  getWeekDates(): Date[] {
  const startOfWeek = this.getStartOfWeek(this.selectedDate);
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDates.push(day);
  }
  return weekDates;
}

getWeekDayName(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long'
  };
  return date.toLocaleDateString('en-US', options);
}

  isLastUser(index: number): boolean {
    return index === this.users.length - 1;
  }

  getWeekDayIndex(date: Date): number {
    const jsDay = new Date(date).getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }

  getGroupedItemsForUserAndDay(
    userId: string,
    dayIndex: number
  ): GroupedTimelineItem | null {
    if (this.viewMode !== 'week') return null;

    const itemsForUser = this.items.filter((item) => item.userId === userId);
    let referenceDateForWeek: Date;
    if (this.items && this.items.length > 0) {
      referenceDateForWeek = new Date(this.selectedDate);
    } else {
      referenceDateForWeek = new Date();
    }

    const startOfWeek = this.getStartOfWeek(this.selectedDate);

    const targetDay = new Date(startOfWeek);
    targetDay.setDate(startOfWeek.getDate() + dayIndex);

    const itemsForTargetDay = itemsForUser.filter((item) => {
      const itemDay = this.getStartOfDay(item.start);
      return itemDay.getTime() === targetDay.getTime();
    });

    if (itemsForTargetDay.length > 0) {
      itemsForTargetDay.sort((a, b) => a.start.getTime() - b.start.getTime());
      return {
        date: targetDay,
        items: itemsForTargetDay,
        count: itemsForTargetDay.length,
        id: `${userId}-${targetDay.toISOString().split('T')[0]}`,
      };
    }
    return null;
  }

  getStartOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(d.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

getFormattedWeekHeaderDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

  getFormattedWeekDay(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
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
      return this.items.filter((item) => {
        const isSameUser = item.userId === userId;
        const isSameDay =
          this.getStartOfDay(item.start).getTime() ===
          this.selectedDateStartOfDay.getTime();
        return isSameUser && isSameDay;
      });
    }
    return [];
  }

  getItemLeftOffset(item: TimelineItem): number {
    if (this.viewMode === 'day') {
      const startMinutesFromMidnight =
        item.start.getHours() * 60 + item.start.getMinutes();
      return Math.round(startMinutesFromMidnight * this._pixelsPerMinute);
    }
    return 0;
  }

  getItemWidth(item: TimelineItem): number {
    if (this.viewMode === 'day') {
      const start = item.start.getTime();
      const end = item.end.getTime();
      const durationMinutes = (end - start) / (1000 * 60);
      return Math.round(durationMinutes * this._pixelsPerMinute);
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

  onDragStart(
    event: MouseEvent,
    item: TimelineItem,
    handle: 'left' | 'right'
  ): void {
    if (this.viewMode !== 'day') return;
    event.stopPropagation();
    this.originalDraggingItemState = {
      ...item,
      start: new Date(item.start),
      end: new Date(item.end),
    };

    this.draggingItem = item;
    this.dragStartX = event.clientX;
    this.originalStartTime = new Date(item.start);
    this.originalEndTime = new Date(item.end);
    this.originalItemLeftOffset = this.getItemLeftOffset(item);
    this.originalItemWidth = this.getItemWidth(item);
    this.dragHandle = handle;

    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup', this.onDragEnd);
  }

  onDragMove = (event: MouseEvent): void => {
    if (!this.draggingItem || this.dragStartX === null || !this.dragHandle)
      return;

    const deltaX = event.clientX - this.dragStartX;
    const originalStartPx = this.originalItemLeftOffset;
    const originalEndPx = this.originalItemLeftOffset + this.originalItemWidth;
    let newStartPx: number;
    let newEndPx: number;

    const minDurationMinutes = 15;
    const minWidthPx = minDurationMinutes * this._pixelsPerMinute;

    if (this.dragHandle === 'left') {
      newStartPx = originalStartPx + deltaX;
      newEndPx = originalEndPx;
      if (newStartPx < 0) {
        newStartPx = 0;
      }
      let currentWidthPx = newEndPx - newStartPx;
      if (currentWidthPx < minWidthPx) {
        currentWidthPx = minWidthPx;
        newStartPx = newEndPx - minWidthPx;
      }
    } else if (this.dragHandle === 'right') {
      newStartPx = originalStartPx;
      newEndPx = originalEndPx + deltaX;
      const maxTimelineWidth = this.viewColumns.length * 100;
      if (newEndPx > maxTimelineWidth) {
        newEndPx = maxTimelineWidth;
      }
      let currentWidthPx = newEndPx - newStartPx;
      if (currentWidthPx < minWidthPx) {
        currentWidthPx = minWidthPx;
        newEndPx = newStartPx + minWidthPx;
      }
    } else {
      return;
    }
    const newStartMinutesFromMidnight = newStartPx / this._pixelsPerMinute;
    const newStartHour = Math.floor(newStartMinutesFromMidnight / 60);
    const newStartMinute = Math.round(newStartMinutesFromMidnight % 60);

    const newEndMinutesFromMidnight = newEndPx / this._pixelsPerMinute;
    const newEndHour = Math.floor(newEndMinutesFromMidnight / 60);
    const newEndMinute = Math.round(newEndMinutesFromMidnight % 60);

    const newStartDate = new Date(this.selectedDateStartOfDay);
    newStartDate.setHours(newStartHour, newStartMinute, 0, 0);
    newStartDate.setHours(newStartHour, newStartMinute, 0, 0);

    const newEndDate = new Date(this.selectedDateStartOfDay);
    newEndDate.setHours(newEndHour, newEndMinute, 0, 0);
    newEndDate.setHours(newEndHour, newEndMinute, 0, 0);
    if (
      newEndDate.getTime() <
      newStartDate.getTime() + minDurationMinutes * 60 * 1000
    ) {
      newEndDate.setTime(
        newStartDate.getTime() + minDurationMinutes * 60 * 1000
      );
    }

    this.draggingItem.start = newStartDate;
    this.draggingItem.end = newEndDate;
  };

  timeToMinutes(date: Date): number {
    return date.getHours() * 60 + date.getMinutes();
  }

  onDragEnd = (event: MouseEvent): void => {
    if (!this.draggingItem) return;

    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);
    const hasOverlap = this.checkOverlap(this.draggingItem);

    if (hasOverlap) {
      alert('Meeting cannot overlap with another meeting for the same user!');
      if (this.originalDraggingItemState) {
        const index = this.items.findIndex(
          (i) => i.id === this.draggingItem?.id
        );
        if (index !== -1 && this.draggingItem) {
          this.draggingItem.start = this.originalDraggingItemState.start;
          this.draggingItem.end = this.originalDraggingItemState.end;
          this.draggingItem.title = this.originalDraggingItemState.title;
          this.draggingItem.color = this.originalDraggingItemState.color;
        }
      }
    }

    this.draggingItem = null;
    this.dragStartX = 0;
    this.originalItemLeftOffset = 0;
    this.originalItemWidth = 0;
    this.originalStartTime = new Date();
    this.originalEndTime = new Date();
    this.dragHandle = null;
    this.originalDraggingItemState = null;
  };

  checkOverlap(itemToCheck: TimelineItem): boolean {
    const itemsForUser = this.items.filter(
      (i) => i.userId === itemToCheck.userId
    );

    for (const existingItem of itemsForUser) {
      if (existingItem === itemToCheck) {
        continue;
      }

      const overlap =
        itemToCheck.start.getTime() < existingItem.end.getTime() &&
        itemToCheck.end.getTime() > existingItem.start.getTime();

      if (overlap) {
        return true;
      }
    }
    return false;
  }

  shiftTime(originalTime: Date, minutesToShift: number): Date {
    const shifted = new Date(originalTime);
    shifted.setMinutes(shifted.getMinutes() + minutesToShift);
    return shifted;
  }

  padTime(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  get _pixelsPerMinute(): number {
    return 100 / 60;
  }

  getFormattedDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }
}