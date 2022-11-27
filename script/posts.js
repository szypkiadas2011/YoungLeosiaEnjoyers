import { appendElement, appendImage, formatDate, formatHtml, formatKs } from "./utils.js";

export function fetchPosts(sub = 'all', sort = 'hot', limit = '25')
{

	return fetch(`https://www.reddit.com/r/${sub}/${sort}.json?limit=${limit}`)
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
	appendElement(postInfo, "h3", "title", post.title);
	appendElement(postInfo, "span", "subtitle", `${post.author} posted on ${formatDate(new Date(post.created * 1000))} in ${post.subreddit_name_prefixed}`);

	let postContent = appendElement(postMain, "div", "postContent");
	let hint = post.post_hint;
	if (hint && hint === "image" && post.url)
		appendImage(postContent, "", post.url);
	else if (post.url)
		appendElement(postContent, "a", "postLink", post.url).href = post.url;

	if (post.selftext_html)
		appendElement(postContent, "p", "", formatHtml(post.selftext_html));

	this.appendChild(div);
}

export function renderPosts(posts)
{
	if (posts.length === 0)
		alert("api sie zesralo 💩");

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