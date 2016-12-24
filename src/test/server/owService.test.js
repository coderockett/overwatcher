const nock = require('nock'); // eslint-disable-line
const config = require('../../server/config');
const OWService = require('../../server/services/owService');
/* eslint-disable no-undef */
describe('owService Test Suite', () => {
  describe('getUserBlob', () => {
    test('getUserBlob returns 404 from api service when battletag not found', () => {
      const rtnObj = { error: '404' };
      nock(`https://${config.owHost}/${config.owBasePath}`)
        .get('/Zeekzz-1534/blob')
        .reply(200, rtnObj);

      const owService = new OWService();

      owService.getUserBlob('Zeekzz#1534').then(response => {
        expect(response.status).toBe(200);
        return response.json();
      })
      .then(json => expect(json).toEqual(rtnObj));
    });

    test('getUserBlob should reject an error when battletag is not properly formatted', () => {
      const owService = new OWService();
      const errObj = { error: '400', message: 'Invalid Battletag was supplied' };
      owService.getUserBlob('Zeekzz@1536').catch(err => expect(err).toEqual(errObj));
    });

    test('getUserBlob should reject an error when battletag is malformatted', () => {
      const owService = new OWService();
      const errObj = { error: '400', message: 'Invalid Battletag was supplied' };

      owService.getUserBlob('Zeekzz#1536#').catch(err => expect(err).toEqual(errObj));
    });
  });
});
