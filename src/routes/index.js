import { Route } from 'react-router-dom';
import './index.css';
import Home from '../pages/Home';
import { useActions } from '../hooks/useActions';
import Header from '../components/Header';

const Routes = () => {
    const { fetchCouncillors, fetchCouncils, fetchAffairs } = useActions();

    const Page = ({ children }) => <div className="page">{children}</div>;

    return (
        <>
            <Header />
            <Route path="/" exact>
                <Page>
                    <Home
                        fetchEntity={fetchCouncillors}
                        reducer={state => state.councillors}
                        filterList={['id', 'firstName', 'lastName']}
                    />
                </Page>
            </Route>
            <Route path="/councillors" exact>
                <Page>
                    <Home
                        fetchEntity={fetchCouncillors}
                        reducer={state => state.councillors}
                        filterList={['id', 'firstName', 'lastName']}
                    />
                </Page>
            </Route>
            <Route path="/councils" exact>
                <Page>
                    <Home
                        fetchEntity={fetchCouncils}
                        reducer={state => state.councils}
                        filterList={['name']}
                    />
                </Page>
            </Route>
            <Route path="/affairs" exact>
                <Page>
                    <Home
                        fetchEntity={fetchAffairs}
                        reducer={state => state.affairs}
                        filterList={['updated']}
                    />
                </Page>
            </Route>
        </>
    );
};

export default Routes;
