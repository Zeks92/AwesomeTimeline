export interface TimelineUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface TimelineItem {
  id: string;
  userId: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}
