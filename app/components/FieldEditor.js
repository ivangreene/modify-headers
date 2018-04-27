import React, { Component } from 'react';
import style from '../containers/App.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class FieldEditor extends Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    newItem: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
    };
  }

  handleSubmit = (e) => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newItem) {
        this.setState({ text: '' });
      }
    }
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleBlur = (e) => {
    if (!this.props.newItem) {
      this.props.onSave(e.target.value);
    }
  }

  render() {
    return (
      <input
        type="text"
        className={style.input}
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}
