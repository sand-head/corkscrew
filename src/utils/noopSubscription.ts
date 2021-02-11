import { SubscriptionLike } from "rxjs";

export const NoopSubscription: SubscriptionLike = {
  closed: true,
  unsubscribe: () => {}
};