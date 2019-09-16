import React, { Component } from 'react';
import { Query } from 'react-apollo';
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
    console.log(this.props.data);
    return (
      <Query query={getContinentsQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading continents...';
          if (error) return `Error! ${error.message}`;

          return data.continents.map(continent => {
            return (
              <li key={continent.code} onClick={(e) => { this.setState({ selected: continent.code }) }}>
                {continent.name}
              </li>
            )
          })
        }}
      </Query>
    );
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

export default ContinentList;
