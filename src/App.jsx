import './App.scss'
import { AuthProvider } from './context/auth';
import RoutesApp from './routes/Routes';

function App() {

  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  )
}

export default App;
