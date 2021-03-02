import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Add from './components/Add/Add'
import Edit from './components/Edit/Edit'

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/add' component={Add} />
          <Route exact path='/edit' component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
