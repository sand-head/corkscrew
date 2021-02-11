import { Screw } from '.';
import { bindValueOrObservable } from '../utils/bindValueOrObservable';

export const attr: Screw = (target, value) =>
  bindValueOrObservable(value, (newValue) => {
    if (typeof(newValue) !== 'object') {
      console.error(`Screw "attr" requires the value to be an object, but it was "${typeof(newValue)}".`);
      return;
    }

    for (const [attr, attrValue] of newValue) {
      if (attrValue === false || attrValue === null || attrValue === undefined) {
        // if the value is explicitly false-y, remove it from the target
        target.removeAttribute(attr);
      } else {
        // todo: account for an observable being here
        // gonna have to do some shenanigans to avoid nested subscriptions
        target.setAttribute(attr, attrValue);
      }
    }
  });