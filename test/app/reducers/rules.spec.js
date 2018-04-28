import { expect } from 'chai';
import ActionTypes from '../../../app/constants/ActionTypes';
import rules from '../../../app/reducers/rules';

const initialState = [];

describe('rule reducer', () => {
  it('should return an initial state', () => {
    expect(rules(undefined, {})).to.eql(initialState);
  });

  it('should let us add a rule', () => {
    expect(rules(undefined, {
      type: ActionTypes.ADD_RULE,
      siteId: 0,
      headerId: 0,
      match: 'application/json',
      replacement: 'text/plain',
    })).to.eql([{
      match: 'application/json',
      replacement: 'text/plain',
      id: 0,
      siteId: 0,
      headerId: 0,
    }]);
  });

  it('should let us delete a rule', () => {
    expect(rules([{
      match: 'application/json',
      replacement: 'text/plain',
      id: 0,
      siteId: 0,
      headerId: 0,
    }, {
      match: 'application/json',
      replacement: 'text/plain',
      id: 1,
      siteId: 0,
      headerId: 0,
    }], {
      type: ActionTypes.DELETE_RULE,
      id: 0,
    })).to.eql([{
      match: 'application/json',
      replacement: 'text/plain',
      id: 1,
      siteId: 0,
      headerId: 0,
    }]);
  });

  it('should let us edit a rule', () => {
    expect(rules([{
      match: 'application/json',
      replacement: 'text/plain',
      id: 1,
      siteId: 0,
      headerId: 0,
    }], {
      type: ActionTypes.EDIT_RULE,
      id: 1,
      match: 'application/xml',
    })).to.eql([{
      match: 'application/xml',
      replacement: 'text/plain',
      id: 1,
      siteId: 0,
      headerId: 0,
    }]);
  });

  it('should delete rules associated with a site when that site is deleted',
      () => {
        expect(rules([{
          match: 'application/json',
          replacement: 'text/plain',
          id: 0,
          siteId: 1,
          headerId: 0,
        }, {
          match: 'application/json',
          replacement: 'text/plain',
          id: 1,
          siteId: 0,
          headerId: 0,
        }], {
          type: ActionTypes.DELETE_SITE,
          id: 0,
        })).to.eql([{
          match: 'application/json',
          replacement: 'text/plain',
          id: 0,
          siteId: 1,
          headerId: 0,
        }]);
  });

  it('should delete rules associated with a header when that header' +
      'is deleted', () => {
        expect(rules([{
          match: 'application/json',
          replacement: 'text/plain',
          id: 0,
          siteId: 0,
          headerId: 1,
        }, {
          match: 'application/json',
          replacement: 'text/plain',
          id: 1,
          siteId: 0,
          headerId: 0,
        }], {
          type: ActionTypes.DELETE_HEADER,
          id: 1,
        })).to.eql([{
          match: 'application/json',
          replacement: 'text/plain',
          id: 1,
          siteId: 0,
          headerId: 0,
        }]);
  });
});
