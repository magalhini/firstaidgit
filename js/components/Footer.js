/*jshint esnext:true */
import React from 'react';

let Footer = React.createClass({
    render() {
        return (
            <footer className="footer row">
                <div className="wrapper">
                    <div className="column-4">
                        <h3>Author</h3>
                        <p>First Aid git is maintained by <a href="http://www.ricardofilipe.com">Ricardo Magalhães</a>.</p>
                        <p><a href="#/about">Read more</a> about the project.</p>
                    </div>
                    <div className="column-3">
                        <h3>More resources</h3>
                        <ul>
                            <li><a href="https://github.com/k88hudson/git-flight-rules">Git Flight Rules</a></li>
                            <li><a href="http://git-scm.com/documentation">Git Documentation</a></li>
                            <li><a href="http://git-scm.com/book/en/v2/Getting-Started-Git-Basics">Git Basics</a></li>
                            <li><a href="https://try.github.io/levels/1/challenges/1">GitHub School</a></li>
                        </ul>
                    </div>
                    <div className="column-3">
                        <h3>Credits</h3>
                        Searching algorithm by <a href="https://fusejs.io/">Fuse.js</a> and
                        markdown converter by <a href="https://github.com/showdownjs/showdown">Showdown.js</a>
                    </div>
                </div>
            </footer>
        );
    }
});

export default Footer;
