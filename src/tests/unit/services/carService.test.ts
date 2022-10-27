import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarsService';
import { carsMock, carsMockWithId } from '../mocks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carsMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carsMockWithId)
			.onCall(1).resolves(null);

	});

	after(() => {
		sinon.restore()
	});
  
	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carsMock);

			expect(carCreated).to.be.deep.equal(carsMockWithId);
		});

		it('Failure', async () => {
			let error;

			try {
				await carService.create({});
			} catch (err) {
				error = err;
			}

			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const carCreated = await carService.readOne('xablau');

			expect(carCreated).to.be.deep.equal(carsMockWithId);
		});

		it('Failure', async () => {
			let error;

			try {
        // a mesma chamada que o teste acima aqui vai gerar o erro por causa do nosso sinon.stub(...).onCall(1)
				await carService.readOne(carsMockWithId._id);
			} catch (err:any) {
				error = err;
			}

			expect(error?.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

	/* describe('Update Frame', () => {
		it('Success', async () => {
			sinon.stub(carModel, 'update').resolves(frameMockWithId);

			const updated = await frameService.update('any-id', frameMock);

			expect(updated).to.be.deep.eq(frameMockWithId);

			sinon.restore();
		})
		
		it('Failure - Zod', async () => {
			let error;

			try {
				await frameService.update('any-id', { INVALID: "OBJECT" })
			} catch(err) {
				error = err;
			}

			expect(error).to.be.instanceOf(ZodError)
		})

		it('Failure - Frame not Found', async () => {
			sinon.stub(frameModel, 'update').resolves(null);
			let error: any;

			try {
				await frameService.update('any-id', frameMock)
			} catch(err) {
				error = err;
			}

			expect(error?.message).to.be.eq(ErrorTypes.EntityNotFound)
		})
	}) */

});