class Trip {
  constructor(vacation) {
    this.id = vacation.id;
    this.userID = vacation.userID;
    this.destinationID = vacation.destinationID;
    this.travelers = vacation.travelers;
    this.date = vacation.date;
    this.duration = vacation.duration;
    this.status = 'pending';
    this.suggestedActivities = []
  }

  findEstimatedCostOfTrip(data) {
    let vacationSpot = data.destinations.find(trip => trip.id === this.destinationID);
    let amountLodging = vacationSpot.estimatedLodgingCostPerDay * this.duration;
    let amountFlight = vacationSpot.estimatedFlightCostPerPerson * this.travelers;
    let total = 0;
    total += amountLodging += amountFlight;
    let totalWithAgentFee = total + (total * 0.10);
    return Math.round(totalWithAgentFee);
  }
}

module.exports = Trip;
