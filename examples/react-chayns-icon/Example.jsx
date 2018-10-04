import React, { PureComponent } from 'react';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faRocket } from '@fortawesome/pro-light-svg-icons';
import { faCocktail } from '@fortawesome/pro-regular-svg-icons';
import { faCoffee } from '@fortawesome/pro-solid-svg-icons';

import { Icon } from '../../src/index';

import ExampleContainer from '../ExampleContainer';

export default class Example extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="Icon">
                <a href="https://fontawesome.com/icons?d=gallery" target="_blank" rel="noopener noreferrer">Font Awesome Icons</a>
                <br/>
                <Icon icon={faGoogle} style={{ fontSize: '3rem' }}/>
                <Icon icon={faRocket} style={{ fontSize: '2rem' }}/>
                <Icon icon={faCocktail} style={{ fontSize: '1rem' }}/>
                <Icon icon={faCoffee} className="test"/>
                <br/>
                <a href="https://design.chayns.net/IconsundSymbole" target="_blank" rel="noopener noreferrer">Tobit Software Icons</a>
                <br/>
                <Icon icon="ts-chayns" style={{ fontSize: '3rem' }}/>
                <Icon icon="ts-tobit" style={{ fontSize: '2rem' }}/>
                <Icon icon="ts-bamboo" style={{ fontSize: '1rem' }}/>
                <Icon icon="ts-ellipsis_v" className="test"/>
            </ExampleContainer>
        );
    }
}