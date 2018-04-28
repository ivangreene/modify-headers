import { expect } from 'chai';
import ActionTypes from '../../../app/constants/ActionTypes';
import sites from '../../../app/reducers/sites';

const initialState = [];

describe('site reducer', () => {
  it('should return an initial state', () => {
    expect(sites(undefined, {})).to.eql(initialState);
  });

  it('should let us add a site', () => {
    expect(sites(initialState, {
      type: ActionTypes.ADD_SITE,
      pattern: 'foo\\.biz',
    })).to.eql([{ pattern: 'foo\\.biz', id: 0, }]);
  });

  it('should let us delete a site', () => {
    expect(sites([
        { pattern: 'foo\\.biz', id: 0, },
        { pattern: 'baz\\.quux', id: 1, },
      ], {
        type: ActionTypes.DELETE_SITE,
        id: 0,
    })).to.eql([{ pattern: 'baz\\.quux', id: 1, }]);
  });

  it('should let us edit a site', () => {
    expect(sites([{ pattern: 'foo\\.biz', id: 0, }], {
      type: ActionTypes.EDIT_SITE,
      id: 0,
      pattern: 'baz\\.quux',
    })).to.eql([{ pattern: 'baz\\.quux', id: 0, }]);
  });
});
