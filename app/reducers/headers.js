import {
  ADD_SITE,
  DELETE_SITE,
  EDIT_SITE,
  ADD_HEADER,
  DELETE_HEADER,
  EDIT_HEADER,
} from '../constants/ActionTypes';

const initialState = [];

export default function headers (state = initialState, action) {
  switch (action.type) {
    case ADD_HEADER:
      return [...state, {
        id: state.reduce((maxId, site) => Math.max(site.id, maxId), -1) + 1,
        header: action.header,
        siteId: action.siteId,
      }];

    case DELETE_SITE:
      return [...state.filter(header => header.siteId !== action.id)];

    default:
      return state;
  }
}
