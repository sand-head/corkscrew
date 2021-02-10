import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export default class IndexViewModel {
  private timer: Observable<number>;
  paragraph: string = 'howdy gamers! this only shows when the timer is even :)';
  timerText: Observable<string>;
  timerIsEven: Observable<boolean>;

  constructor() {
    this.timer = timer(0, 1000);
    this.timerText = this.timer.pipe(map(time => `This page has been up for ${time} second(s).`));
    this.timerIsEven = this.timer.pipe(map(time => time % 2 === 0));
  }
}