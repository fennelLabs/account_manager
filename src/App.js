import './App.css';
import AccountManagerRouter from './AccountManagerRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { ServiceContextProvider } from './contexts/ServiceContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ServiceContextProvider>
      <Router>
        <AccountManagerRouter />
      </Router>
    </ServiceContextProvider>
  );
}

export default App;
