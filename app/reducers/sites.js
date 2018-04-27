import {
  ADD_SITE,
  DELETE_SITE,
  EDIT_SITE,
} from '../constants/ActionTypes';

const initialState = [];

export default function sites (state = initialState, action) {
  switch (action.type) {
    case ADD_SITE:
      return [...state, {
        id: state.reduce((maxId, site) => Math.max(site.id, maxId), -1) + 1,
        pattern: action.pattern,
      }];

    case DELETE_SITE:
      return [...state.filter(site => site.id !== action.id)];

    case EDIT_SITE:
      return [...state.map(site => {
        if (site.id === action.id) {
          return Object.assign({}, site, {
            pattern: action.pattern,
          });
        }
        return site;
      })];

    default:
      return state;
  }
}
