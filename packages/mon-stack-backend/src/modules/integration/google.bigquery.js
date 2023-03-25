const { BigQuery } = require('@google-cloud/bigquery');

class GoogleBigQuery {
  constructor({ projectId, credential, action, query, metadata }) {
    this.projectId = projectId;
    this.action = action;
    this.query = query;
    this.metadata = metadata;

    this.client = new BigQuery({
      projectId,
      credentials: credential,
    });
  }

  async run() {
    for (let key in this.metadata) {
      this.query = this.query.replaceAll(`{{${key}}}`, this.metadata[key]);
    }

    let result = null;
    switch (this.action) {
      case 'query':
        result = await this.client.query({ query: this.query });
        return result[0];
      case 'update':
        result = await this.client.createQueryJob({ query: this.query });
        result = await result[0].getQueryResults();
        return result[0];
    }
  }
}

module.exports = GoogleBigQuery;
