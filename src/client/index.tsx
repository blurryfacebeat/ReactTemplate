import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/shared/App';

// Для SSR
window.addEventListener('load', () => {
  ReactDOM.hydrate(<App />, document.getElementById('app'));
});
