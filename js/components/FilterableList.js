import React from 'react/addons';
import Fuse from './../../assets/fuse.js';
import markdown from 'markdown';

var md = markdown.markdown;

let ReactTransitionGroup = React.addons.CSSTransitionGroup;

let FilterableList = React.createClass({

    componentWillMount() {
        this.classes = {
            input: 'c-query',
            itemClass: 'item',
            itemTitle: 'item__title',
            itemInstructions: 'item__instructions'
        };
    },

    componentDidMount() {

    },

    blah() {
        React.findDOMNode(this.refs.cInput).focus();
    },

    getInitialState() {
        return { query: '' }
    },

    handleChange(e) {
        this.setState({ query: e.target.value });
    },
    /*
    findMatch(haystack, needle) {
        var regex,
            matcher;

        if (needle.length === 1) {
            needle = [needle];
            regex = needle.pop();
        } else {
            needle = needle.split(' ');
            regex = '(?:.*(?:\\b(?:' + needle.join('|') + ')\\b)){2}';
        }

        matcher = new RegExp(regex);
        var matches = [];

        haystack.forEach(function(hay) {
            matches = [hay.help].filter(function (hay) {
                return matcher.test(hay);
            });
        });
    },*/

    updateList(items) {
        var self = this;

        return items.map(function(i) {
            var parsed = md.toHTML(i.content);
            return (
                <ReactTransitionGroup transitionName="example" transitionAppear={true}>
                <li key={i.title} className={self.classes.itemClass}>
                    <h3 className={self.classes.itemTitle} onClick={self.onItemClick}>
                        {i.title}
                    </h3>
                    <div className={self.classes.itemInstructions}>
                        <div dangerouslySetInnerHTML={{__html: parsed}}></div>
                    </div>
                </li>
                </ReactTransitionGroup>
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

    onItemClick(e) {
        e.currentTarget.classList.toggle('is-open');
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
            <div className="c-filterableList">
                <input className={this.classes.input} type="text" ref="cInput"
                    placeholder = {this.props.placeholder}
                    onClick = {this.blah}
                    value = {this.state.query} onChange = {this.handleChange}/>
                    {answerCount}
                <ul className="items"> {items} </ul>
            </div>
        );
    }
});

export default FilterableList;
