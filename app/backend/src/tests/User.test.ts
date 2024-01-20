import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import MockModel from './mocks/Team.mocks';
import { Model } from 'sequelize';


chai.use(chaiHttp);

const { expect } = chai;

describe('User Test', () => {
  describe('', () => {
    const user = {
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
