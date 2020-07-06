import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import Layout from './common/layout'

export default (store, App, domContainer='root') => {
  const ProvidedApp = () => (
    <Provider store={store}>
      <Layout id='routers-container' style={{height: '100%'}}>
        <App />
      </Layout>
    </Provider>
  );


  render(
    <ProvidedApp />,
    document.getElementById(domContainer)
  );
};
