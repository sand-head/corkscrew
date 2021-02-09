import { Observable } from 'rxjs';
import { text } from './text';

export type Screw = (target: HTMLElement, value: object | Observable<any>) => void;

export const screws: Record<string, Screw> = {
  text
};