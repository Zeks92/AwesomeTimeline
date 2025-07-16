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
    { id: 'u3', name: 'Dejan'},
    { id: 'u4', name: 'Dragana'}
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
      id: 't1',
      userId: 'u1',
      title: 'Meeting 2',
      start: new Date('2025-07-09T10:00:00'),
      end: new Date('2025-07-09T11:00:00'),
      color: '#4caf50',
    },
    {
      id: 't2',
      userId: 'u2',
      title: 'Code review',
      start: new Date('2025-07-09T10:00:00'),
      end: new Date('2025-07-09T11:30:00'),
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Daily standup',
      start: new Date('2025-07-09T12:00:00'),
      end: new Date('2025-07-09T12:30:00'),
    },
        {
      id: 't4',
      userId: 'u4',
      title: 'BE sync',
      start: new Date('2025-07-10T14:00:00'),
      end: new Date('2025-07-10T15:00:00'),
    }
  ];
}
