import React from 'react';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let Navigation = React.createClass({
    render() {
        return (
            <section>
                <ul className="main-navigation">
                    <li className="main-navigation--item">
                        <Link to="home">Home</Link>
                    </li>
                    <li className="main-navigation--item">
                        <Link to="about">About</Link>
                    </li>
                    <li className="main-navigation--item">
                        <Link to="admin">Login</Link>
                    </li>
                </ul>

                <RouteHandler/>
            </section>
        );
    }
});

export default Navigation;
