import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldEditor from './FieldEditor';
import style from '../containers/App.css';
import classnames from 'classnames';

export default class SiteItem extends Component {

  static propTypes = {
    header: PropTypes.object.isRequired,
    site: PropTypes.object.isRequired,
    rule: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: '',
    };
  }

  handleClick = (field) => () => {
    this.setState({ editing: field });
  };

  handleSave = (field) => (text) => {
      const { rule, header, site, actions: { editRule } } = this.props;
      const newRule = {
        [field]: text,
      };
      if (text.length !== 0) {
        editRule(site.id, header.id, rule.id, newRule);
      }
      this.setState({ editing: '' });
    };

  handleDelete = () => {
    const { rule, site, header, actions: { deleteRule } } = this.props;
    deleteRule(site.id, header.id, rule.id);
  };

  render() {
    const { rule } = this.props;

    let element;
      element = (
        <div>
          { this.state.editing === 'match' ?
              <FieldEditor
                text={rule.match}
                onSave={this.handleSave('match')}
              /> :
              <input
                className={classnames(style.input, style['is-static'])}
                value={rule.match}
                placeholder=".*"
                onClick={this.handleClick('match')}
                readOnly /> }
          { this.state.editing === 'replacement' ?
              <FieldEditor
                text={rule.replacement}
                onSave={this.handleSave('replacement')}
              /> :
              <input
                className={classnames(style.input, style['is-static'])}
                value={rule.replacement}
                placeholder="text/plain"
                onClick={this.handleClick('replacement')}
                readOnly /> }
        </div>
      );
    //}

    return (
      <li className={style.box}>
        <div className={classnames(style.field, style['is-grouped'])}>
          {element}
          <a className={style.delete}
             onClick={this.handleDelete}>
          </a>
        </div>
      </li>
    );
  }
}
