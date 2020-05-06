import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from "../collection/collection.container";
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {

  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();


    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');

    // <--------------------- API call (fetch) ------------------------------->
    // Trade off - It has more than 8 sub divisons before we hit , but firestore can be acessed by API
    // https://firebase.google.com/docs/firestore/use-rest-api?authuser=1 under Making REST calls
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-4fbaf/databases/(default)/documents/collections')
    // .then(response => response.json())
    // .then(collections => console.log(collections));


    // <----------------- Promise --------------------------->
    // Trade off - The livestream update is not used here , hence any update in the database
    // will not be updated here immediately , shall be uploaded here only when the component is mounted. 
    // collectionRef.get().then( snapShot => {
    //   const collectionMap = convertCollectionsSnapshotToMap(snapShot);
    //   updateCollections(collectionMap);
    //   this.setState({ loading: false })
    // })

    // <-------- Observable/Observer Flow ---------------->
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapShot => {
    //   const collectionMap = convertCollectionsSnapshotToMap(snapShot);
    //   updateCollections(collectionMap);
    //   this.setState({ loading: false })
    // })
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route exact path={`${match.path}/:collectionId`}
          component={CollectionPageContainer} />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});


export default connect(null, mapDispatchToProps)(ShopPage); 