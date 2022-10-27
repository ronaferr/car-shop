import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  // atributos...
  // métodos...
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  /* public async read(): Promise<T[] | null> {
    return this._model.find();
  } */

  /* public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    return this._model.findById({ _id });
  } */

  /* public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');
    const resultUpdate = await this
    ._model.findByIdAndUpdate(_id, obj, { new: true });

    return resultUpdate;
  } */

  /* public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('InvalidMongoId');

    return this._model.findByIdAndDelete({ _id });
  } */
}

export default MongoModel;