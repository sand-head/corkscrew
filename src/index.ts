import { Subscription } from 'rxjs';
import { screws } from './screws/index';
import { pullCorkFromElement } from './utils/pullCorkFromElement';

function nextNode<TNode extends Node>(node: TNode): TNode | null {
  return (node.nextSibling ?? node.firstChild) as TNode | null;
}

export type ViewModel = { new(): any };

/**
 * Binds the given view model to the target DOM element, or the document body if none provided.
 * 
 * To unmount, simply unsubscribe from the returned subscription.
 */
export function bind(viewModelClass: ViewModel, target?: HTMLElement): Subscription {
  target ??= document.body;
  const treeWalker: TreeWalker = document.createTreeWalker(target, undefined, {
    acceptNode: (node) => node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement)?.dataset['cork'] != null
      ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  });
  // todo: consider scanning DOM for "initial state" and passing it to view model
  const viewModel = new viewModelClass();

  const parentSubscription = new Subscription();
  let currentElement: HTMLElement | null = treeWalker.currentNode as HTMLElement;
  while (currentElement !== null) {
    console.log('current element', currentElement);
    const cork = pullCorkFromElement(currentElement, viewModel);

    for (const potentialScrew of Object.keys(cork)) {
      if (!(potentialScrew in screws)) {
        console.warn(`No screw ${potentialScrew} available for target`, currentElement);
        continue;
      }
      
      parentSubscription.add(screws[potentialScrew](currentElement, cork[potentialScrew]));
    }

    currentElement = treeWalker.nextNode() as HTMLElement | null;
  }
  return parentSubscription;
}