import { Screw } from '.';
import { bindValueOrObservable } from '../utils/bindValueOrObservable';

export const data: Screw = (target, value) =>
  bindValueOrObservable(value, (newValue) => {
    if (typeof(newValue) !== 'object') {
      console.error(`Screw "data" requires the value to be an object, but it was "${typeof(newValue)}".`);
      return;
    }

    for (const [data, dataValue] of newValue) {
      if (dataValue === false || dataValue === null || dataValue === undefined) {
        // if the value is explicitly false-y, remove it from the target
        delete target.dataset[data];
      } else {
        // todo: account for an observable being here
        // gonna have to do some shenanigans to avoid nested subscriptions
        target.dataset[data] = dataValue;
      }
    }
  });