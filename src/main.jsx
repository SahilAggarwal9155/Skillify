import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseProvider } from './services/firebase/firebase';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { inject } from '@vercel/analytics';
import { store, persistor } from "./redux/Store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // ✅ Import added
import './styles/globalStyles.css';
import App from './App.jsx';
import  {CourseContextProvider}  from './context/CourseGlobal.jsx'; // Assuming you're using this

// Initialize analytics
if (import.meta.env.PROD) {
  inject({
    mode: 'production',
    beforeSend: (event) => {
      return event;
    },
  });
}

createRoot(document.getElementById('root')).render(
  <>
    {import.meta.env.PROD && <SpeedInsights debug={false} />}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FirebaseProvider>
          <BrowserRouter>
            <CourseContextProvider>
              <App />
            </CourseContextProvider>
          </BrowserRouter>
        </FirebaseProvider>
      </PersistGate>
    </Provider>
  </>
);