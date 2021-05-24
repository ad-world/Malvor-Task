import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import './App.css';
import Jobs from './pages/Jobs'
import AddJob from './pages/AddJob'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Jobs} />
        <Route exact path="/add" component={AddJob} />
      </Switch>
    </Router>

  );
}

export default App;
