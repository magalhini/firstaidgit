import React from 'react';

let About = React.createClass({
    render() {
        return (
            <section className="main-content section-about wrapper">
                <div className="row">
                    <div className="column-12">
                        <h2 className="section-title">What is this all about?</h2>
                        <p className="section-copy">First Aid Git started out as a dummy project while I was learning more on
                        using <a href="http://webpack.github.io">Webpack</a> with <a href="https://facebook.github.io/react/">React</a>. Halfway through it I thought about making something
                        useful out of it, so I began to collect a few posts about the most frequently asked questions about git issues.</p>

                    <p className="section-copy">The motivation behind it was to have an easy and quick way to
                    search through the most common git relate issues when they arise, as I find myself having
                    dozens of Stackoverflow bookmarks scattered everywhere for these issues.</p>
                    </div>

                    <div className="row">
                        <div className="column-12">
                            <h2 className="section-title">The source code looks a bit messy...?</h2>
                            <p className="section-copy">That's because it is messy! Since this wasn't meant to become a project
                            in the first place, I wasn't paying too much attention to its structure... so I will be cleaning up the code as the project is being maintained.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="column-12">
                            <h2 className="section-title">Can I contribute?</h2>
                                <p className="section-copy">You can and you should! Submit your changes on <a href="https://github.com/magalhini/firstaidgit">Github</a> or drop a <a href="http://www.twitter.com/magalhini">tweet</a>. I'd love to hear some feedback</p>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
});

export default About;
