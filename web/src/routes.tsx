import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Landing from './screens/Landing';
import OrphanagesMap from './screens/OrphanagesMap'
import Orphanage from './screens/Orphanage'
import CreateOrphanage from './screens/CreateOrphanage'


function Routes () {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Landing}></Route>
            <Route path="/app" component={OrphanagesMap}></Route> 

            <Route path="/orphanages/create" component={CreateOrphanage}></Route> 
            <Route path="/orphanages/:id" component={Orphanage}></Route> 
        </Switch>
        </BrowserRouter>
      
    );
}

export default Routes;