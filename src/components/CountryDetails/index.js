import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getCountryQuery } from '../../queries/queries';
import './index.css';
import PropTypes from 'prop-types';

class CountryDetails extends Component {

  getLanguages(country) {
    return country.languages.map(language => {
      return (
        <li key={language.code}>{language.name}</li>
      )
    }
    );
  }

  displayCountryDetails() {

    return (
      <Query query={getCountryQuery} variables={{ code: this.props.countryId }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading country details...';
          if (error) return `Error! ${error.message}`;

          const { country } = data;
          if (country) {
            return (
              <div>
                <h1>{country.name}</h1>
                <p>{country.name}, natively written ({country.native}), is a country located in {country.continent.name}.
                Their national currency is ({country.currency}) and their country code is ({country.phone}).</p>
                <p>Languages used here are:</p>
                <ul>
                  {this.getLanguages(country)}
                </ul>
              </div>
            );
          } else {
            return (
              <div>No country selected...</div>
            );
          }
        }}
      </Query>
    );
  }

  render() {
    return (
      <div id="country-details-section">
        {this.displayCountryDetails()}
      </div>
    );
  }
}

export default CountryDetails;
