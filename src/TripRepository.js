class TripRepository {
  constructor(tripData, destinationData) {
    this.allTrips = tripData;
    this.destinations = destinationData
  }

  findUsersTravel(id) {
    return this.allTrips.filter(trip => trip.userID === id);
  }

  findTotalTripCostForUser(user) {
    let travelerMoney = user.reduce((total, travel) => {
      this.destinations.filter(trip => {
        if (trip.id === travel.destinationID) {
          if (new Date(travel.date).getFullYear() === 2021) {
            let amountLodging = trip.estimatedLodgingCostPerDay * travel.duration;
            let amountFlight = trip.estimatedFlightCostPerPerson * travel.travelers;
            total += amountLodging += amountFlight;
          }
        }
      });
      return total;
    }, 0);
    let totalWithAgentFee = travelerMoney + (travelerMoney * 0.10);
    return totalWithAgentFee;
  }

  findNextAvailableID() {
    let lastIndex = this.allTrips.length - 1;
    return this.allTrips[lastIndex].id + 1;
  }

  findDestinationID(destination) {
    let foundDestination = this.destinations.find(trip => trip.destination === destination);
    return foundDestination.id;
  }
}

module.exports = TripRepository;
