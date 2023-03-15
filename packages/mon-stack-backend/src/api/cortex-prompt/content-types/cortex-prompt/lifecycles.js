const CortexService = require('../../../../modules/cortex/cortex.service');

module.exports = {
  async afterCreate(event) {
    const cortex = new CortexService();
    await cortex.addContext({ ...event.params.data });
    await cortex.train();
  },
};
