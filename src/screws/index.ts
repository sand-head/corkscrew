import { Observable, Subscription, SubscriptionLike } from 'rxjs';

import { hidden } from './hidden';
import { text } from './text';
import { visible } from './visible';

export type Screw = (target: HTMLElement, value: object | Observable<any>) => Subscription | SubscriptionLike;

export const screws: Record<string, Screw> = {
  hidden,
  text,
  visible
};