import React from 'react';
import SVGIcon from './../utils/SVG';

let Sidebar = React.createClass({
    render() {
        return (
            <div className="sidebar-wrapper">
                <h2 className="sidebar--title">First Aid Git</h2>
                <SVGIcon class="icon-github" icon="githubFull"/>

                <h2 className="sidebar--title">Sources</h2>
                <p>Answers for these questions were collected from personal experience,
                    Stackoverflow, and the official Git documentation.
                </p>

                <h2 className="sidebar--title">Contributing</h2>
                <p>Searching for an issue that is not listed here or found an answer that can be improved?
                Great! You can submit a pull request on the project's Github page.</p>
                <p>Questions? <a href="http://twitter.com/magalhini">Tweet me.</a></p>

        </div>
        );
    }
});

export default Sidebar;
