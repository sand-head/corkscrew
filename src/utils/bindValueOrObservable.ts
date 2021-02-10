import { Observable, Subscription, SubscriptionLike } from 'rxjs';

export function bindValueOrObservable(value: object | Observable<any>, callback: (value: any) => void): Subscription | SubscriptionLike {
  if ('subscribe' in value) {
    return value.subscribe(callback);
  }

  callback(value);
  return {
    closed: true,
    unsubscribe: () => {}
  };
}