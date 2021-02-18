import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { history } from 'shared/history';
import iconDefinitions from '!!raw-loader!./shared/components/icons/icon-definitions.svg';
import { Root } from './root/root';

import './styles/styles.styl';

const App = () => {
    return (
        <>
            <span style={{ display: 'block', height: 0 }} dangerouslySetInnerHTML={{ __html: iconDefinitions }} />
            <Router history={history}>
                <Root />
            </Router>
        </>
    );
};

render(<App />, document.getElementById('root'));
