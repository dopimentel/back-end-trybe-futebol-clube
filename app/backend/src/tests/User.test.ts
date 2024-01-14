import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeUser from '../database/models/SequelizeUser';
import MockModel from './mocks/Team.mocks';
import { IUser } from '../Interfaces/IEntities';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('User Test', () => {
  describe('', () => {
    const user: IUser = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    };
    const mockModel = new MockModel(user);

    afterEach(() => {
      sinon.restore();
    });
  });

  describe('', () => {
    afterEach(() => {
      sinon.restore();
    });
  });
});
