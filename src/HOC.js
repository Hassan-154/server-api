import React, { Component } from 'react';

const HOC = (WrappedComponent) => {
  return class HOC extends Component {
    state = {
      apiData: [],
      loading: true,
    };

    async componentDidMount() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.setState({ apiData: data, loading: false });
      } catch (error) {
        console.error('Error fetching API data:', error);
        this.setState({ loading: false });
      }
    }

    render() {
      const { apiData, loading } = this.state;

      return <WrappedComponent apiData={apiData} loading={loading} {...this.props} />;
    }
  };
};

export default HOC;
