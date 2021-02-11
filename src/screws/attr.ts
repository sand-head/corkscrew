import { isObservable, Subscription } from 'rxjs';
import { Screw } from '.';
import { bindValueOrObservable } from '../utils/bindValueOrObservable';
import { NoopSubscription } from '../utils/noopSubscription';

export const attr: Screw = (target, value) => {
  if (typeof(value) !== 'object') {
    console.error(`Screw "attr" requires the value to be an object, but it was "${typeof(value)}".`);
    return NoopSubscription;
  } else if (isObservable(value)) {
    console.error(`Screw "attr" does not accept an Observable as an input.`);
    return NoopSubscription;
  }

  const parentSubscription = new Subscription();
  for (const [attr, attrValue] of Object.entries(value as Record<string, any>)) {
    parentSubscription.add(bindValueOrObservable(attrValue, (newValue) => {
      if (newValue === false || newValue === null || newValue === undefined) {
        // if the value is explicitly false-y, remove it from the target
        target.removeAttribute(attr);
      } else {
        target.setAttribute(attr, newValue);
      }
    }));
  }
  return parentSubscription;
};