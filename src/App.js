import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css'

//components
import ContinentList from './components/ContinentList/index.js'

//apollo client setup
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <ContinentList />
      </div>
    </ApolloProvider>
  );
}

export default App;
