import TripRepository from './TripRepository';
import Trip from './Trip';

let travelData;
let destinationData;
const trips = document.querySelector('#allTrips');
const submitButton = document.querySelector('#submitButton');
const destinationDropdown = document.querySelector('#localityDropdown');
const defaultOption = document.createElement('option');
const startCalendarInput = document.querySelector('.start');
const endCalendarInput = document.querySelector('.end');
const durationInput = document.querySelector('#duration');
const travelerInput = document.querySelector('#numTravelers');
const tripCost = document.querySelector('#tripCost');
const tripForm = document.querySelector('#tripBooking');
let tripRepository;

const travelGET = () => fetch('http://localhost:3001/api/v1/trips')
  .then(response => response.json())
  .then(data => travelData = data)
  .then(data => showTrips())
  .then(data => showTotalSpentOnTrips())
  .catch(err => err.message);

const destinationGET = () => fetch('http://localhost:3001/api/v1/destinations')
  .then(response => response.json())
  .then(data => destinationData = data)
  .then(data => showTrips())
  .then(data => showTotalSpentOnTrips())
  .then(data => fillInDestinationDropdown())
  .catch(err => err.message);

window.addEventListener('load', getData());
//submitButton.addEventListener('click', checkValidation);
tripForm.addEventListener('input', checkValidation);

function getData() {
  travelGET();
  destinationGET();
}

function showTrips() {
  tripRepository = new TripRepository(travelData.trips, destinationData.destinations);
  let specificUserTravels = tripRepository.findUsersTravel(44);
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

function showTotalSpentOnTrips() {
  let specificUserTravels = tripRepository.findUsersTravel(44);
  let amountOfMoneySpent = tripRepository.findTotalTripCostForUser(specificUserTravels);
  totalSpent.innerText = `Total spent on trips this year: $${Math.round(amountOfMoneySpent)}`;
}

function fillInDestinationDropdown() {
  defaultOption.text = 'Choose destination';
  destinationDropdown.add(defaultOption);
  destinationDropdown.selectedIndex = 0;
  let option;
  destinationData.destinations.map(trip => {
    option = document.createElement('option');
    option.text = trip.destination;
    destinationDropdown.add(option);
  })
}

function checkValidation() {
  event.preventDefault();
  if (destinationDropdown.value === 'Choose destination') {
    alert('Please choose a valid desination.');
  } else if (startCalendarInput.value !== new Date(startCalendarInput.value).toDateString()) {
    alert('Please choose a valid date.');
  } else if (endCalendarInput.value !== new Date(endCalendarInput.value).toDateString()) {
    alert('Please choose a valid date.');
  } else if (durationInput.value < 0 || !durationInput.value) {
    alert('Please choose a valid duration.')
  } else if (!travelerInput.value) {
    alert('Please choose number of travelers going on trip.');
  } else {
    createTrip();
  }
}

function createTrip() {
  let currentDate = new Date(startCalendarInput.value);
  let trip = {
    id: tripRepository.findNextAvailableID(),
    userID: 44,
    destinationID: tripRepository.findDestinationID(destinationDropdown.value),
    travelers: travelerInput.value,
    date: `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
    duration: durationInput.value,
  };
  let createdTrip = new Trip(trip);
  showTripCost(createdTrip);
}

function showTripCost(trip) {
  let tripAmount = trip.findEstimatedCostOfTrip(destinationData);
  tripCost.innerText = `Cost for Trip: $${tripAmount}`;
}
