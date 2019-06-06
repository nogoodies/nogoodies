import { Moment } from 'moment';

export interface IEvent {
  id?: number;
  time?: Moment;
  user?: string;
  origin?: string;
}

export const defaultValue: Readonly<IEvent> = {};
