import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/Traveler';

describe('Traveler', () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler({
      id: 1,
      name: 'Ham Leadbeater',
      travelerType: 'thrill-seeker'
    });
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should instantiate with traveler details', () => {
    expect(traveler.id).to.deep.equal(1);
    expect(traveler.name).to.deep.equal('Ham Leadbeater');
    expect(traveler.travelerType).to.deep.equal('thrill-seeker');
  });
});
