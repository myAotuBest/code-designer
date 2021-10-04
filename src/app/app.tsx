import React, { ComponentClass, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import EditorContext from '@/store/index';
import { routeConfig } from '@/router';

// const LazyStrawberryIcon = lazy(() => import('./strawberry'));
const App = (): React.ReactElement => {
  const routerTpl = routeConfig.map((item) => {
    const Cmp: ComponentClass = item.component as ComponentClass;
    return (
      <Route path={item.path} exact>
        {item.redirect ? (
          <Redirect to={item.redirect} />
        ) : (
          <Suspense fallback={'loading...'}>
            <Cmp />
          </Suspense>
        )}
      </Route>
    );
  });
  return (
    <EditorContext>
      <Router>
        <Switch>{routerTpl}</Switch>
      </Router>
      {/* <Suspense fallback={'loading...'}>
        <LazyStrawberryIcon className={styles.stylesImage} />
      </Suspense> */}
    </EditorContext>
  );
};

export default App;
