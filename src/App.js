import './App.css';
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import Lock from './components/Lock';
import Signin from './components/Signin';
import Password from './components/Password';
// import Admin from './components/Admin';
import Cgpa from './components/cgpa';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Lock/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/password' element={<Password/>}/>
        <Route path='/cgpa' element={<Cgpa/>}/>
        {/* <Route path='/gokulrajalpisadmin' element={<Admin/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
