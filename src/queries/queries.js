import {gql} from 'apollo-boost';

const getContinentsQuery = gql`
  {
    continents{
      code
      name
    }
  }
`

const getCountriesQuery = gql`
  query($code: String){
    continent(code: $code){
      countries{
        code
        name
      }
    }
  }
`

const getCountryQuery = gql`
  query($code: String){
    country(code: $code) {
      name
      native
      phone
      currency
      continent{
        name
      }
      languages {
        code
        name
      }
    }
  }
`

export {getContinentsQuery, getCountriesQuery, getCountryQuery}
