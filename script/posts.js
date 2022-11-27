import { appendElement, appendImage, formatDate, formatKs } from "./utils.js";

export function fetchPosts(sub, sort = "hot")
{
	return fetch(`https://www.reddit.com/r/${sub}/${sort}.json`)
		.then(res => res.json())
		.then(json => json.data.children.map(p => p.data))
}

function renderPost(post)
{
	const div = document.createElement("div");
	div.className = "post";
	div.id = `${post.subreddit}/${post.id}`;

	let upsBar = appendElement(div, "div", "upsBar");
	appendImage(upsBar, "up", "", "Up"); // todo
	appendElement(upsBar, "span", "ups", formatKs(post.ups));
	appendImage(upsBar, "down", "", "Down"); // todo

	let postMain = appendElement(div, "div", "postMain");

	let postInfo = appendElement(postMain, "div", "postInfo");
	appendElement(postInfo, "p", "title", post.title);
	appendElement(postInfo, "span", "subtitle", `${post.author} posted on ${formatDate(new Date(post.created * 1000))} in ${post.subreddit_name_prefixed}`);

	let postContent = appendElement(postMain, "div", "postContent");
	appendImage(postMain, "", post.url);

	this.appendChild(div);
}

export function renderPosts(posts)
{
	console.log(posts);
	return new Promise((resolve, reject) => {
		posts.forEach(renderPost, document.getElementById("posts"));
		resolve(posts);
	});
}

function addPostHandler(post)
{

}

export function addPostHandlers(posts)
{
	posts.forEach(addPostHandler);
}

export function handlePostsError(err)
{
	alert(err); // 🤷
}