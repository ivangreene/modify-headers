import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import SiteItem from './SiteItem';
import style from '../containers/App.css';

export default class MainSection extends Component {

  static propTypes = {
    sites: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { sites, actions } = this.props;

    return (
      <div>
        <section className={style.section}>
          <Header addSite={actions.addSite} />
          <ul>
            {sites.map(site =>
              <SiteItem key={site.id} site={site} actions={actions} />
            )}
          </ul>
        </section>
      </div>
    );
  }
}
