import router from '../routes'

export const bindLinks = () => {
	const links = document.querySelectorAll('a');
	if (links) {
		links.forEach((link: HTMLElement) => link.addEventListener('click', event => {
			router.redirect(link.dataset.href, 'login', 'Login');
			
		}));
	}
};