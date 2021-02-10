import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export default class IndexViewModel {
  paragraph: Observable<string>;
  timer: Observable<string>;

  constructor() {
    this.paragraph = new Observable(observer => {
      observer.next('howdy gamers!');
      observer.complete();
    });
    this.timer = timer(0, 1000).pipe(map(time => `This page has been up for ${time} second(s).`));
  }
}