/*jshint esnext:true */
import React from 'react/addons';
import Fuse from './../../assets/vendor/fuse.js';
import SVGIcon from './../utils/SVG';
import FilterableListItem from './FilterableListItem';
import markdown from 'markdown';

var md = markdown.markdown;

/**
 * Sort keysrt
 * @param  {String} key  The key to sort by
 * @param  {Boolean} desc Descending?
 * @return {Object}      The sorted object
 */
function keysrt(key, desc) {
    return function(a,b){
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    };
}

let ReactTransitionGroup = React.addons.CSSTransitionGroup;

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
        // Why doesn't this retrieve the actual input?
        this.input = this.getDOMNode(this.refs.cInput);

        // ...because this is ugly:
        this.inputElement = document.querySelector('.c-query');
        this.inputElement.focus();
        window.document.addEventListener('scroll', this.toggleFixed);
    },

    clearInput() {
        this.inputElement.focus();
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
        // Sort alphabetically. Not working 100% though.
        items = items.sort(keysrt('title', false));

        return items.map((i) => {
            return (
                <FilterableListItem name={i.title}
                    instructions = {md.toHTML(i.content) }
                    resetQuery   = {self.clearInput}
                    classes      = {this.classes}/>
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
        let word = 'Results';

        if (!count) return null;
        if (count === length) word = 'All topics';

        return (<p className="c-filterableList__number"><b>{word}</b> ({count})</p>);
    },

    render() {
        var items = this.props.data,
            answerCount = "",
            inputIcon,
            flatQuery = this.state.query.trim().toLowerCase();

        // Begin fuzzy search
        if (flatQuery.length) {
            let f = new Fuse(this.props.data, { keys: ['help', 'title', 'cmds'], threshold: 0.2 });
            items = f.search(flatQuery);
        }

        // Get a list of items that match the query
        items = this.updateList(items);

        if (!items.length && flatQuery) {
            items = this.renderNoItems(); // No matches
        } else if (!items.length && !flatQuery) {
            items = (<li>Loading content... help is on the way.</li>); // Still loading
        }

        // Title of list, depending on the state of the search
        answerCount = this.renderCount(items.length, this.props.data.length);

        // Display the glass or the cross icon depending on query state
        if (!flatQuery) {
            inputIcon = <SVGIcon icon="search" ref="iconAction" class="icon icon-search"/>
        } else {
            inputIcon = <SVGIcon callback={this.clearInput} icon="cross" class="icon icon-cross"/>
        }

        return (
            <div className="c-filterableList row">
                <div ref="mainEl" className="column-12 wrapper anim-elem c-filterableList__search">
                    <input className={this.classes.input} type="text" ref="cInput"
                        placeholder = {this.props.placeholder}
                        value = {this.state.query} onChange = {this.handleChange}/>

                        <ReactTransitionGroup transitionName="example">
                            {inputIcon}
                        </ReactTransitionGroup>

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
