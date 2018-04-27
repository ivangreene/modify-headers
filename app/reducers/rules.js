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
          let newRule = Object.assign({}, rule);
          if (action.match !== undefined) {
            newRule.match = action.match;
          }
          if (action.replacement !== undefined) {
            newRule.replacement = action.replacement;
          }
          return newRule;
        }
        return rule;
      })];

    default:
      return state;
  }
}
