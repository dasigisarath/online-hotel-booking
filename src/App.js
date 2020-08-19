import './App.css';
import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Logout } from './component/booking/Booking';
// import Register from './component/register/Register';
const Register =React.lazy(()=> import('./component/register/Register'));
const Login = React.lazy(() => import('./component/login/Login'));
const OnlineIndex = React.lazy(() => import('./component/dashboard/OnlineIndex'));
const WishList = React.lazy(() => import('./component/wishlist/WishList'));
const Booking =React.lazy(()=> import('./component/booking/Booking'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1>Loading ...</h1>}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/OnlineIndex" component={OnlineIndex} />
            <Route path="/WishList" component={WishList} />
            <Route path="/Booking" component={Booking} />
            <Route path="/Logout" component={Logout} />
            <Route path="/registration" component={Register}/>
            <Route path="**" render={() => window.alert('Page Not Found')} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
