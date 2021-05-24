import { BrowserRouter as Router, Route } from 'react-router-dom'


import './App.css';
import Jobs from './pages/Jobs'
import AddJob from './pages/AddJob'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Jobs}/>
      <Route exact path="/add" component={AddJob}/>
    </Router>

  );
}

export default App;
