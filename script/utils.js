export const compose = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

export const appendElement = (parent, type, className, content = "") => {
	let element = document.createElement(type);
	element.innerHTML = content;
	element.className = className;
	parent.appendChild(element);
	return element;
};

export const appendImage = (parent, className, url, alt = "") => {
	let element = document.createElement("img");
	element.src = url;
	element.className = className;
	element.alt = alt;
	parent.appendChild(element);
	return element;
}

export function formatDate(date)
{
	const pad = i => String(i).padStart(2, "0");
	return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

export function formatKs(i)
{
	let ret;
	let suffix;

	if (i >= 1000)
	{
		ret = i / 1000;
		suffix = "K";
	}
	else if (i >= 1000000)
	{
		ret = i / 1000000;
		suffix = "M";
	}
	else if (i >= 1000000000)
	{
		ret = i / 1000000000;
		suffix = "B";
	}

	return String(Math.round(ret)) + suffix;
}
