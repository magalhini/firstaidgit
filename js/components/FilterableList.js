import React from 'react/addons';
import Fuse from './../../assets/fuse.js';
import markdown from 'markdown';
import isvg from 'react-inlinesvg';
import SVGIcon from './../utils/SVG';

var md = markdown.markdown;

function keysrt(key, desc) {
  return function(a,b){
   return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
  };
}

let ReactTransitionGroup = React.addons.CSSTransitionGroup;

/**
 * A list item <li>
 * @type {Object}
 */
let FilterableListItem = React.createClass({
    getInitialState() {
        return { active: false };
    },

    toggle() {
        this.setState({active: !this.state.active});
    },

    render() {
        return (
            <ReactTransitionGroup transitionName="example" transitionAppear={true}>
                <li key={this.props.name} className="item">
                    <h3 onClick={this.toggle} className={this.state.active ? 'item__title is-open' : 'item__title'}>
                        {this.props.name}
                        <SVGIcon class="icon-arrow" icon="arrowDown"/>
                    </h3>
                    <div className="item__instructions">
                        <div dangerouslySetInnerHTML={{__html: this.props.instructions}}></div>
                        <button className="button item__button" onClick={this.props.resetQuery}>Search again</button>
                        <button className="button item__button" onClick={this.toggle}>Close</button>
                    </div>
                </li>
            </ReactTransitionGroup>
        );
    }
})

/**
 * The Search and Results wrapper component
 * @type {Object}
 */
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
        return { query: '', fixed: false }
    },

    componentDidMount() {
        this.input = this.getDOMNode(this.refs.cInput);
        window.document.addEventListener('scroll', this.toggleFixed);
    },

    clearInput() {
        var input = document.querySelector('.c-query');
        input.focus();
        this.setState({query: ''});
    },

    // TODO: throttle this.
    toggleFixed() {
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var dToTop = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);

        if (dToTop > (this.input.offsetTop + 100)) {
            this.input.classList.add('fixed');
        } else {
            this.input.classList.remove('fixed');
        }
    },

    handleChange(e) {
        this.setState({ query: e.target.value });
    },

    updateList(items, input) {
        var self = this;

        // Sort alphabetically. Not working 100% though.
        items = items.sort(keysrt('title', false));

        return items.map(function(i) {
            var parsed = md.toHTML(i.content);
            return (
                <FilterableListItem name={i.title}
                    instructions={parsed}
                    resetQuery={self.clearInput}
                    classes={self.classes}/>
            );
        });
    },

    renderNoItems() {
        return (
            <li className="item">
                <h3>No results for "{this.state.query}"</h3>
                <p><a href="mailto:magalhini@gmail.com?subject=I need something from you!">Submit a help item?</a></p>
            </li>);
    },

    renderCount(count, length) {
        var word = 'Results';

        if (!count) return null;
        if (count === length) word = 'All topics';

        return (<p className="c-filterableList__number">
            <b>{word}</b> ({count})
        </p>);
    },

    render() {
        var items = this.props.data,
            answerCount = "",
            flatQuery = this.state.query.trim().toLowerCase();

        // Begin fuzzy search
        if (flatQuery.length) {
            let f = new Fuse(this.props.data, { keys: ['help', 'title'], threshold: 0.2 });
            items = f.search(flatQuery);
        }

        // Get a list of items that match the query
        items = this.updateList(items);

        if (!items.length && flatQuery) {
            items = this.renderNoItems();
        } else if (!items.length && !flatQuery) {
            items = (<li>Loading content...</li>);
        }

        // Title of list, depending on the state of the search
        answerCount = this.renderCount(items.length, this.props.data.length);

        return (
            <div className="c-filterableList row">
                <div ref="mainEl" className="column-12 wrapper anim-elem c-filterableList__search">
                    <input className={this.classes.input} type="text" ref="cInput"
                        placeholder = {this.props.placeholder}
                        value = {this.state.query} onChange = {this.handleChange}/>
                        <SVGIcon icon="search" class="icon-search"/>
                    <label className="c-filterableList__help-label">e.g., undo commit before push</label>
                </div>
                <div className="c-filterableList__wrapper">
                    <div className="column-9 ms-fw">
                        {answerCount}
                        <ul className="items">{items}</ul>
                    </div>
                    <aside className="sidebar column-3">
                        <this.props.sidebar/>
                    </aside>
                </div>
            </div>
        );
    }
});

export default FilterableList;
