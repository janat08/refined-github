/*
Forks and archive repos are hidden on profiles
*/
import select from 'select-dom';
import features from '../libs/features';

function init() {
	const links = select.all<HTMLAnchorElement>([
		'.user-profile-nav [href$="tab=repositories"]', // "Your repositories" in header dropdown
		'#user-links [href$="tab=repositories"]', // "Repositories" tab on user profile
		'.orgnav .pagehead-tabs-item:first-child', // "Repositories" tab on organization profile
		'[data-hovercard-type="organization"]' // Organization name on repo header + organization list on user profile
	].join());

	for (const link of links) {
		const search = new URLSearchParams(link.search);
		search.set('type', 'source');
		link.search = String(search);
	}
}

features.add({
	id: 'set-default-repositories-type-to-sources',
	load: features.onAjaxedPages,
	init
});
