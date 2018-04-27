import { expect } from 'chai';
import ActionTypes from '../../../app/constants/ActionTypes';
import reducer from '../../../app/reducers';

const initialState = {
  sites: [],
  headers: [],
  rules: [],
};

describe('header rule reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('should let us add a header', () => {
    expect(reducer({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [],
      rules: [],
    }, {
      type: ActionTypes.ADD_HEADER,
      header: 'Content-Type',
      siteId: 0,
    })).to.eql({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [{ header: 'Content-Type', id: 0, siteId: 0, }],
      rules: [],
    });
  });

  it('should let us delete a header', () => {
    expect(reducer({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [{ header: 'Content-Type', id: 0, siteId: 0, }],
      rules: [],
    }, {
      type: ActionTypes.DELETE_HEADER,
      id: 0,
    })).to.eql({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [],
      rules: [],
    });
  });

  it('should let us delete a site, and delete headers belonging to that site',
      () => {
        expect(reducer({
          sites: [{ pattern: 'foo\\.biz', id: 0, }],
          headers: [{ header: 'Content-Type', siteId: 0, id: 0 }],
          rules: [],
        }, {
          type: ActionTypes.DELETE_SITE,
          id: 0,
        })).to.eql(initialState);
  });

  it('should let us edit a header', () => {
    expect(reducer({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [{ header: 'Content-Type', id: 0, siteId: 0, }],
      rules: [],
    }, {
      type: ActionTypes.EDIT_HEADER,
      id: 0,
      header: 'Content-Disposition',
    })).to.eql({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [{ header: 'Content-Disposition', id: 0, siteId: 0, }],
      rules: [],
    });
  });
});
