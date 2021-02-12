import { isObservable, Subject } from 'rxjs';
import { Screw } from '.';
import { NoopSubscription } from '../utils/noopSubscription';

function isSubject(value: any): value is Subject<unknown> {
  return isObservable(value) && 'next' in value;
}

export const value: Screw = (target, value) => {
  if (!isSubject(value)) {
    console.error('');
    return NoopSubscription;
  }

  // todo: subscribe to target change event
  return NoopSubscription;
};