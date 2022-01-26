import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../shared/Main.jsx';

// Для SSR
window.addEventListener('load', () => {
  ReactDOM.hydrate(<Main />, document.getElementById('app'));
})