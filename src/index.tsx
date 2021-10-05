import React, { FunctionComponent, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import EditorContext from '@/store/index';
import { routes } from '@/router';
import './styles'

const App = (): React.ReactElement => {
  const routeComponents = routes.map((item) => {
    const FunComponent: FunctionComponent = item.component as FunctionComponent;
    return (
      <Route path={item.path} exact>
        {item.redirect ? (
          <Redirect to={item.redirect} />
        ) : (
          <Suspense fallback={'loading...'}>
            <FunComponent />
          </Suspense>
        )}
      </Route>
    );
  });
  return (
    <EditorContext>
      <Router>
        <Switch>{routeComponents}</Switch>
      </Router>
    </EditorContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
