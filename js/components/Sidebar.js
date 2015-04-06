import React from 'react';

let Sidebar = React.createClass({
    render() {
        return (
            <div className="sidebar-wrapper">
                <h2 className="sidebar--title">First Aid Git</h2>
                <p>A collection of the most common git related questions when something
                goes wrong.</p>

            <h2 className="sidebar--title">Author</h2>
                <h2 className="sidebar--title">Contributing</h2>
                <p>Searching for an issue that is not listed here? Found an answer that can be improved?
                You can submit a pull request on the project's Github page.</p>
                <p>Questions? <a href="http://twitter.com/magalhini">Tweet me.</a></p>

        </div>
        );
    }
});

export default Sidebar;
