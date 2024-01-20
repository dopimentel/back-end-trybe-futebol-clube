import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import MockModel from './mocks/Team.mocks';
import { Model } from 'sequelize';
import { hash } from 'bcryptjs';
import JWT from '../utils/JWT';


chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('', () => {
    it('when the user is not found' , async () => {
      const user = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    };
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
      const httpBody = {
        email: 'user_not_found',
        password: 'secret_admin',
      };
      const response = await chai
        .request(app)
        .post('/login')
        .send(httpBody);

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.equal('Invalid email or password');
    });


    it('should return 400 when the email is not provided', async () => {
      const httpBody = {
        email: '',
        password: 'secret_admin',
      };
      const response = await chai
        .request(app)
        .post('/login')
        .send(httpBody);

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });

    it('should return 400 when the password is not provided', async () => {
      const httpBody = {
        email: 'admin@admin.com',
        password: '',
      };

      const response = await chai
        .request(app)
        .post('/login')
        .send(httpBody);

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('All fields must be filled');

    });

    
    it('should return a token when the user is found and email and password are correct', async () => {
      const hashedPassword = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    const user = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
    };
      sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(user));
      
      const httpBody = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      };
      const response = await chai
        .request(app)
        .post('/login')
        .send(httpBody);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('token');

    });



     afterEach(() => {
      sinon.restore();
    });
  });

  describe('GET/ login/role', () => {
    it('should return 401 when the token is not provided', async () => {
      const response = await chai
        .request(app)
        .get('/login/role');

      expect(response).to.have.status(401);
      expect(response.body.message).to.be.equal('Token not found');
    });

    it('should return 401 when the token is not valid', async () => {
      const httpBody = {
        email: 'admin@admin.com',
        password: 'secret_admin',
      };
      const response = await chai
        .request(app)
        .post('/login')
        .send(httpBody);

      const token = response.body.token;

      const invalidToken = 'invalid_token';

      const invalidResponse = await chai
        .request(app)
        .get('/login/role')
        .set('Authorization', `Bearer ${invalidToken}`);

      expect(invalidResponse).to.have.status(401);
      expect(invalidResponse.body.message).to.be.equal('Token must be a valid token');
    });

    it('should return the role when the token is valid', async () => {
      const token = 'valid_token';
      const user = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    };
      sinon.stub(JWT, 'verify').resolves()
      sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(user));

      const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

      expect(status).to.be.equal(200);
      expect(body).to.have.property('role');
      expect(body.role).to.be.equal('admin');
      
      
    })



    afterEach(() => {
      sinon.restore();
    });
  });
});
