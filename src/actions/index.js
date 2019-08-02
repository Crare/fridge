export * from './AuthActions';
export * from './ProductActions';
export * from './PurchaseActions';
export * from './ReportActions';

import {
  RESET
} from './types';


export const reset = () => {
  return {
    type: RESET
  };
}