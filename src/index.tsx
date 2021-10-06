import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import EditorContext from '@/store/index';
import NotFound from '@/views/not-found';

const Login = lazy(() => import('@/views/login'))
const Index = lazy(() => import('@/views/home'))
const Design = lazy(() => import('@/views/layout'))
import './styles'

const App = (): React.ReactElement => {

  return (
    <EditorContext>
      <Suspense fallback={'loading...'}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/design/:id" component={Design} />
            <Route path="/" component={Index}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </Router>
      </Suspense>
    </EditorContext>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
