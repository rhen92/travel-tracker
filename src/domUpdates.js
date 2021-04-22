//import { travelGET, travelData } from './apiCalls'
let travelData;
let destinationData;
let trips = document.querySelector('#allTrips');

const travelGET = () => fetch('http://localhost:3001/api/v1/trips')
  .then(response => response.json())
  .then(data => travelData = data)
  .then(data => showTrips())
  .catch(err => err.message);

const destinationGET = () => fetch('http://localhost:3001/api/v1/destinations')
  .then(response => response.json())
  .then(data => destinationData = data)
  .then(data => showTrips())
  .catch(err => err.message);

window.addEventListener('load', getData)

function getData() {
  travelGET();
  destinationGET();
}

function showTrips() {
  let specificUserTravels = travelData.trips.filter(trip => trip.userID === 44);
  console.log(specificUserTravels);
  console.log(destinationData)
  let individualInfo = specificUserTravels.map(travel => {
    destinationData.destinations.filter(trip => {
      if (trip.id === travel.destinationID) {
        trips.innerHTML += `
        <article class="trip-container">
          <h4>${trip.destination}</h4>
          <img class="vacation-pic" src=${trip.image} alt=${trip.alt}>
          <ol>Status: ${travel.status}</ol>
          <ol>Duration: ${travel.duration} days</ol>
          <ol>Travelers: ${travel.travelers}</ol>
          <ol>Date: ${travel.date}</ol>
        </article>
        `;
      }
    })
  });
}
