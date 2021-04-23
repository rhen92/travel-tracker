class Trip {
  constructor(vacation) {
    this.id = vacation.id;
    this.userID= vacation.userID;
    this.destinationID = vacation.destinationID;
    this.travelers = vacation.travelers;
    this.date = vacation.date;
    this.duration = vacation.duration;
    this.status = "pending";
    this.suggestedActivities = []
  }
}

module.exports = Trip;
