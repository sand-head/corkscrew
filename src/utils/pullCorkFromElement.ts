import { ViewModel } from '..';

/**
 * Pulls the cork data from the given element, using the provided view model's properties to fill it in.
 */
export function pullCorkFromElement(target: HTMLElement, viewModel: ViewModel): Record<string, any> {
  const cork = target.dataset['cork'];
  if (!cork) return {};

  // kinda want to not use the Function constructor for this...
  return new Function(...Object.keys(viewModel), `return {${cork}};`)
    .apply(null, Object.values(viewModel));
}