import { expect } from 'chai';
import ActionTypes from '../../../app/constants/ActionTypes';
import reducer from '../../../app/reducers';

const initialState = {
  sites: [],
  headers: [],
  rules: [],
};

describe('site rule reducer', () => {
  it('should return an initial state', () => {
    expect(reducer(undefined, {})).to.eql(initialState);
  });

  it('should let us add a site', () => {
    expect(reducer(initialState, {
      type: ActionTypes.ADD_SITE,
      pattern: 'foo\\.biz',
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

  it('should let us edit a site', () => {
    expect(reducer({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [],
      rules: [],
    }, {
      type: ActionTypes.EDIT_SITE,
      id: 0,
      pattern: 'baz\\.quux',
    })).to.eql({
      sites: [{ pattern: 'baz\\.quux', id: 0, }],
      headers: [],
      rules: [],
    });
  });

  it('should let us add a header rule', () => {
    expect(reducer({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [],
      rules: [],
    }, {
      type: ActionTypes.ADD_HEADER,
      siteId: 0,
      header: 'Content-Type',
    })).to.eql({
      sites: [{ pattern: 'foo\\.biz', id: 0, }],
      headers: [{ header: 'Content-Type', siteId: 0, id: 0 }],
      rules: [],
    });
  });
});

/*
describe('todoapp todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      todos(undefined, {})
    ).to.eql([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle ADD_TODO', () => {
    expect(
      todos([], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: false,
      id: 0
    }]);

    expect(
      todos([{
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);

    expect(
      todos([{
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.ADD_TODO,
        text: 'Fix the tests'
      })
    ).to.eql([{
      text: 'Fix the tests',
      completed: false,
      id: 2
    }, {
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle DELETE_TODO', () => {
    expect(
      todos([{
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.DELETE_TODO,
        id: 1
      })
    ).to.eql([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle EDIT_TODO', () => {
    expect(
      todos([{
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.EDIT_TODO,
        text: 'Fix the tests',
        id: 1
      })
    ).to.eql([{
      text: 'Fix the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle COMPLETE_TODO', () => {
    expect(
      todos([{
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.COMPLETE_TODO,
        id: 1
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle COMPLETE_ALL', () => {
    expect(
      todos([{
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.COMPLETE_ALL
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: true,
      id: 0
    }]);

    // Unmark if all todos are currently completed
    expect(
      todos([{
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: true,
        id: 0
      }], {
        type: types.COMPLETE_ALL
      })
    ).to.eql([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      todos([{
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }], {
        type: types.CLEAR_COMPLETED
      })
    ).to.eql([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [{
        type: types.COMPLETE_TODO,
        id: 0
      }, {
        type: types.CLEAR_COMPLETED
      }, {
        type: types.ADD_TODO,
        text: 'Write more tests'
      }].reduce(todos, [{
        id: 0,
        completed: false,
        text: 'Use Redux'
      }, {
        id: 1,
        completed: false,
        text: 'Write tests'
      }])
    ).to.eql([{
      text: 'Write more tests',
      completed: false,
      id: 2
    }, {
      text: 'Write tests',
      completed: false,
      id: 1
    }]);
  });
});
*/
