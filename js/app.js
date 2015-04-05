import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Home from './components/Home.js';
import About from './components/About.js';
import Footer from './components/Footer.js';

import Navigation from './components/Navigation.js';

require('./../css/main.scss');

let App = React.createClass({
    render() {
        return (
            <div>
            <div className="container--wrapper wrapper">
                <div className="banner row">
                    <a href="#/">
                    <div className="banner__image column12">
                        First Aid Git
                    </div>
                    </a>
                    <span className="banner__subtitle">A searchable collection of quick git fixes</span>
                </div>

                <Navigation/>
                    <RouteHandler/>
            </div>
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
