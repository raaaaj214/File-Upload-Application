import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind CSS styles
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <Toaster position='bottom-center'/>
      <App />
    </Provider>
);
