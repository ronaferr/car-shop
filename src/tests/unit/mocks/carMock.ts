import { ICar } from "../../../interfaces/ICar";

const carsMock:ICar = {
  model: 'xablau',
  year: 2000,
  color: 'black',
  buyValue: 1000,
  doorsQty: 4,
  seatsQty: 5,
};

const carsMockWithId:ICar & { _id:string } = {
	_id: '62cf1fc6498565d94eba52cd',
	model: 'xablau',
  year: 2000,
  color: 'black',
  buyValue: 1000,
  doorsQty: 4,
  seatsQty: 5,
};

export { carsMock, carsMockWithId };