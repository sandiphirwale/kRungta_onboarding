var studies = {study1:'Amoxicillin Drug', study2:'Ibuprofen Cases', study3:'Tramadol Study'}
var countries = {ind:'India', fra:'France'}
var hospitals = {apo:'Apollo Hospitals', sha:'Shalby Hospital', bil:'Billroth Hospitals', car:'Care Hospitals', com:'Command Hospital', cou:'Council of Christian Hospitals', drm:'Dr. Mohan Diabetes Specialities Centre', dra:'Dr. Agarwal Eye Hospital', for:'Fortis Healthcare'}

var activeStudy = ''
var updatedList = {}

var createStudyList = () => {
  for (let study in studies) {
    updatedList[study]={}
    updatedList[study]['unTaggedHospitals'] = Object.keys(hospitals)
    Object.keys(countries).forEach( country => {
      updatedList[study][country] = []
    })
  }
  console.log(updatedList)
  document.getElementById('studyList').innerHTML = ""
  for (let i in studies) {
    document.getElementById('studyList').innerHTML += "<article class='studyTitle' id='" +i+"' onclick=displayName('" + i + "')>" +studies[i]+ "</article>"
  }
  displayName()
}

var displayName = (name='study1') => {
  activeStudy && document.getElementById(activeStudy).classList.remove("studySelected");
  activeStudy = name
  document.getElementById('drugTitle').innerHTML = studies[name]
  document.getElementById(activeStudy).classList.add('studySelected')
  createDropCountries()
  createDraggableHospitals()
}

var clearRecent = () => {
  updatedList[activeStudy]['unTaggedHospitals'] = Object.keys(hospitals)
  Object.keys(countries).forEach( country => {
    updatedList[activeStudy][country] = []
  })
  createDropCountries()
  createDraggableHospitals()
}

var createDropCountries = () => {
  document.getElementById('countriesList').innerHTML = ''
  for (let i in countries) {
    document.getElementById('countriesList').innerHTML += "<div class='countryName'>" +countries[i]+ "</div>"
    + "<div ondrop='drop(event)' ondragover='allowDrop(event)' class='dropBox' id='" +i+ "'></div>"
    for(let hospital of updatedList[activeStudy][i]) {
      document.getElementById(i).innerHTML += "<div class='hospitalName' draggable='true' ondragstart='drag(event)' id='" +hospital+"'>" +hospitals[hospital]+ "</div>"
    }
  }
}

var createDraggableHospitals = () => {
  document.getElementById('hospitalsList').innerHTML = ''
  for (let i of updatedList[activeStudy].unTaggedHospitals) {
    document.getElementById('hospitalsList').innerHTML += "<div class='hospitalName' draggable='true' ondragstart='drag(event)' id='" +i+"'>" +hospitals[i]+ "</div>"
  }
}

var drop = (event) => {
  event.preventDefault()
  var data = event.dataTransfer.getData("text")
  event.target.appendChild(document.getElementById(data))
  updatedList[activeStudy]['unTaggedHospitals'] = [...document.querySelectorAll('#hospitalsList > div')].map(({ id }) => id)
  Object.keys(countries).forEach( country => {
    updatedList[activeStudy][country] = [...document.querySelectorAll('#'+country+' > div')].map(({ id }) => id)
  })
  console.log(updatedList)
}

var allowDrop = (event) => {
  event.preventDefault()
}

var drag = (event) => {
  event.dataTransfer.setData("text", event.target.id)
}