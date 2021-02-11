import { isObservable, Subscription } from 'rxjs';
import { Screw } from '.';
import { bindValueOrObservable } from '../utils/bindValueOrObservable';
import { NoopSubscription } from '../utils/noopSubscription';

export const data: Screw = (target, value) => {
  if (typeof(value) !== 'object') {
    console.error(`Screw "data" requires the value to be an object, but it was "${typeof(value)}".`);
    return NoopSubscription;
  } else if (isObservable(value)) {
    console.error(`Screw "data" does not accept an Observable as an input.`);
    return NoopSubscription;
  }

  const parentSubscription = new Subscription();
  for (const [data, dataValue] of Object.entries(value as Record<string, any>)) {
    parentSubscription.add(bindValueOrObservable(dataValue, (newValue) => {
      if (newValue === false || newValue === null || newValue === undefined) {
        // if the value is explicitly false-y, remove it from the target
        delete target.dataset[data];
      } else {
        target.dataset[data] = newValue;
      }
    }));
  }
  return parentSubscription;
};