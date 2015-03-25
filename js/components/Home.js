import React from 'react';
import FilterableList from './FilterableList.js';

let Sidebar = React.createClass({
    render() {
        return (
            <div className="column-4">
                <h2>First Aid Git</h2>
                <p>Lorem ipsum</p>
            </div>
        );
    }
});

let Home = React.createClass({

    getInitialState() {
        return { data: [] };
    },

    componentDidMount() {
        var self = this;

        if (this.isMounted()) {
            fetch('http://localhost:8080/assets/posts.json')
                .then(function(res) {
                    return res.json();
                }).then(function(json) {
                    self.setState({ data: json });
                });
        }
    },

    render() {
        return (
            <section className="main-content wrapper">
                <FilterableList
                    data = { this.state.data }
                    autofocus = "true"
                    sidebar = {Sidebar}
                    placeholder = "What do you need help with?"
                    />
            </section>
        );
    }
});

export default Home;
