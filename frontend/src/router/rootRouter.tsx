import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DashboardScreen, LoginScreen, RegisterScreen } from '../pages'
import PrivateRoute from './privateRouter'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </Router>
  )
}

export default App
