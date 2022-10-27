import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarsService';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/car', (req, res) => carController.create(req, res));
// route.get('/frame/:id', (req, res) => frameController.readOne(req, res));

export default route;