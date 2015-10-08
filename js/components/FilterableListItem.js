/*jshint esnext:true */
import React from 'react/addons';
import SVGIcon from './../utils/SVG';

let ReactTransitionGroup = React.addons.CSSTransitionGroup;

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
});

export default FilterableListItem;
