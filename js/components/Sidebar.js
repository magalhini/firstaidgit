import React from 'react';

let Sidebar = React.createClass({
    render() {
        return (
            <div className="column-3">
                <h2>First Aid Git</h2>
                <p>A collection of the most common git related questions when something
                goes wrong.</p>

                <h2>Contributing</h2>
                <p>If your problem is not listed here or if would like to make a suggestion
                you can submit a pull request on the project's Github page.</p>

            </div>
        );
    }
});

export default Sidebar;
