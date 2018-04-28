import types from '../constants/ActionTypes';

export default {
  addSite(pattern) {
    return { type: types.ADD_SITE, pattern };
  },

  deleteSite(id) {
    return { type: types.DELETE_SITE, id };
  },

  editSite(id, pattern) {
    return { type: types.EDIT_SITE, id, pattern };
  },

  addHeader(siteId, header) {
    return { type: types.ADD_HEADER, siteId, header };
  },

  deleteHeader(id) {
    return { type: types.DELETE_HEADER, id };
  },

  editHeader(id, header) {
    return { type: types.EDIT_HEADER, id, header };
  },

  addRule(siteId, headerId, rule) {
    return {
      type: types.ADD_RULE,
      siteId,
      headerId,
      match: rule.match,
      replacement: rule.replacement,
    };
  },

  deleteRule(id) {
    return { type: types.DELETE_RULE, id };
  },

  editRule(id, rule) {
    return {
      type: types.EDIT_RULE,
      id,
      match: rule.match,
      replacement: rule.replacement,
    };
  },
}
