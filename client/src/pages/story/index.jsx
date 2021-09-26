import React from 'react';
import CreateStory from '../story/CreateStory';
import ListStory from './ListStory';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
Story.propTypes = {};

function Story(props) {
    const match = useRouteMatch();
    console.log(match);
    return (
        <Switch>
            <Route path={match.url} component={ListStory} exact></Route>
            <Route path={`${match.url}/create`} component={CreateStory}></Route>
        </Switch>
    );
}

export default Story;
