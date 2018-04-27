import { expect } from 'chai';
import ActionTypes from '../../../app/constants/ActionTypes';
import headers from '../../../app/reducers/headers';

const initialState = [];

describe('header rule reducer', () => {
  it('should return an initial state', () => {
    expect(headers(undefined, {})).to.eql(initialState);
  });

  it('should let us add a header', () => {
    expect(headers([], {
      type: ActionTypes.ADD_HEADER,
      header: 'Content-Type',
      siteId: 0,
    })).to.eql([{ header: 'Content-Type', id: 0, siteId: 0, }]);
  });

  it('should let us delete a header', () => {
    expect(headers([{ header: 'Content-Type', id: 0, siteId: 0, }], {
      type: ActionTypes.DELETE_HEADER,
      id: 0,
    })).to.eql(initialState);
  });

  it('should let us delete a site, and delete headers belonging to that site',
      () => {
        expect(headers([
          { header: 'Content-Type', siteId: 0, id: 0 },
          { header: 'Content-Disposition', siteId: 1, id: 1 },
        ], {
          type: ActionTypes.DELETE_SITE,
          id: 0,
        })).to.eql([{ header: 'Content-Disposition', siteId: 1, id: 1 }]);
  });

  it('should let us edit a header', () => {
    expect(headers([{ header: 'Content-Type', id: 0, siteId: 0, }], {
      type: ActionTypes.EDIT_HEADER,
      id: 0,
      header: 'Content-Disposition',
    })).to.eql([{ header: 'Content-Disposition', id: 0, siteId: 0, }]);
  });
});
