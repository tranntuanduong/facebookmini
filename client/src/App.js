import { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { io } from 'socket.io-client';
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

    // socket
    // const socket = useRef();
    // useEffect(() => {
    //     socket.current = io('ws://localhost:8900');
    // }, []);

    return (
        <Router>
            {currentUser && <Header />}
            <Switch>
                <Route path="/profile">{currentUser ? <Profile /> : <Login />}</Route>
                <Route path="/stories">{currentUser ? <Story /> : <Login />}</Route>
                <Route path="/" exact>
                    {currentUser ? <Home /> : <Login />}
                </Route>
            </Switch>

            <Chat />
        </Router>
    );
}

export default App;
