export default function getUserToken(tokenName: string): string | false {
	const token = localStorage.getItem(tokenName);
	if (token) {
		return token
	} else {
		return false;
	}
	
}