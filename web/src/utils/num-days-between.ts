export function numDaysBetween(d1: any, d2: any) {
	var diff = Math.abs(new Date(d1).getTime() - new Date(d2).getTime());
	return diff / (1000 * 60 * 60 * 24);
}
