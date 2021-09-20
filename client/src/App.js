import { useContext, useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import { AuthContext } from './context/AuthProvider';
import Home from './pages/home';
import Login from './pages/login';

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
            isZoomOut: false,
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
        <div className="app">
            {currentUser ? (
                <>
                    <Home />
                    <Chat conversations={conversations} zoomOutState={handleZoomOutState} />
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;

// 90px
// 436px
