import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Home from './pages/home';

function App() {
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

        {
            id: 3,
            isZoomOut: true,
            receiverName: 'Đảo Mèo',
        },
        {
            id: 4,
            isZoomOut: false,
            receiverName: 'Chuu Chu',
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
            <Home />
            <Chat conversations={conversations} zoomOutState={handleZoomOutState} />
        </div>
    );
}

export default App;

// 90px
// 436px
