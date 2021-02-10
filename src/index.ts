import { screws } from './screws/index';

export class ViewModel {
  // what do we need here?
  // maybe scan DOM for initial props and feed them into constructor
  // like how react class components do it
}

/**
 * Binds the given view model to the target DOM element, or the document body if none provided.
 */
export function bind<T extends ViewModel>(viewModel: T, target?: HTMLElement) {
  target ??= document.body;
  // this is probably a very inefficient way of getting all these elements
  const screwableElements: NodeListOf<HTMLElement> = target.querySelectorAll('[data-cork]');

  for (const screwableElement of screwableElements) {
    const bindings: Record<string, string> = JSON.parse(screwableElement.dataset['cork']!);
    for (const [binding, vmProp] of Object.entries(bindings)) {
      if (!(binding in screws)) {
        console.warn(`No screws for binding ${binding} available`);
        continue;
      } else if (!(vmProp in viewModel)) {
        console.warn(`No property in view model called ${binding}`);
        continue;
      }
      // todo: make this not awful later
      screws[binding](screwableElement, (viewModel as any)[vmProp]);
    }
  }
}