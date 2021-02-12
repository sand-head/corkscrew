import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export default class IndexViewModel {
  private timer: Observable<number>;
  // regular properties get "screwed in" once
  paragraph: string = 'howdy gamers! this only shows when the timer is even :)';
  // observable properties are one-way bound, and get "screwed in" on every change
  timerText: Observable<string>;
  timerIsEven: Observable<boolean>;
  // subject properties are two-way bound
  textInput: BehaviorSubject<string>;

  constructor() {
    this.timer = timer(0, 1000);
    this.timerText = this.timer.pipe(map(time => `This page has been up for ${time} second(s).`));
    this.timerIsEven = this.timer.pipe(map(time => time % 2 === 0));
    this.textInput = new BehaviorSubject('This text is two-way bound!');
  }
}