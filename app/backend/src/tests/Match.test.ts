import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import MockModel from './mocks/Team.mocks';
import { Model } from 'sequelize';
import { IOptions } from '../Interfaces/IOptions';
import { IMatch } from '../Interfaces/IEntities';
import { FindOptions } from 'sequelize';
import SequelizeTeam from '../database/models/SequelizeTeam';
import Service from '../services/Service';
import CRUDModel from '../models/CRUDModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', () => {
  describe('GET /matches', () => {
    const match = {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
    };

    it("should return a list of matches", async () => {
      SequelizeMatch.addHook('beforeFind', (options) => {
        console.log('Query:', options);
      });

      sinon.stub(SequelizeMatch, 'findAll').resolves([SequelizeMatch.build(match)]);
      const chaiHttpResponse = await chai.request(app).get('/matches');
      console.log(chaiHttpResponse.body);

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([match]);
    });

    it('should return a match by id', async () => {
      sinon
        .stub(SequelizeMatch, 'findByPk')
        .resolves(SequelizeMatch.build(match));
      const chaiHttpResponse = await chai.request(app).get('/matches/1');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(match);
    });

    it("should return a list of matches with teams' name", async () => {
      const options = {
        include: [
          {
            model: SequelizeTeam,
            as: 'homeTeam',
            attributes: ['teamName'],
          },
          {
            model: SequelizeTeam,
            as: 'awayTeam',
            attributes: ['teamName'],
          },
        ],
      };
      const matchWithNames = {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: { teamName: 'Avaí/Kindermann' },
      awayTeam: { teamName: 'Corinthians' },
    };

      sinon.stub(SequelizeMatch, 'findAll').resolves([SequelizeMatch.build(matchWithNames)]);
      const chaiHttpResponse = await chai.request(app).get('/matches');


      expect(chaiHttpResponse).to.have.status(200);

      
      expect(chaiHttpResponse.body).to.be.deep.equal([match]);



    });

    it('should return 404 when team is not found', async () => {
      sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
      const chaiHttpResponse = await chai.request(app).get('/matches/1');

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({
        message: 'Match with id 1 not found',
      });
    });

    it('should return only matches in progress', async () => {
      const options = {
        where: { inProgress: true },
      } as unknown as IOptions<IMatch>;

      sinon.stub(SequelizeMatch, 'findAll').resolves([SequelizeMatch.build(match)]);
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal([match]);
    }
      
      );

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
