import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListItemHeader from './ListItemHeader';

const ListItem = ({
    title,
    subtitle,
    image,
    icon,
    className,
    onClick,
    right,
    style,
}) => (
    <div
        className={classnames('list-item', className, {
            'list-item--clickable': onClick,
        })}
        style={style}
    >
        <ListItemHeader
            title={title}
            subtitle={subtitle}
            onClick={onClick}
            image={image}
            icon={icon}
            className={className}
            right={right}
            style={style && style.head ? style.head : null}
        />
    </div>
);

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    onClick: PropTypes.func,
    right: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    style: PropTypes.object,
};

ListItem.defaultProps = {
    subtitle: null,
    image: null,
    icon: null,
    className: null,
    onClick: null,
    right: null,
    style: null,
};

export default ListItem;
