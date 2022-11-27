import { appendElement, formatHtml } from './utils.js';

export function fetchRules(sub)
{
	return fetch(`https://www.reddit.com/r/${sub}/about/rules.json`)
		.then(res => res.json())
		.then(json => json.rules)
}

export function renderRules(rules)
{
	const rulesDiv = document.getElementById("rules");
	rulesDiv.innerHTML = "";
	rules.forEach(r => {
		appendElement(rulesDiv, "h3", "", r.short_name);
		appendElement(rulesDiv, "p", "", formatHtml(r.description_html));
	});
}