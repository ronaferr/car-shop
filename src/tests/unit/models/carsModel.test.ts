import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';

import {
	carsMock,
	carsMockWithId,
} from '../mocks/carMock';

describe('Cars Model', () => {
	const carsModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carsMockWithId);
    sinon.stub(Model, 'findOne').resolves(carsMockWithId);
    sinon.stub(Model, 'find').resolves([carsMockWithId]);
	});

	after(() => {
		sinon.restore();
	});

	describe('creating a car', () => {
		it('successfully created', async () => {
			const newLens = await carsModel.create(carsMock);
			expect(newLens).to.be.deep.equal(carsMockWithId);
		});
	});

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carsFound = await carsModel.readOne('62cf1fc6498565d94eba52cd');
      expect(carsFound).to.be.deep.equal(carsMockWithId);
    });
  
    it('_id not found', async () => {
      try {
        await carsModel.readOne('123ERRADO');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('searching a cars', () => {
    it('successfully found', async () => {
      const carsFound = await carsModel.read();
      expect(carsFound).to.be.an('array');
    });
  });

});