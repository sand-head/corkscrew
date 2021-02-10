import { Screw } from '.';
import { bindValueOrObservable } from '../utils/bindValueOrObservable';

export const text: Screw = (target, value) =>
  bindValueOrObservable(value, (newValue) => {
    target.innerText = newValue;
  });