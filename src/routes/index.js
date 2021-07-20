import { Route } from 'react-router-dom';
import './index.css';
import Home from '../pages/Home';

const Routes = () => {
    const Page = ({ children }) => (
        <>
            <div className="page">{children}</div>
        </>
    );

    return (
        <>
            <Route path="/" exact>
                <Page>
                    <Home />
                </Page>
            </Route>
            <Route path="/councillors" exact>
                <Page>
                    <Home />
                </Page>
            </Route>
            <Route path="/councils" exact>
                <Page>
                    <Home />
                </Page>
            </Route>
            <Route path="/affairs" exact>
                <Page>
                    <Home />
                </Page>
            </Route>
        </>
    );
};

export default Routes;
