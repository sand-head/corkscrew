import { Subscription, SubscriptionLike } from 'rxjs';

import { attr } from './attr';
import { data } from './data';
import { hidden } from './hidden';
import { html } from './html';
import { text } from './text';
import { visible } from './visible';

export type Screw = (target: HTMLElement, value: any) => Subscription | SubscriptionLike;

export const screws: Record<string, Screw> = {
  attr,
  data,
  hidden,
  html,
  text,
  visible
};