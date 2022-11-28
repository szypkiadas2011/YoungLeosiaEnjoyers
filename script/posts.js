import { appendElement, appendImage, formatDate, formatHtml, formatKs } from "./utils.js";
import { fetchSubreddit } from "./main.js";

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
	appendImage(upsBar, "up", "img/up.png", "Up");
	appendElement(upsBar, "span", "ups", formatKs(post.ups));
	appendImage(upsBar, "down", "img/down.png", "Down");
	appendElement(upsBar, "span", "hideSpan", 'Hide');

	let postMain = appendElement(div, "div", "postMain");

	let postInfo = appendElement(postMain, "div", "postInfo");
	appendElement(postInfo, "span", "subtitle", `${post.author} posted on ${formatDate(new Date(post.created * 1000))} in ${post.subreddit_name_prefixed}`);
	appendElement(postInfo, "h3", "title", post.title);

	let postContent = appendElement(postMain, "div", "postContent");
	if (post.selftext_html)
		appendElement(postContent, "p", "", formatHtml(post.selftext_html));

	let hint = post.post_hint;
	if (hint && hint === "image" && post.url)
		appendImage(postContent, "", post.url);
	else if (post.url)
		appendElement(postContent, "a", "postLink", post.url).href = post.url;

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
	let up = document.getElementsByClassName("up")
	let down = document.getElementsByClassName("down")

	for (let i = 0; i < up.length; i++) {
		up[i].onclick = () => {
			up[i].src = "img/up_click.png"
			down[i].src = "img/down.png"
		}
		down[i].onclick = () => {
			down[i].src = "img/down_click.png"
			up[i].src = "img/up.png"
		}
	}
}

export function handlePostsError(err)
{
	fetchSubreddit()
	alert(err) //do wyjebania 🤷
}

export function clearPreviousPosts(posts)
{
	return new Promise((resolve, reject) => {
		document.getElementById("posts").innerHTML = "";
		resolve(posts);
	});
}