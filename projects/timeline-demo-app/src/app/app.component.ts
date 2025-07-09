import { Component } from '@angular/core';
import { TimelineUser, TimelineItem } from 'ngx-timeline';

@Component({
  selector: 'app-root',
  template: `
    <ngx-timeline
      [users]="users"
      [items]="items"
      [viewMode]="'day'"
    ></ngx-timeline>
  `,
})
export class AppComponent {
  users: TimelineUser[] = [
    { id: 'u1', name: 'Ana' },
    { id: 'u2', name: 'Marko' },
  ];

  items: TimelineItem[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Meeting',
      start: new Date('2025-07-09T08:00:00'),
      end: new Date('2025-07-09T09:00:00'),
      color: '#4caf50',
    },
    {
      id: 't2',
      userId: 'u2',
      title: 'Code review',
      start: new Date('2025-07-09T10:00:00'),
      end: new Date('2025-07-09T11:30:00'),
    },
  ];
}
