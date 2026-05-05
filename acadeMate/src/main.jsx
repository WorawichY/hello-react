import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // NEW ← react-redux bridge
import { store } from './app/store'; // NEW ← your configured store
import App from './App';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<Provider store={store}> {/* NEW ← wrap App */}
<App />
</Provider>
</React.StrictMode>
);