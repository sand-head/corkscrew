import { Observable, Subscription } from 'rxjs';

interface SubscriptionLike {
  unsubscribe: () => void
}
const NO_SUBSCRIPTION: SubscriptionLike = {
  unsubscribe: () => {}
};

export function bindValueOrObservable(value: object | Observable<any>, callback: (value: any) => void): Subscription | SubscriptionLike {
  if ('subscribe' in value) {
    return value.subscribe(callback);
  }

  callback(value);
  return NO_SUBSCRIPTION;
}