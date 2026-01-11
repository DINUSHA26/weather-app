import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-jna1syhiv7dxxek3.us.auth0.com"
    clientId="k61wOb7sVexNL8aEv4g8U5bEnx890g0E"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);