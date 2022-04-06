module.exports = () => {
	return {
		devtool: "eval-source-map",
		devServer: {
			port: 3000,
			hot: true,
			open: true,
		},
	};
};
