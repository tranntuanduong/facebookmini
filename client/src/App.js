import { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Header from './components/Header';
import { AuthContext } from './context/AuthProvider';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import Story from './pages/story';

function App() {
    const { user: currentUser } = useContext(AuthContext);
    const [conversations, setConversations] = useState([
        {
            id: 1,
            isZoomOut: true,
            receiverName: 'Sophie Phan',
        },
        {
            id: 2,
            isZoomOut: true,
            receiverName: 'Sống Tích Cực',
        },
    ]);

    const handleZoomOutState = (conversationId, zoomState) => {
        console.log(conversationId, zoomState);
        const newConversations = conversations.map((cov) =>
            cov.id === conversationId
                ? { id: conversationId, isZoomOut: zoomState, receiverName: cov.receiverName }
                : cov
        );
        setConversations(newConversations);
    };

    return (
        // <div>
        //     {currentUser ? (
        //         <>
        //             <Home />
        //             <Chat conversations={conversations} zoomOutState={handleZoomOutState} />
        //         </>
        //     ) : (
        //         <Login />
        //     )}
        // </div>
        <Router>
            {currentUser && <Header />}
            <Switch>
                <Route path="/profile">{currentUser ? <Profile /> : <Login />}</Route>
                <Route path="/stories">{currentUser ? <Story /> : <Login />}</Route>
                <Route path="/" exact>
                    {currentUser ? <Home /> : <Login />}
                </Route>
            </Switch>
            <Chat conversations={conversations} zoomOutState={handleZoomOutState} />
        </Router>
    );
}

export default App;

// 90px
// 436px
