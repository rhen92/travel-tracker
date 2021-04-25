import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/Trip';
import TripRepository from '../src/TripRepository';

describe('Trip Repository', () => {
  let trip1, trip2, trip3, tripRepository, destination;

  beforeEach(() => {
    trip1 = new Trip({
      id: 1,
      userID: 44,
      destinationID: 49,
      travelers: 1,
      date: '2021/09/16',
      duration: 8,
      status: 'approved',
      suggestedActivities: []
    });

    trip2 = new Trip({
      id: 2,
      userID: 35,
      destinationID: 49,
      travelers: 5,
      date: '2020/10/04',
      duration: 18,
      status: 'pending',
      suggestedActivities: []
    });

    trip3 = new Trip({
      id: 3,
      userID: 3,
      destinationID: 49,
      travelers: 4,
      date: '2020/05/22',
      duration: 17,
      status: 'pending',
      suggestedActivities: []
    });

    destination = [{
      id: 49,
      destination: 'Castries, St Lucia',
      estimatedLodgingCostPerDay: 650,
      estimatedFlightCostPerPerson: 90,
      image: 'https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
      alt: 'aerial photography of rocky mountain under cloudy sky'
    }
    ];

    tripRepository = new TripRepository([trip1, trip2, trip3], destination);
  });

  it('should be a function', () => {
    expect(TripRepository).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(tripRepository).to.be.an.instanceof(TripRepository);
  });

  it('should hold all trips', () => {
    expect(tripRepository.allTrips).to.deep.equal([trip1, trip2, trip3]);
  });

  it('should hold all destinations', () => {
    expect(tripRepository.destinations).to.deep.equal(destination);
  });

  it('should find users travel', () => {
    expect(tripRepository.findUsersTravel(44)).to.deep.equal([trip1]);
  });

  it('should find total trip cost for user', () => {
   expect(tripRepository.findTotalTripCostForUser([trip1])).to.equal(5819);
  });

  it('should find next available id', () => {
    expect(tripRepository.findNextAvailableID()).to.equal(4);
  });

  it('should find destination id', () => {
    expect(tripRepository.findDestinationID('Castries, St Lucia')).to.equal(49);
  });
});
