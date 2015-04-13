import React from 'react';

let SVGIcon = React.createClass({
    componentWillMount() {
        this.icons = {
            search: '<svg><path fill="#444444" d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg>',
            arrowDown: '<svg viewBox="0 0 1024 1024"><path class="path1" d="M1024 512c0-282.77-229.23-512-512-512s-512 229.23-512 512 229.23 512 512 512 512-229.23 512-512zM96 512c0-229.75 186.25-416 416-416s416 186.25 416 416-186.25 416-416 416-416-186.25-416-416z"></path>' +
	                   '<path class="path2" d="M317.256 354.744l-90.512 90.512 285.256 285.254 285.254-285.256-90.508-90.508-194.746 194.744z"></path></svg>'
        };
    },
    render() {
        var icon = this.props.icon || 'icon';

        return (
            <span className={this.props.class} dangerouslySetInnerHTML={{__html: this.icons[icon]}}></span>
        );
    }
});

export default SVGIcon;
