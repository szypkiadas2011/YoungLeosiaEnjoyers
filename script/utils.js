export const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);



export const appendElement = (parent, type, content) => {
	let element = document.createElement(type);
	parent.appendChild(element.innerHTML = content);
};

export const appendImage = (parent, url) => {
	let element = parent.createElement("img");
	document.appendChild(element.src = url);
}