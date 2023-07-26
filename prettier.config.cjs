/** @type {import("prettier").Config} */
const config = {
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;

//TODO: need to remove prettier-plugin-tailwindcss
