import Magnet from 'magnet';
import pluginController from '../../src/index';

describe('pluginController', () => {
  describe('.test', () => {
    it('should return true if module has controller', () => {
      const mod = {};
      mod.controller = (app, magnet) => {};
      expect(pluginController.test(mod, null, null)).to.be.true;
    });

    it('should return false if module is not function', () => {
      const mod = {};
      mod.controller = 'not a function';
      expect(pluginController.test(mod, null, null)).to.be.false;
    });
  });

  describe('integration', () => {
    let magnet;
    const directory = `${process.cwd()}/test/fixtures/controller`;

    beforeEach(async () => {
      magnet = new Magnet({directory});
      magnet.addPlugin(pluginController);
      await magnet.build();
      await magnet.start();
    });

    afterEach(async () => {
      await magnet.stop();
    });

    it('should register controller module from directory', async () => {
      await assertAsyncHttpRequest({
        path: '/route-one',
        responseBody: 'one',
      });
      await assertAsyncHttpRequest({
        path: '/route-two',
        responseBody: 'two',
      });
    });
  });
});
