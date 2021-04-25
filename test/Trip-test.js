import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/Trip';

describe('Trip', () => {
  let trip;

  beforeEach(() => {
    trip = new Trip({
      id: 1,
      userID: 24,
      destinationID: 2,
      travelers: 2,
      date: '2021/04/25',
      duration: 6,
      status: 'pending',
      suggestedActivities: []
    });
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('should instantiate with Trip details', () => {
    expect(trip.id).to.deep.equal(1);
    expect(trip.userID).to.deep.equal(24);
    expect(trip.destinationID).to.deep.equal(2);
    expect(trip.travelers).to.deep.equal(2);
    expect(trip.date).to.deep.equal('2021/04/25');
    expect(trip.duration).to.deep.equal(6);
    expect(trip.status).to.deep.equal('pending');
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

  it('should find estimated cost of Trip', () => {
    const tripWithDestination = trip.findEstimatedCostOfTrip( { destinations: [{
      id: 2,
      destination: "Stockholm, Sweden",
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "city with boats on the water during the day time"
    }]
  });
    expect(tripWithDestination).to.equal(2376);
  });
});
