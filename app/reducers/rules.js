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

    default:
      return state;
  }
}
