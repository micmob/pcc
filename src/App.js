import './App.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="page-wrapper">
                    <Switch>
                        <Routes />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
