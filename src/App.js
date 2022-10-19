import './App.css';
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import Lock from './components/Lock';
import Signin from './components/Signin';
import Password from './components/Password';
import Admin from './components/Admin';
// import ForgotPassword from './components/ForgotPassword';
import Cgpa from './components/cgpa';
import { AuthProvider } from './components/Data';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route exact path='/' element={<Lock/>}></Route>
        <Route exact path='/signin' element={<Signin/>}></Route>
        <Route exact path='/password' element={<Password/>}></Route>
        <Route exact path='/cgpa' element={<Cgpa/>}></Route>
        <Route exact path='/gokulrajalpisadmin' element={<Admin/>}></Route>
        {/* <Route exact path='/forgotpassword' element={<ForgotPassword/>}></Route> */}
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
