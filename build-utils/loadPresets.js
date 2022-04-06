const { merge } = require("webpack-merge");

module.exports = (env) => {
	const { presets } = env;

	/** @type {string[]} */

	const mergedPresets = [].concat(...[presets]);
	const mergedConfigs = mergedPresets.map((presetsName) =>
		require(`./preset/webpack.${presets}`)(env)
	);

	return merge({}, ...mergedConfigs);
};
