import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Admin from './component/Admin/Admin';
import Login from './component/Login/Login';
import Navigation from './component/Navigation/Nav';
import Logout from './component/Logout/Logout';
import ChangePassword from './component/ChangePassword/ChangePassword';
import MFA_Setup from './component/MFA_Setup/MFA_Setup';
import MFA_Verify from './component/MFA_Verify/MFA_Verify';
import RegisterUser from './component/Admin/RegisterUser/RegisterUser';
import RefreshApps from './component/RefreshApps/RefreshApps';
import AddApplication from './component/Admin/AddApplication/AddApplication';
import UpdateApplication from './component/Admin/UpdateApplication/UpdateApplication';
import Ansparen from './component/Ansparen/Ansparen';
import Zertifizierung from './component/Zertifizierung/Zertifizierung';
import Home from './component/Home/Home';

function App() {
  return (
    <div className="app">
      <Router>
        <nav><Navigation /></nav>
        <Route path="/">
          {localStorage.getItem('jwt') == null ? <Redirect to="/login" /> : null}
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/changePassword/:username" component={ChangePassword} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin/registerUser" component={RegisterUser} />
        <Route path="/admin/addApp" component={AddApplication} />
        <Route path="/admin/updateApp" component={UpdateApplication} />
        <Route path="/mfa/verify" component={MFA_Verify} />
        <Route path="/mfa/setup" component={MFA_Setup} />
        <Route path="/refreshapps/:username" component={RefreshApps} />
        <Route path="/ansparen" component={Ansparen} />
        <Route path="/cert" component={Zertifizierung} />
      </Router>

    </div>

  );
}

export default App;
