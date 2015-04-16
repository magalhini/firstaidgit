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
            fetch('./assets/posts.json')
                .then(function(res) {
                    return res.json();
                }).then(function(json) {
                    self.setState({ data: json });
                }).catch(function(err) {
                    console.log(err);
                    self.setErrorState(err);
                });
        }
    },

    setErrorState(error) {
        this.setState({
            error: error
        });
    },

    render(error) {
        if (this.state.error) {
            var self = this;

            // Probably shouldn't be calling this directly.
            setTimeout(function(){
                self.componentDidMount();
            }, 5000);

            return (<h1 className="error-state">Oh noes, something went wrong pulling the data!</h1>);
        }

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
