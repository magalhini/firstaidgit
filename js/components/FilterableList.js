import React from 'react/addons';
import Fuse from './../../assets/fuse.js';
import markdown from 'markdown';

var md = markdown.markdown;

let ReactTransitionGroup = React.addons.CSSTransitionGroup;

let FilterableListItem = React.createClass({
    getInitialState() {
        return {active: false}
    },

    toggle() {
        this.setState({active: !this.state.active})
    },

    render() {
        return (
            <ReactTransitionGroup transitionName="example" transitionAppear={true}>
                <li key={this.props.name} className="item">
                    <h3 onClick={this.toggle} className={this.state.active ? 'item__title is-open' : 'item__title'}>
                        {this.props.name}
                    </h3>
                    <div className="item__instructions">
                        <div dangerouslySetInnerHTML={{__html: this.props.instructions}}></div>
                        <span>Search again</span>
                        <span onClick={this.toggle}>Close</span>
                    </div>
                </li>
            </ReactTransitionGroup>
        );
    }
})

let FilterableList = React.createClass({

    componentWillMount() {
        this.classes = {
            input: 'c-query',
            itemClass: 'item',
            itemTitle: 'item__title',
            itemInstructions: 'item__instructions'
        };
    },

    getInitialState() {
        return { query: '' }
    },

    handleChange(e) {
        this.setState({ query: e.target.value });
    },

    updateList(items) {
        var self = this;

        return items.map(function(i) {
            var parsed = md.toHTML(i.content);
            return (

                <FilterableListItem name={i.title} instructions={parsed}/>
                /*
                <ReactTransitionGroup transitionName="example" transitionAppear={true}>
                <li key={i.title} onClick={self.toggleCollapse} className={self.classes.itemClass}>

                    <h3 className={self.classes.itemTitle} onClick={self.onItemClick}>
                        {i.title}
                    </h3>
                    <div className={self.classes.itemInstructions}>
                        <div dangerouslySetInnerHTML={{__html: parsed}}></div>
                        <span>Search again</span>
                        <span onClick={self.onClose}>Close</span>
                    </div>
                </li>
                </ReactTransitionGroup>*/
            );
        });
    },

    renderNoItems() {
        return (<li className="item-active">
            <h3>No results for "{this.state.query}"</h3>
            <p><a href="#">Submit a help item?</a></p>
            </li>);
    },

    renderCount(count) {
        if (!count) return null;

        return (<p className="c-filterableList__number">
            <b>Answers</b> ({count})
        </p>);
    },

    render() {
        var items = this.props.data,
            answerCount = "",
            flatQuery = this.state.query.trim().toLowerCase();

        if (flatQuery.length) {
            let f = new Fuse(this.props.data, { keys: ['help', 'title'], threshold: 0.2 });
            items = f.search(flatQuery);
        }

        items = this.updateList(items);

        if (!items.length && flatQuery) {
            items = this.renderNoItems();
        } else if (!items.length && !flatQuery) {
            items = (<li>Loading content...</li>);
        }

        answerCount = this.renderCount(items.length);

        return (
            <div className="c-filterableList row">
                <div className="column-12">
                <input className={this.classes.input} type="text" ref="cInput"
                    placeholder = {this.props.placeholder}
                    onClick = {this.blah}
                    value = {this.state.query} onChange = {this.handleChange}/>
                </div>
                <div className="column-9">
                    {answerCount}
                    <ul className="items">{items}</ul>
                </div>
                <div>
                    <this.props.sidebar/>
                </div>
            </div>
        );
    }
});

export default FilterableList;
