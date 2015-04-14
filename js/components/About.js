import React from 'react';

let About = React.createClass({
    render() {
        return (
            <section className="main-content section-about wrapper">
                <div className="row">
                    <div className="column-12">
                        <h2 className="section-title">What is this all about?</h2>
                        <p className="section-copy">First Aid git started as a dummy project while I was learning more about
                        using <a href="http://webpack.github.io">Webpack</a> with <a href="https://facebook.github.io/react/">React</a>. Halfway through it, I decided to try and make something
                        useful out of it, and so First Aid git was born!</p>

                    <p className="section-copy">The motivation behind it was to have an easy and quick way to
                    search through the most common git relate issues when they arise, as I find myself having
                    dozens of Stackoverflow bookmarks scattered everywhere for these issues.</p>
                    </div>

                    <div className="row">
                        <div className="column-12">
                            <h2 className="section-title">The source code looks a bit messy...?</h2>
                            <p className="section-copy">That's because it is messy! Since this wasn't meant to become a project
                            in the first place, so I will be cleaning up the code as the project is being maintained.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="column-12">
                            <h2 className="section-title">Can I contribute?</h2>
                                <p className="section-copy">You should! Submit your changes on Github or drop a <a href="http://www.twitter.com/magalhini">tweet</a>.</p>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
});

export default About;
