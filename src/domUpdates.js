import TripRepository from './TripRepository';
import Trip from './Trip';
import Traveler from './Traveler';

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
const usernameInput = document.querySelector('#usernameInput');
const passwordInput = document.querySelector('#passwordInput');
const loginButton = document.querySelector('#loginButton');
const loginPage = document.querySelector('#loginPage');
const mainPage = document.querySelector('#mainPage');
let user;
let tripRepository;
let createdTrip;

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
  .catch(err => err.message);

window.addEventListener('load', getData());
submitButton.addEventListener('click', checkValidation);
tripForm.addEventListener('input', checkInputsFilledIn);
loginButton.addEventListener('click', checkLoginValidation);

function getData() {
  travelGET();
  destinationGET();
}

function showTrips() {
  tripRepository = new TripRepository(travelData.trips, destinationData.destinations);
  let specificUserTravels = tripRepository.findUsersTravel(user.id);
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
          <ol>Date: ${new Date(travel.date).toDateString()}</ol>
        </article>
        `;
      }
    })
  });
}

function showTotalSpentOnTrips() {
  let specificUserTravels = tripRepository.findUsersTravel(user.id);
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
    submitForm(createdTrip);
  }
}

function checkInputsFilledIn() {
  if (!travelerInput.value || destinationDropdown.value === 'Choose destination') {
    return;
  } else {
    createTrip();
  }
}

function createTrip() {
  let currentDate = new Date(startCalendarInput.value);
  let trip = {
    id: tripRepository.findNextAvailableID(),
    userID: user.id,
    destinationID: tripRepository.findDestinationID(destinationDropdown.value),
    travelers: travelerInput.value,
    date: `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
    duration: durationInput.value,
  };
  createdTrip = new Trip(trip);
  showTripCost(createdTrip);
}

function showTripCost(trip) {
  let tripAmount = trip.findEstimatedCostOfTrip(destinationData);
  tripCost.innerText = `Cost for Trip: $${tripAmount}`;
}

function submitForm(trip) {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'Post',
    body: JSON.stringify(trip),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .catch(err => err.message);
    clearInputFields();
    showNewTrip();
}

function clearInputFields() {
  startCalendarInput.value = ' ';
  endCalendarInput.value = ' ';
  durationInput.value = ' ';
  travelerInput.value = ' ';
  destinationDropdown.value = 'Choose destination';
  tripCost.innerText = ' ';
}

function showNewTrip() {
  destinationData.destinations.filter(trip => {
    if (trip.id === createdTrip.destinationID) {
  trips.insertAdjacentHTML('beforeend',
  `  <article class="trip-container">
    <h4>${trip.destination}</h4>
    <img class="vacation-pic" src=${trip.image} alt=${trip.alt}>
    <ol>Status: ${createdTrip.status}</ol>
    <ol>Duration: ${createdTrip.duration} days</ol>
    <ol>Travelers: ${createdTrip.travelers}</ol>
    <ol>Date: ${new Date(createdTrip.date).toDateString()}</ol>
  </article>`
)}
})
}

function checkLoginValidation() {
  if (!passwordInput.value || !usernameInput.value) {
    alert('Need username or password filled in.');
  } else if (passwordInput.value !== 'travel2020') {
    alert('Incorrect Password');
  } else if (!usernameInput.value.includes('traveler')) {
    alert('Incorrect Username');
  } else if (usernameInput.value === 'traveler') {
    alert('Incorrect Username');
  } else {
    checkForUser();
  }
}

function checkForUser() {
  event.preventDefault();
  let specificUser = usernameInput.value.split('traveler');
  if (specificUser[1] > 50 || specificUser[1] <= 0) {
    alert('Incorrect Username')
  } else {
    fetch(`http://localhost:3001/api/v1/travelers/${specificUser[1]}`)
      .then(response => response.json())
      .then(data => user = new Traveler(data))
      .then(data => showTrips())
      .then(data => showTotalSpentOnTrips())
      .catch(err => err.message);
      hideLoginPage();
  }
}

function hideLoginPage() {
  loginPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  fillInDestinationDropdown();
}
