// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InputObject = { [key: string]: any };

export function filterTruthyProperties(obj: InputObject): InputObject {
	const truthyProperties: InputObject = {};

	for (const key in obj) {
		if (obj.hasOwnProperty(key) && obj[key]) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			truthyProperties[key] = obj[key];
		}
	}

	return truthyProperties;
}
