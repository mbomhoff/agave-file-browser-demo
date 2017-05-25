import React from 'react';
import ReactDOM from 'react-dom';
import AgaveFileBrowser from './AgaveFileBrowser';
import './index.css';

ReactDOM.render(
    <AgaveFileBrowser
        username={"mbomhoff"}
        baseUrl={"https://agave.iplantc.org/files/v2/listings/"}
        token={"c1aa8a4afad7c1805277623f3b98278"}
    />,
    document.getElementById('root')
);
