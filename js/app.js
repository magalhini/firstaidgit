import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Home from './components/Home.js';
import About from './components/About.js';
import Footer from './components/Footer.js';
import SVGIcon from './utils/SVG.js';

import Navigation from './components/Navigation.js';

require('./../css/main.scss');

let App = React.createClass({
    render() {
        return (
            <div>
            <section className="wrapper">
                <Navigation/>
                <div className="banner row">
                    <a href="#/">
                    <div className="banner__image column12 anim-elem-delay">
                        <h1>First Aid <span className="mono">
                            <SVGIcon class="icon-github" icon="github"/>
                        </span></h1>
                            <span className="banner__subtitle">A searchable collection of
                                the most git FAQ when things go wrong
                            </span>
                    </div>
                    </a>
                </div>
                <RouteHandler/>
            </section>
            <Footer/>
            </div>
        );
    }
});

let routes = (
    <Route name="app" path="/" handler={App}>
      <Route name="home" path="/" handler={Home}/>
      <Route name="about" path="/about" handler={About}/>
    </Route>
);

Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('app'))
});
