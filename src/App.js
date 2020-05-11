import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { setCurrentUser } from './redux/user/user.action';
import { checkUserSession } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import checkoutPage from './pages/checkout/checkout.component';

import './App.css';

class App extends React.Component {


  unsubscribeFromAuth = null;

  componentDidMount() {

    const { checkUserSession } = this.props;
    checkUserSession();

    // const { setCurrentUser } = this.props;
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapshot => {
    //       setCurrentUser({
    //         currentUser: {
    //           id: snapshot.id,
    //           ...snapshot.data()
    //         }
    //       })
    //     })
    //   }
    //   setCurrentUser(userAuth);
    //   // addCollectionsAndDocuments('collections' , collectionsArray.map(({title , items}) => ({title , items})));

    // })

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //Prevention of Data Leak
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
          <Route path='/checkout' component={checkoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

// const dispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// })
const mapDispathToProps = dispath => ({
  checkUserSession: () => dispath(checkUserSession())
})
export default connect(mapStateToProps, mapDispathToProps)(App);