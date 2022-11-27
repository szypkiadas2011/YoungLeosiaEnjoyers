export const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

export const appendElement = (parent, type, className, content) => {
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