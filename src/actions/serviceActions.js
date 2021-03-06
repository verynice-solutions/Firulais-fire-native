import firebase from '../firebase/firebaseSingleton'
import {Alert} from 'react-native'
import {Toast} from 'native-base'

let db = firebase.database();
let refServices = db.ref('services');

function fetchAllServices(userId) {
  let promise = refServices.orderByChild("founId").equalTo(userId).once("value")
  .then( (snapshot)=> {
    return snapshot.val()
  }) 
  .catch(err=>{
    console.log("Error: " + error);
  }) 
  return promise
}

function fetchAService(serviceId) {
  let promise = refServices.child(serviceId).once("value")
  .then( (snapshot)=> {
    return snapshot.val()
  }) 
  .catch(err=>{
    console.log("Error: " + error);
  }) 
  return promise
}

function fetchUserServices(userId) {
  let promise = refServices.orderByChild("userId").equalTo(userId).once("value")
  .then( (snapshot)=> {
    return snapshot.val()
  }) 
  .catch(err=>{
    console.log("Error: " + error);
  }) 
  return promise
}

function createService(mascotaId, fundacionId, userId, petObj, type, dateIni,dateFin,phone,userInfo,fundInfo){
  // let offset = -8;
  // let now = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
  let images = petObj.imageUrls
  let imgURL = images[Object.keys(images)[0]].url
  let key = refServices.push().key
  refServices.child(key).update({
    servId:key,
    type: type,
    petId: mascotaId,
    petInfo: petObj,
    founId: fundacionId,
    userId: userId,
    status: 'pendiente',
    thumbnail: imgURL,
    dateIni: dateIni,
    dateFin: dateFin,
    phone: phone,
    userInfo: userInfo,
    fundInfo: fundInfo,
    creationTime: new Date()
  }).then(res=>{
    Toast.show({
      text:'Se envió tu solicitud a la fundación. ',
      buttonText:'Ok',
      duration: 4000,
      type:'success'
    })
  })
  .catch(err=>{
    console.log('Error Crear Servicio',err)
    Alert.alert('Connection Error','No se pudo crear el servicio')
  })
}

function updateStatus(serviceKey,statusValue){
  let estado = {}
  estado.status = statusValue
  if(statusValue == 'aprobado' || statusValue == 'rechazado'){
    estado.aprobacionTime= new Date()
  }else{
    if(statusValue == 'finalizado'){
      estado.finalTime = new Date()

    }else if(statusValue=='progreso'){
      estado.inicioTime = new Date()
    }
  }
  refServices.child(serviceKey).update(estado).then(res=>{
    Toast.show({
      text:'Nuevo estado del servicio: '+statusValue,
      buttonText:'Ok',
      duration: 4000,
      type:'success'
    })
  })
  .catch(err=>{
    console.log('Error Crear Servicio',err)
    Alert.alert('Connection Error', err)
  })
}

function setRating(serviceKey, stars, msg) {
  refServices.child(serviceKey).update({
    status: 'calificado',
    rating: stars,
    ratingMsg: msg,
    ratingDate: new Date()
  }).then(res=>{
    Toast.show({
      text:'Calificación subida \u2b50 ',
      buttonText:'YAY',
      duration: 4000,
      type:'success'
    })
  })
  .catch(err=>{
    console.log('Error Crear Servicio',err)
    Alert.alert('Connection Error', err)
  })
}

const serviciosActions = {
  updateStatus,
  fetchAService,
  fetchAllServices,
  fetchUserServices,
  createService,
  setRating
}

export default serviciosActions