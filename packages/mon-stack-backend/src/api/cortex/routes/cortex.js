module.exports = {
	routes: [
		{
			method: 'GET',
			path: '/v1/cortex/classify',
			handler: 'cortex.classify',
		},
		{
			method: 'GET',
			path: '/v1/cortex/workflow',
			handler: 'cortex.workflow',
		},
	],
};
