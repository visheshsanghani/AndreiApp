import firebase from 'firebase/app/';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCKL21wL08h7PitEqI3ex88ptutkIf1r4k",
  authDomain: "crwn-db-4fbaf.firebaseapp.com",
  databaseURL: "https://crwn-db-4fbaf.firebaseio.com",
  projectId: "crwn-db-4fbaf",
  storageBucket: "crwn-db-4fbaf.appspot.com",
  messagingSenderId: "84552415008",
  appId: "1:84552415008:web:08020bdb14734f54b2c945",
  measurementId: "G-75R5VSXD60"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch (error) {
      console.log(error.message + "has been logged.");
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const addCollectionsAndDocuments = async (collectionkey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionkey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  })
  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
