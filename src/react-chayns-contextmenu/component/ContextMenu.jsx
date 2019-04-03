/* eslint-disable jsx-a11y/click-events-have-key-events,no-return-assign,prefer-destructuring */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';
import Bubble from '../../react-chayns-bubble/component/Bubble';

export default class ContextMenu extends Component {
    static propTypes = {
        onLayerClick: PropTypes.func,
        coordinates: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }),
        items: PropTypes.arrayOf(PropTypes.shape({
            className: PropTypes.string,
            onClick: PropTypes.func,
            text: PropTypes.string.isRequired,
            icon: PropTypes.object,
        })),
        position: PropTypes.number, /** 0 = top left, 1 = bottom left, 2 = bottom right, 3 = top right */
        parent: PropTypes.instanceOf(Element),
        children: PropTypes.node,
        onChildrenClick: PropTypes.func,
        childrenStyle: PropTypes.object,
        stopPropagation: PropTypes.bool,
        minWidth: PropTypes.number,
        maxWidth: PropTypes.number,
        showTriggerBackground: PropTypes.bool,
    };

    static defaultProps = {
        onLayerClick: null,
        items: [],
        position: null,
        parent: null,
        children: <Icon icon="ts-ellipsis_v" />,
        coordinates: null,
        onChildrenClick: null,
        childrenStyle: null,
        stopPropagation: false,
        minWidth: null,
        maxWidth: null,
        showTriggerBackground: false,
    };

    static position = Bubble.position;

    constructor(props) {
        super(props);

        this.state = { position: null, x: 0, y: 0 };

        this.onChildrenClick = this.onChildrenClick.bind(this);
        this.onLayerClick = this.onLayerClick.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { coordinates } = this.props;
        if (prevProps.coordinates && coordinates) {
            const { x, y } = prevProps.coordinates;
            if (coordinates.x !== x || coordinates.y !== y) {
                this.getPosition();
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        document.removeEventListener('click', this.onLayerClick);
    }

    onChildrenClick(e) {
        const { onChildrenClick, stopPropagation } = this.props;
        if (onChildrenClick) {
            onChildrenClick(e);
        } else {
            this.show();
        }
        if (stopPropagation) e.stopPropagation();
    }

    onLayerClick(e) {
        if (this.bubbleShown) {
            const { onLayerClick } = this.props;
            if (onLayerClick) {
                onLayerClick(e);
            } else {
                this.hide();
            }
        }
    }

    async getPosition() {
        const { position, coordinates } = this.props;
        const { position: statePosition, x: stateX, y: stateY } = this.state;

        let x = coordinates ? coordinates.x : 0;
        let top = coordinates ? coordinates.y : 0;
        let bottom = coordinates ? coordinates.y : 0;
        if (this.childrenNode && !coordinates) {
            const rect = this.childrenNode.getBoundingClientRect();
            x = rect.left + (rect.width / 2);
            top = rect.top;
            bottom = rect.bottom;
        }

        let pos = position;
        if (position === null) {
            const posArray = (x > window.innerWidth / 2)
                ? [ContextMenu.position.TOP_LEFT, ContextMenu.position.BOTTOM_LEFT]
                : [ContextMenu.position.TOP_RIGHT, ContextMenu.position.BOTTOM_RIGHT];
            pos = ((top + bottom) / 2 > window.innerHeight / 2) ? posArray[0] : posArray[1];
        }

        let y = Bubble.isPositionBottom(pos) ? bottom : top;
        if (chayns.env.isApp) {
            const { pageYOffset } = await chayns.getWindowMetrics();
            y += pageYOffset;
        }

        if (statePosition !== pos || x !== stateX || y !== stateY) {
            this.setState({ position: pos, x, y });
        }
    }

    show() {
        this.getPosition();
        this.bubble.show();
        this.bubbleShown = true;
        document.addEventListener('click', this.onLayerClick);
    }

    hide() {
        this.bubble.hide();
        this.bubbleShown = false;
        document.removeEventListener('click', this.onLayerClick);
    }

    render() {
        const {
            items,
            parent,
            children,
            childrenStyle,
            coordinates,
            minWidth,
            maxWidth,
            showTriggerBackground,
        } = this.props;

        const { position, x, y } = this.state;

        return [
            <Bubble
                coordinates={{ x, y }}
                parent={parent}
                position={position}
                style={{ minWidth, maxWidth }}
                key="bubble"
                ref={ref => this.bubble = ref}
            >
                <ul>
                    {items.map(item => (
                        <li
                            className={classNames('context-menu__item', item.className)}
                            onClick={item.onClick}
                            key={item.text}
                        >
                            {item.icon ? (
                                <div className="context-menu__item__icon"><Icon icon={item.icon} /></div>
                            ) : null}
                            <div className="context-menu__item__text">
                                {item.text}
                            </div>
                        </li>
                    ))}
                </ul>
            </Bubble>,
            coordinates
                ? null
                : (
                    <div
                        key="cc__contextMenu__children"
                        ref={ref => this.childrenNode = ref}
                        onClick={this.onChildrenClick}
                        style={childrenStyle}
                        className={classNames('accordion--no-trigger', 'context-menu__children', { 'image-tool': showTriggerBackground })}
                    >
                        {children}
                    </div>
                ),
        ];
    }
}
