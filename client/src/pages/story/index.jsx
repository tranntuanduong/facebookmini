import React from 'react';
import CreateStory from '../story/CreateStory';

import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListStory from './ListStory';
import StoryDetail from './StoryDetail';
Story.propTypes = {};

function Story(props) {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.url}/create`} component={CreateStory}></Route>
            <Route path={`${match.url}/:storyId`} component={StoryDetail}></Route>
            <Route path={match.url} component={ListStory} exact></Route>
        </Switch>
    );
}

export default Story;
