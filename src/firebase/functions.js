import firebase from '../firebase/firebaseSingleton'
//USER LOGIN
export function getOnceUser(userId){
  firebase.database().ref('users/').child(userId).once('value', (snapshot)=>{
    return snapshot.val()
  })
}

//PROFILE FUNCTIONS
export function updateUserProfile(userId, object) {
  firebase.database().ref('users/' + userId +'/profile').update(object);
}
export function getUserProfile(userId){
  return firebase.database().ref('users/' + userId+'/profile').once('value', (snapshot)=>{
    var exist = snapshot.val()
  })
}
//GENERAL FUNCTIONS
export function getOnceFirebase(path){
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous'
  });
}
