import React, { PureComponent } from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { Input } from '../../src/index';

export default class InputExample extends PureComponent {
    static onBlur(value, valid) {
        console.log('onBlur', value, valid);
    }

    static onChange(value, valid) {
        console.log('onChange', value, valid);
    }

    static onEnter(value, valid) {
        console.log('onEnter', value, valid);
    }

    static onKeyUp(e) {
        console.log('onKeyUp', e);
    }

    render() {
        return (
            <div>
                <Input
                    stopPropagation
                    defaultValue="Input"
                    placeholder="input"
                    onBlur={InputExample.onBlur}
                    onChange={InputExample.onChange}
                    onKeyUp={InputExample.onKeyUp}
                    onEnter={InputExample.onEnter}
                    style={{
                        marginBottom: '20px',
                    }}
                />
                <Input
                    stopPropagation
                    placeholder="required"
                    onBlur={InputExample.onBlur}
                    onChange={InputExample.onChange}
                    onKeyUp={InputExample.onKeyUp}
                    onEnter={InputExample.onEnter}
                    required
                    style={{
                        marginBottom: '20px',
                    }}
                />
                <Input
                    placeholder="password"
                    type="password"
                    onBlur={InputExample.onBlur}
                    onChange={InputExample.onChange}
                    onKeyUp={InputExample.onKeyUp}
                    onEnter={InputExample.onEnter}
                    style={{
                        marginBottom: '20px',
                    }}
                />
                <Input
                    placeholder="invalid input"
                    invalid
                    onBlur={InputExample.onBlur}
                    onChange={InputExample.onChange}
                    onKeyUp={InputExample.onKeyUp}
                    onEnter={InputExample.onEnter}
                    style={{
                        marginBottom: '20px',
                    }}
                />
                <Input
                    placeholder='type "eee"'
                    regExp={new RegExp('.*e{3}.*')}
                    onBlur={InputExample.onBlur}
                    onChange={InputExample.onChange}
                    onKeyUp={InputExample.onKeyUp}
                    onEnter={InputExample.onEnter}
                    style={{
                        marginBottom: '20px',
                    }}
                />
                <Input
                    disabled
                    placeholder='type "eee"'
                    regExp={new RegExp('.*e{3}.*')}
                    onBlur={InputExample.onBlur}
                    onChange={InputExample.onChange}
                    onKeyUp={InputExample.onKeyUp}
                    onEnter={InputExample.onEnter}
                    style={{
                        marginBottom: '20px',
                    }}
                />
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        defaultValue="Dynamic Input"
                        placeholder="Dynamic Input Placeholder"
                        onBlur={InputExample.onBlur}
                        onChange={InputExample.onChange}
                        onKeyUp={InputExample.onKeyUp}
                        onEnter={InputExample.onEnter}
                        dynamic
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        placeholder="Icon"
                        icon="ts-tobit2016"
                        onBlur={InputExample.onBlur}
                        onChange={InputExample.onChange}
                        onKeyUp={InputExample.onKeyUp}
                        onEnter={InputExample.onEnter}
                        dynamic
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        placeholder='type "eee"'
                        regExp={new RegExp('.*e{3}.*')}
                        onBlur={InputExample.onBlur}
                        onChange={InputExample.onChange}
                        onKeyUp={InputExample.onKeyUp}
                        onEnter={InputExample.onEnter}
                        icon={faCoffee}
                        noDeleteIcon
                        onIconClick={console.log}
                        dynamic
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        placeholder="required"
                        onBlur={InputExample.onBlur}
                        onChange={InputExample.onChange}
                        onKeyUp={InputExample.onKeyUp}
                        onEnter={InputExample.onEnter}
                        onIconClick={console.log}
                        dynamic
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        required
                        placeholder="regexp & required"
                        regExp={new RegExp('.*e{3}.*')}
                        onBlur={InputExample.onBlur}
                        onChange={InputExample.onChange}
                        onKeyUp={InputExample.onKeyUp}
                        onEnter={InputExample.onEnter}
                        icon={faCoffee}
                        noDeleteIcon
                        onIconClick={console.log}
                        dynamic
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Input
                        disabled
                        required
                        placeholder="disabled input"
                        regExp={new RegExp('.*e{3}.*')}
                        onBlur={InputExample.onBlur}
                        onChange={InputExample.onChange}
                        onKeyUp={InputExample.onKeyUp}
                        onEnter={InputExample.onEnter}
                        icon={faCoffee}
                        noDeleteIcon
                        onIconClick={console.log}
                        dynamic
                    />
                </div>
            </div>
        );
    }
}
