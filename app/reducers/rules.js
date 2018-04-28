import {
  DELETE_SITE,
  DELETE_HEADER,
  ADD_RULE,
  DELETE_RULE,
  EDIT_RULE,
} from '../constants/ActionTypes';

const initialState = [];

export default function rules (state = initialState, action) {
  switch (action.type) {
    case ADD_RULE:
      return [...state, {
        id: state.reduce((maxId, rule) => Math.max(rule.id, maxId), -1) + 1,
        siteId: action.siteId,
        headerId: action.headerId,
        match: action.match,
        replacement: action.replacement,
      }];

    case DELETE_RULE:
      return [...state.filter(rule => rule.id !== action.id)];

    case EDIT_RULE:
      return [...state.map(rule => {
        if (rule.id === action.id) {
          return Object.assign({}, rule, {
            match: action.match === undefined ?
                rule.match : action.match,
            replacement: action.replacement === undefined ?
                rule.replacement : action.replacement,
          });
        }
        return rule;
      })];

    case DELETE_SITE:
      return [...state.filter(rule => rule.siteId !== action.id)];

    case DELETE_HEADER:
      return [...state.filter(rule => rule.headerId !== action.id)];

    default:
      return state;
  }
}
