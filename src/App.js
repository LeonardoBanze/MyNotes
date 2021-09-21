
import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NoteListPage from './views/NoteListPage';
import NotePage from './views/NotePage';

function App() {
  return (
    <Router>
    <div className="container dark">
    <div className="app">

    

    <Header/>
  
    <Route component={NoteListPage} path="/" exact />
    <Route component={NotePage} path="/note/:id"  />
    </div>
    </div>
    </Router>
  );
}

export default App;
