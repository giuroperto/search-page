import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ROUTES from './Components/constants/Routes';

// importar todos os componentes que serão roteados
import AllItems from './Components/AllItems/AllItems';

const Routes = () => {

  return(
    <div>
      <Router basename="/CDM21">
        <Switch>
          <Route path={ROUTES.HOME} exact component={AllItems} />
        </Switch>
      </Router>
    </div>
  )
}

export default Routes;