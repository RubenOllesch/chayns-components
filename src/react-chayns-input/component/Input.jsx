import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../react-chayns-icon/component/Icon';

export default class Input extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        onKeyUp: PropTypes.func,
        onEnter: PropTypes.func,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        regExp: PropTypes.instanceOf(RegExp),
        style: PropTypes.object,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        invalid: PropTypes.bool,
        type: PropTypes.string,
        inputRef: PropTypes.func,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        onIconClick: PropTypes.func,
        wrapperRef: PropTypes.func,
        dynamic: PropTypes.bool,
        customProps: PropTypes.object,
        id: PropTypes.string,
        stopPropagation: PropTypes.bool,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        className: '',
        onKeyUp: null,
        onEnter: null,
        onChange: null,
        onBlur: null,
        onFocus: null,
        regExp: null,
        style: {},
        placeholder: '',
        value: undefined,
        defaultValue: undefined,
        invalid: false,
        type: 'text',
        inputRef: null,
        icon: null,
        onIconClick: null,
        wrapperRef: null,
        dynamic: false,
        customProps: null,
        id: null,
        stopPropagation: false,
        required: false,
        disabled: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            valid: !props.invalid && (!props.regExp || !props.value || props.value.match(props.regExp)) && !(!props.value && !props.defaultValue && props.required),
            initial: true,
            right: false,
        };

        this.id = Math.random()
            .toString();

        this.setRef = this.setRef.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.callValidated = this.callValidated.bind(this);
    }

    componentWillReceiveProps({ value }) {
        const { value: oldValue } = this.props;
        if (value && value !== oldValue) {
            this.callValidated(value);
        }
    }

    componentDidUpdate({ regExp: oldRegExp }) {
        const { regExp, onChange } = this.props;

        if (String(oldRegExp) !== String(regExp) && this.ref) {
            this.callValidated(this.ref.value, onChange);
        }
    }

    onKeyUp(e) {
        const { onKeyUp, onEnter } = this.props;
        if (onKeyUp) {
            onKeyUp(e);
        }
        if (e.keyCode === 13) {
            this.callValidated(e.target.value, onEnter);
        }
    }

    onBlur(e) {
        const { onBlur } = this.props;
        this.callValidated(e.target.value, onBlur);
    }

    onChange(e) {
        const { onChange } = this.props;
        this.callValidated(e.target.value, onChange);
    }

    setRef(ref) {
        const { inputRef } = this.props;

        if (inputRef) {
            inputRef(ref);
        }

        this.ref = ref;
    }

    callValidated(value, callback) {
        const { regExp, required } = this.props;

        const valid = !(required && !value) && !(regExp && !value.match(regExp));

        if (callback) {
            callback(value, valid);
        }

        this.setState({
            valid,
            initial: false,
            right: !!value,
        });
    }

    render() {
        const {
            className,
            defaultValue,
            value,
            style,
            placeholder,
            type,
            dynamic,
            icon,
            wrapperRef,
            invalid,
            onIconClick,
            id,
            onFocus,
            stopPropagation,
            customProps,
            disabled,
        } = this.props;
        const { valid, right, initial } = this.state;

        if (dynamic) {
            return (
                <div
                    className={classNames('input-group', className, {
                        labelRight: right || value || (initial && defaultValue),
                        'input-group--disabled': disabled,
                    })}
                    ref={wrapperRef}
                >
                    <input
                        style={{ ...{ width: '100%' }, ...(icon ? { paddingRight: '30px' } : null), ...style }}
                        ref={this.setRef}
                        className={classNames('input', className, { 'input--invalid': !valid || invalid })}
                        value={value}
                        defaultValue={defaultValue}
                        onKeyUp={this.onKeyUp}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        onFocus={onFocus}
                        type={type || 'text'}
                        id={id || this.id}
                        required
                        onClick={stopPropagation ? event => event.stopPropagation() : null}
                        disabled={disabled}
                        {...customProps}
                    />
                    <label
                        htmlFor={id || this.id}
                        className={classNames({
                            'input--invalid': (!valid || invalid),
                            labelIcon: icon,
                        })}
                    >
                        {placeholder}
                    </label>
                    {
                        icon
                            ? (
                                <Icon
                                    icon={icon}
                                    className="input-group__icon"
                                    style={icon ? {
                                        opacity: '.3',
                                        pointerEvents: 'all',
                                    } : { opacity: '0' }}
                                    onClick={onIconClick}
                                />
                            )
                            : null
                    }
                </div>
            );
        }

        return (
            <input
                className={classNames('input', className, {
                    'input--invalid': !valid || invalid,
                    'input--disabled': disabled,
                })}
                style={{ ...{ width: '100%' }, ...style }}
                placeholder={placeholder}
                onKeyUp={this.onKeyUp}
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={onFocus}
                value={value}
                defaultValue={defaultValue}
                type={type}
                ref={this.setRef}
                id={id || this.id}
                onClick={stopPropagation ? event => event.stopPropagation() : null}
                required
                disabled={disabled}
                {...customProps}
            />
        );
    }
}
