import {Measure} from '../../src/Measure';
import {expect} from '../references';

describe('Measure', () => {
  it('exists', () => {
    expect(Measure).to.be.ok;
    expect(new Measure(null)).to.be.an.instanceOf(Measure);
  });
});
