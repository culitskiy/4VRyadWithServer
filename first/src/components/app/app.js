import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Game from '../pages/game/Game';
import { Enter } from '../pages/enter/enter';
import { Register } from '../pages/register/register';
import { Rooms } from '../pages/rooms/rooms';
import { GameOver } from '../pages/gameOver/gameOver.';

export const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' exact component={Enter}/>
                <Route path='/register' component={Register}/>
                <Route path='/game' component={Game}/>
                <Route path='/rooms' component={Rooms}/>
                <Route path='/gameOver' component={GameOver}/>
            </Switch>
        </HashRouter>
       
    )
}
