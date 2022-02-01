import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

ReactDOM.render(<Routes />, document.getElementById('root'));

