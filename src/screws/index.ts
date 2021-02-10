import { Observable, Subscription, SubscriptionLike } from 'rxjs';
import { text } from './text';

export type Screw = (target: HTMLElement, value: object | Observable<any>) => Subscription | SubscriptionLike;

export const screws: Record<string, Screw> = {
  text
};