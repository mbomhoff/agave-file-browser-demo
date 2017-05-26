import React from 'react';
import './TreeView.css';

class TreeView extends React.Component {
    render() {
        return (
            <div className="TreeView">
                <TreeNode
                    name={this.props.path}
                    path={this.props.path}
                    type={"dir"}
                    loadCallback={this.props.loadCallback}
                    autoOpen={true}
                />
            </div>
        );
    }
}

class TreeNode extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            children: []
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.autoOpen)
            this.handleClick();
    }

    handleClick(event) {
        if (event)
            event.preventDefault();

        if (this.props.type !== 'dir')
            return;

        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));

        if (this.state.children.length === 0) {
            this.props.loadCallback(this.props.path)
                .then(children => this.setState({ children: children }));
        }
    }

    render() {
        let iconClass = 'tree-view-node';
        if (this.props.type === 'dir') {
            if (this.state.collapsed)
                iconClass += ' tree-view-folder-closed';
            else
                iconClass += ' tree-view-folder-open';
        }

        return (
            <ul className={iconClass}>
                <span className="tree-view-node-label" onClick={this.handleClick}>{this.props.name}</span>
                <li className="tree-view-node">
                    {this.state.children.map((node, index) =>
                        <TreeNode
                            key={node.path}
                            name={node.name}
                            type={node.type}
                            path={node.path}
                            loadCallback={this.props.loadCallback}
                        />
                    )}
                </li>
            </ul>
        );
    }
}

export default TreeView;