import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getCountriesQuery } from '../../queries/queries';
import './index.css';
import CountryDetails from '../CountryDetails/index.js'
import PropTypes from 'prop-types';

class CountryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selected: null
    }
  }

  displayCountries() {

    return (
      <Query query={getCountriesQuery} variables={{ code: this.props.continentId }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading countries...';
          if (error) return `Error! ${error.message}`;

          const { continent } = data;

          if (continent) {
            if (this.state.search == "") {
              return continent.countries.map(country => {
                return (
                  <li key={country.code} onClick={(e) => { this.setState({ selected: country.code }) }}>{country.name}</li>
                )
              });
            } else {
              return continent.countries
                .filter(country => country.name.toLowerCase().startsWith(this.state.search.toLowerCase()))
                .map(country => {
                  return (
                    <li key={country.code} onClick={(e) => { this.setState({ selected: country.code }) }}>{country.name}</li>
                  )
                }
                );
            }
          } else {
            return (
              <div>No continent selected...</div>
            )
          }
        }}
      </Query>
    );
  }

  handleSearch(e) {
    this.setState({ search: e.target.value })
  }

  render() {
    return (
      <div id="country-list-section">
        <div>
          <input className="search" type="text" onChange={this.handleSearch.bind(this)} placeholder=" Search country ..." />
        </div>
        <ul id="country-list">
          {this.displayCountries()}
        </ul>
        <CountryDetails countryId={this.state.selected} />
      </div>
    );
  }
}

CountryList.propTypes = {
  continentId: PropTypes.string.isRequired
}

export default CountryList;
