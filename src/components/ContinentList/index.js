import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getContinentsQuery } from '../../queries/queries';
import './index.css';
import ContryList from '../CountryList/index.js';

class ContinentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  displayContinents() {
    console.log(this.props.data)
    var data = this.props.data;
    if (data.loading) {
      return (<div>Loading continents...</div>);
    } else {
      return data.continents.map(continent => {
        return (
          <li key={continent.code} onClick={(e) => { this.setState({ selected: continent.code }) }}>
            {continent.name}
          </li>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <ul id="continent-list">
          {this.displayContinents()}
        </ul>
        <ContryList continentId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getContinentsQuery)(ContinentList);
