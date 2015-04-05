import React from 'react';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

let Navigation = React.createClass({
    render() {
        return (
            <section className="row">
                <ul className="main-navigation column-12">
                    <li className="main-navigation--item">
                        <Link to="home">Home</Link>
                    </li>
                    <li className="main-navigation--item">
                        <Link to="about">About this project</Link>
                    </li>
                </ul>
            </section>
        );
    }
});

export default Navigation;
