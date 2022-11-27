export const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

export const appendElement = (parent, type, content) => {
	let element = document.createElement(type);
	element.innerHTML = content;
	parent.appendChild(element);
};

export const appendImage = (parent, url) => {
	let element = document.createElement("img");
	element.src = url;
	parent.appendChild(element);
}