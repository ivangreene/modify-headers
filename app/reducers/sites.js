import ActionTypes from '../constants/ActionTypes';

const initialState = [{
  pattern: 'jccc\.edu',
  headers: [],
  id: 0,
}];

const actionsMap = {
  [ActionTypes.ADD_SITE](state, action) {
    return [{
      id: state.reduce((maxId, site) => Math.max(site.id, maxId), -1) + 1,
      pattern: action.site,
      headers: [],
    }, ...state];
  },
  [ActionTypes.DELETE_SITE](state, action) {
    return [...state.filter(site =>
      site.id !== action.id
    )];
  },
  [ActionTypes.EDIT_SITE](state, action) {
    return [...state.map(site =>
      (site.id === action.id ?
        Object.assign({}, site, { pattern: action.site }) :
        site)
    )];
  },
  [ActionTypes.ADD_HEADER](state, action) {
    return [...state.map(site =>
      (site.id === action.siteId ?
        Object.assign({}, site, { headers: [{
          id: site.headers.reduce((maxId, header) => Math.max(header.id,
              maxId), -1) + 1,
          rules: [],
          header: action.header,
        }, ...site.headers] }) :
        site)
    )];
  },
  [ActionTypes.DELETE_HEADER](state, action) {
    return [...state.map(site =>
      (site.id === action.siteId ?
        Object.assign({}, site, { headers:
          [...site.headers.filter(header => header.id !== action.id)]
        }) :
        site))];
  },
  [ActionTypes.EDIT_HEADER](state, action) {
    return [...state.map(site =>
      (site.id === action.siteId ?
        Object.assign({}, site, { headers: [...site.headers.map(header =>
          (header.id === action.id ?
            Object.assign({}, header, { header: action.header }) :
            header))]
        }) :
        site))];
  },
  [ActionTypes.ADD_RULE](state, action) {
    return [...state.map(site =>
      (site.id === action.siteId ?
        Object.assign({}, site, { headers: [...site.headers.map(header =>
          (header.id === action.headerId ?
            Object.assign({}, header, { rules: [{
              match: action.rule.match,
              replacement: action.rule.replacement,
              id: header.rules.reduce((maxId, rule) =>
                  Math.max(rule.id, maxId), -1) + 1,
            }, ...header.rules] }) :
            header))] }) :
        site))];
  },
  [ActionTypes.EDIT_RULE](state, action) {
    return [...state.map(site =>
      (site.id === action.siteId ?
        Object.assign({}, site, { headers: [...site.headers.map(header =>
          (header.id === action.headerId ?
            Object.assign({}, header, { rules: [...header.rules.map(rule =>
              (rule.id === action.id ?
                Object.assign({}, rule, {
                  match: action.rule.match,
                  replacement: action.rule.replacement,
                }) :
                rule))]
            }) :
            header))]
        }) :
        site))];
  },
  [ActionTypes.DELETE_RULE](state, action) {
    return [...state.map(site =>
      (site.id === action.siteId ?
        Object.assign({}, site, { headers: site.headers.map(header =>
          (header.id === action.headerId ?
            Object.assign({}, header, { rules: [...header.rules.filter(rule =>
              rule.id !== action.id)] }) :
            header))
        }) :
        site))];
  },
};

export default function sites(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
