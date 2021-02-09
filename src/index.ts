import { Observable } from 'rxjs';
import { screws } from './screws';

/**
 * Binds the given view model to the target DOM element, or the document body if none provided.
 */
export function bind(viewModel: Record<string, object | Observable<any>>, target?: HTMLElement) {
  target ??= document.body;
  const screwableElements: NodeListOf<HTMLElement> = target.querySelectorAll('[data-screw]');

  for (const screwableElement of screwableElements) {
    const bindings: Record<string, string> = JSON.parse(screwableElement.dataset['screw']!);
    for (const [binding, vmProp] of Object.entries(bindings)) {
      if (!(binding in screws)) {
        console.warn(`No screws for binding ${binding} available`);
      }

      screws[binding](screwableElement, viewModel[vmProp]);
    }
  }
}