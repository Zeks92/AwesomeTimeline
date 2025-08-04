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
  { id: 'u3', name: 'Dejan' },
  { id: 'u4', name: 'Dragana' },
  { id: 'u5', name: 'Petar' },
  { id: 'u6', name: 'Jovan' },
  { id: 'u7', name: 'Milica' },
  { id: 'u8', name: 'Nikola' },
];
items: TimelineItem[] = [
  { id: 't-ana-1-04', userId: 'u1', title: 'Team Sync', start: new Date('2025-08-04T09:00:00'), end: new Date('2025-08-04T09:45:00'), color: '#4caf50' },
  { id: 't-ana-2-04', userId: 'u1', title: 'Code Review', start: new Date('2025-08-04T14:00:00'), end: new Date('2025-08-04T15:30:00'), color: '#4caf50' },
  { id: 't-marko-1-04', userId: 'u2', title: 'Sprint Planning', start: new Date('2025-08-04T11:00:00'), end: new Date('2025-08-04T12:00:00'), color: '#2196f3' },
  { id: 't-dejan-1-04', userId: 'u3', title: 'Daily Standup', start: new Date('2025-08-04T09:00:00'), end: new Date('2025-08-04T09:15:00'), color: '#f44336' },
  { id: 't-dragana-1-04', userId: 'u4', title: 'UX/UI Review', start: new Date('2025-08-04T10:00:00'), end: new Date('2025-08-04T11:00:00') },
  { id: 't-petar-1-04', userId: 'u5', title: 'Client Call', start: new Date('2025-08-04T10:00:00'), end: new Date('2025-08-04T11:00:00') },
  { id: 't-jovan-1-04', userId: 'u6', title: 'Refactoring', start: new Date('2025-08-04T13:00:00'), end: new Date('2025-08-04T14:00:00'), color: '#ff9800' },
  { id: 't-milica-1-04', userId: 'u7', title: 'Feature planning', start: new Date('2025-08-04T10:30:00'), end: new Date('2025-08-04T11:30:00'), color: '#9c27b0' },
  { id: 't-milica-2-04', userId: 'u7', title: 'BE-FE Sync', start: new Date('2025-08-04T15:00:00'), end: new Date('2025-08-04T15:45:00'), color: '#9c27b0' },
  { id: 't-nikola-1-04', userId: 'u8', title: 'Bug Fixing', start: new Date('2025-08-04T14:30:00'), end: new Date('2025-08-04T16:00:00'), color: '#009688' },
  { id: 't-ana-1-05', userId: 'u1', title: '1-on-1 with PM', start: new Date('2025-08-05T10:00:00'), end: new Date('2025-08-05T10:30:00'), color: '#4caf50' },
  { id: 't-ana-2-05', userId: 'u1', title: 'Design Review', start: new Date('2025-08-05T13:00:00'), end: new Date('2025-08-05T14:00:00'), color: '#4caf50' },
  { id: 't-marko-1-05', userId: 'u2', title: 'Sprint Grooming', start: new Date('2025-08-05T11:00:00'), end: new Date('2025-08-05T12:00:00'), color: '#2196f3' },
  { id: 't-dejan-1-05', userId: 'u3', title: 'Daily Standup', start: new Date('2025-08-05T09:00:00'), end: new Date('2025-08-05T09:15:00'), color: '#f44336' },
  { id: 't-dragana-1-05', userId: 'u4', title: 'BE-FE Sync', start: new Date('2025-08-05T15:00:00'), end: new Date('2025-08-05T16:00:00') },
  { id: 't-jovan-1-05', userId: 'u6', title: 'Code Analysis', start: new Date('2025-08-05T10:00:00'), end: new Date('2025-08-05T11:00:00'), color: '#ff9800' },
  { id: 't-milica-1-05', userId: 'u7', title: 'Client Follow-up', start: new Date('2025-08-05T11:30:00'), end: new Date('2025-08-05T12:00:00'), color: '#9c27b0' },
  { id: 't-milica-2-05', userId: 'u7', title: 'Planning Session', start: new Date('2025-08-05T14:30:00'), end: new Date('2025-08-05T15:00:00'), color: '#9c27b0' },
  { id: 't-nikola-1-05', userId: 'u8', title: 'Refactoring', start: new Date('2025-08-05T14:30:00'), end: new Date('2025-08-05T16:00:00'), color: '#009688' },
  { id: 't-ana-1-06', userId: 'u1', title: 'Team Sync', start: new Date('2025-08-06T09:00:00'), end: new Date('2025-08-06T09:45:00'), color: '#4caf50' },
  { id: 't-ana-2-06', userId: 'u1', title: 'Architecture Planning', start: new Date('2025-08-06T14:00:00'), end: new Date('2025-08-06T15:30:00'), color: '#4caf50' },
  { id: 't-marko-1-06', userId: 'u2', title: 'Sprint Review', start: new Date('2025-08-06T11:00:00'), end: new Date('2025-08-06T12:00:00'), color: '#2196f3' },
  { id: 't-dejan-1-06', userId: 'u3', title: 'Daily Standup', start: new Date('2025-08-06T09:00:00'), end: new Date('2025-08-06T09:15:00'), color: '#f44336' },
  { id: 't-jovan-1-06', userId: 'u6', title: 'Tech Debt Discussion', start: new Date('2025-08-06T13:00:00'), end: new Date('2025-08-06T14:00:00'), color: '#ff9800' },
  { id: 't-milica-1-06', userId: 'u7', title: 'UI Mockups', start: new Date('2025-08-06T10:30:00'), end: new Date('2025-08-06T11:30:00'), color: '#9c27b0' },
  { id: 't-milica-2-06', userId: 'u7', title: 'UX Research', start: new Date('2025-08-06T15:00:00'), end: new Date('2025-08-06T15:45:00'), color: '#9c27b0' },
  { id: 't-petar-1-06', userId: 'u5', title: 'Code review', start: new Date('2025-08-06T14:00:00'), end: new Date('2025-08-06T15:30:00') },
  { id: 't-ana-1-07', userId: 'u1', title: 'Team Sync', start: new Date('2025-08-07T09:00:00'), end: new Date('2025-08-07T09:45:00'), color: '#4caf50' },
  { id: 't-marko-1-07', userId: 'u2', title: 'Sprint Retrospective', start: new Date('2025-08-07T11:00:00'), end: new Date('2025-08-07T12:00:00'), color: '#2196f3' },
  { id: 't-dejan-1-07', userId: 'u3', title: 'Daily Standup', start: new Date('2025-08-07T09:00:00'), end: new Date('2025-08-07T09:15:00'), color: '#f44336' },
  { id: 't-jovan-1-07', userId: 'u6', title: 'Code Analysis', start: new Date('2025-08-07T13:00:00'), end: new Date('2025-08-07T14:00:00'), color: '#ff9800' },
  { id: 't-milica-1-07', userId: 'u7', title: 'Client Follow-up', start: new Date('2025-08-07T11:30:00'), end: new Date('2025-08-07T12:00:00'), color: '#9c27b0' },
  { id: 't-nikola-1-07', userId: 'u8', title: 'Bug Fixing', start: new Date('2025-08-07T14:30:00'), end: new Date('2025-08-07T16:00:00'), color: '#009688' },
  { id: 't-ana-1-08', userId: 'u1', title: 'Team Sync', start: new Date('2025-08-08T09:00:00'), end: new Date('2025-08-08T09:45:00'), color: '#4caf50' },
  { id: 't-marko-1-08', userId: 'u2', title: 'Retrospective', start: new Date('2025-08-08T11:00:00'), end: new Date('2025-08-08T12:00:00'), color: '#2196f3' },
  { id: 't-dejan-1-08', userId: 'u3', title: 'Daily Standup', start: new Date('2025-08-08T09:00:00'), end: new Date('2025-08-08T09:15:00'), color: '#f44336' },
  { id: 't-dragana-1-08', userId: 'u4', title: 'UX Finalization', start: new Date('2025-08-08T10:00:00'), end: new Date('2025-08-08T11:00:00') },
  { id: 't-petar-1-08', userId: 'u5', title: 'Client Demo', start: new Date('2025-08-08T14:00:00'), end: new Date('2025-08-08T15:30:00') },
  { id: 't-jovan-1-08', userId: 'u6', title: 'Planning', start: new Date('2025-08-08T13:00:00'), end: new Date('2025-08-08T14:00:00'), color: '#ff9800' },
  { id: 't-milica-1-08', userId: 'u7', title: 'Stakeholder Meeting', start: new Date('2025-08-08T10:30:00'), end: new Date('2025-08-08T11:30:00'), color: '#9c27b0' },
  { id: 't-nikola-1-08', userId: 'u8', title: 'Bug Fixing', start: new Date('2025-08-08T14:30:00'), end: new Date('2025-08-08T16:00:00'), color: '#009688' },
];
}
