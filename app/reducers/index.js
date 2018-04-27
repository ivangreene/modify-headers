import { combineReducers } from 'redux';
import sites from './sites';
import headers from './headers';
import rules from './rules';

export default combineReducers({
  sites,
  headers,
  rules,
});
