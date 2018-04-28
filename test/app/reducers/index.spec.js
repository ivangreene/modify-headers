import { expect } from 'chai';
import reducer from '../../../app/reducers';

const initialState = {
  sites: [],
  headers: [],
  rules: [],
};

describe('combined reducers', () => {
  it('should return the expected initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });
});
