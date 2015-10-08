/*jshint esnext:true */
import React from 'react';
import SVGIcon from './../utils/SVG';

let Sidebar = React.createClass({
    render() {
        return (
            <div className="sidebar-wrapper">
                <a className="nb" href="https://github.com/magalhini/firstaidgit">
                    <SVGIcon class="icon-github" icon="githubFull"/>
                </a>

                <h2 className="sidebar--title">Sources</h2>
                <p>Answers for these questions were collected from personal experience,
                    Stackoverflow, and the official Git documentation.
                </p>

                <h2 className="sidebar--title">Contributing</h2>
                <p>Searching for an issue that is not listed here or found an answer that can be improved?
                Great! You can submit a pull request on the project's <a href="https://github.com/magalhini/firstaidgit">Github</a> page.</p>
                <p>Questions? <a href="http://twitter.com/magalhini">Tweet me.</a></p>

        </div>
        );
    }
});

export default Sidebar;
