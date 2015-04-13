import React from 'react';
import FilterableList from './FilterableList';
import Sidebar from './Sidebar';

let Home = React.createClass({

    getInitialState() {
        return { data: [] };
    },

    componentDidMount() {
        var self = this;

        if (this.isMounted()) {
            fetch('/assets/posts.json')
                .then(function(res) {
                    return res.json();
                }).then(function(json) {
                    self.setState({ data: json });
                });
        }
    },

    render() {
        return (
            <section className="main-content">
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
