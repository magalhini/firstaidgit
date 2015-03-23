import React from 'react';
import FilterableList from './FilterableList.js';

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
        // do ajax quey here if (this.isMounted()) {
    },

    render() {
        return (
            <section className="main-content">
                <FilterableList
                    data = { this.state.data }
                    autofocus = "true"
                    placeholder = "What do you need help with?"
                    />
            </section>
        );
    }
});

export default Home;
