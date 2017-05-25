import React from 'react';
import ReactDOM from 'react-dom';
import AgaveFileBrowser from './AgaveFileBrowser';
import './index.css';

ReactDOM.render(
    <AgaveFileBrowser
        username={"yourusername"}
        baseUrl={"https://agave.iplantc.org/files/v2/listings/"}
        token={"yourtoken"}
    />,
    document.getElementById('root')
);
