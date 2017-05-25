import React, { Component } from 'react';
import './AgaveFileBrowser.css';
import TreeView from './TreeView.jsx';

class AgaveFileBrowser extends Component {
    loadContents(path) {
        let url = this.props.baseUrl + path;

        return fetch(url, { method: "GET", headers: { Authorization: "Bearer " + this.props.token } })
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                if (data.status === "success")
                    return data.result.filter((n) => (n.name !== ".")); // remove "." path
            });
    }

    render() {
        return (
            <div className="AgaveFileBrowser">
                <TreeView
                    path={this.props.username}
                    loadCallback={this.loadContents.bind(this)}
                />
            </div>
        );
    }
}

export default AgaveFileBrowser;
