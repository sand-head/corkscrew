import { Screw } from '.';
import { bindValueOrObservable } from '../utils/bindValueOrObservable';

export const html: Screw = (target, value) =>
  bindValueOrObservable(value, (newValue) => {
    target.innerHTML = newValue;
  });