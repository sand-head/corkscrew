import { Observable, Subscription, SubscriptionLike } from 'rxjs';

function isSubscribable(obj: any): obj is Observable<unknown> {
  return obj && typeof(obj) === 'object' && 'subscribe' in obj;
}

export function bindValueOrObservable(value: object | Observable<any>, callback: (value: any) => void): Subscription | SubscriptionLike {
  if (isSubscribable(value)) {
    return value.subscribe(callback);
  }

  callback(value);
  return {
    closed: true,
    unsubscribe: () => {}
  };
}