import { bind } from '@sand-head/corkscrew';
import IndexViewModel from './view-models/IndexViewModel';

const subs = bind(IndexViewModel);

// unsubscribe after 10 seconds:
// setTimeout(_ => subs.unsubscribe(), 10000);