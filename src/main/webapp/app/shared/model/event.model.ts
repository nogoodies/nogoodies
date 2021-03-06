import { Moment } from 'moment';

export interface IEvent {
  id?: number;
  time?: Moment;
  user?: string;
  origin?: string;
  userId?: string;
  tweetText?: string;
  tweetId?: string;
}

export const defaultValue: Readonly<IEvent> = {};
