import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { AuthProvider } from './components/AuthContext.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    {/* <Router> */}
      <App />
    {/* </Router> */}
  </AuthProvider>
);
