import { Screw } from '.';
import { bindValueOrObservable } from '../utils/bindValueOrObservable';

export const hidden: Screw = (target, value) =>
  bindValueOrObservable(value, (newValue) => {
    if (newValue) {
      target.style.display = 'none';
    } else {
      target.style.removeProperty('display');
    }
  });