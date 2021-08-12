import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/auth" exact render={() => <Auth />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
