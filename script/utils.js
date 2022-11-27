export const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

export const appendElement = (parent, type, className, content = "") => {
	let element = document.createElement(type);
	element.innerHTML = content;
	element.className = className;
	parent.appendChild(element);
	return element;
};

export const appendImage = (parent, className, url) => {
	let element = document.createElement("img");
	element.src = url;
	element.className = className;
	parent.appendChild(element);
	return element;
}

export function formatDate(date)
{
	const pad = i => String(i).padStart(2, "0");
	return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDay())}.${pad(date.getMonth())}.${date.getFullYear()}`;
}