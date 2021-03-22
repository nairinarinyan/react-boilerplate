import { render } from 'react-dom';
import { Router } from '@reach/router';
import iconDefinitions from '!!raw-loader!./shared/components/icons/icon-definitions.svg';
import { Home } from 'home/home';

import './styles/styles.styl';

const App = () => {
    return (
        <>
            <span style={{ display: 'block', height: 0 }} dangerouslySetInnerHTML={{ __html: iconDefinitions }} />
            <Router>
                <Home default />
            </Router>
        </>
    );
};

render(<App />, document.getElementById('root'));
