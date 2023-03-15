const CortexIAM = require('../../../../modules/cortex/cortex.iam');

module.exports = {
  async afterUpdate(event) {
    const iam = new CortexIAM();
    await iam.resetUserRoles(event.params.data);
  },
};
