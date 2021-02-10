import { Subscription } from 'rxjs';
import { screws } from './screws/index';
import { pullCorkFromElement } from './utils/pullCorkFromElement';

export type ViewModel = { new(): any };

/**
 * Binds the given view model to the target DOM element, or the document body if none provided.
 * 
 * To unmount, simply unsubscribe from the returned subscription.
 */
export function bind(viewModelClass: ViewModel, target?: HTMLElement): Subscription {
  target ??= document.body;
  // this is probably a very inefficient way of getting all these elements
  // plus we lose out on where exactly these elements are in the DOM
  // meaning if we want to have a "with" screw, we need a different way of getting these
  const corkedElements: NodeListOf<HTMLElement> = target.querySelectorAll('[data-cork]');
  // todo: consider scanning DOM for "initial state" and passing it to view model
  const viewModel = new viewModelClass();

  const parentSubscription = new Subscription();
  for (const corkedElement of corkedElements) {
    const cork = pullCorkFromElement(corkedElement, viewModel);

    for (const potentialScrew of Object.keys(cork)) {
      if (!(potentialScrew in screws)) {
        console.warn(`No screw ${potentialScrew} available for target`, corkedElement);
        continue;
      }
      
      parentSubscription.add(screws[potentialScrew](corkedElement, cork[potentialScrew]));
    }
  }
  return parentSubscription;
}