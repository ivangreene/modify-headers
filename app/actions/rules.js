import types from '../constants/ActionTypes';

export default {
  addRule(siteId, headerId, rule) {
    return { type: types.ADD_RULE, siteId, headerId, rule };
  },

  deleteRule(siteId, headerId, id) {
    return { type: types.DELETE_RULE, siteId, headerId, id };
  },

  editRule(siteId, headerId, id, rule) {
    return { type: types.EDIT_RULE, siteId, headerId, id, rule };
  },

  addHeader(siteId, header) {
    return { type: types.ADD_HEADER, siteId, header };
  },

  deleteHeader(siteId, id) {
    return { type: types.DELETE_HEADER, siteId, id };
  },

  editHeader(siteId, id, header) {
    return { type: types.EDIT_HEADER, siteId, id, header };
  },

  addSite(site) {
    return { type: types.ADD_SITE, site };
  },

  deleteSite(id) {
    return { type: types.DELETE_SITE, id };
  },

  editSite(id, site) {
    return { type: types.EDIT_SITE, id, site };
  },
}
