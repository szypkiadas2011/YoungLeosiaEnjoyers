import { appendElement, appendImage, formatDate, formatHtml, formatKs } from "./utils.js";
import { fetchSubreddit } from "./main.js";

export function fetchPosts(sub, sort = "hot", limit = 25)
{
	return fetch(`https://www.reddit.com/r/${sub}/${customSort(sort) ? "hot" : sort}.json?limit=${limit}`)
		.then(res => res.json())
		.then(json => json.data.children.map(p => p.data));
}

export function fetchSearchPost(sub, sort = "hot", limit = 25, search)
{
	return fetch(`https://www.reddit.com/r/${sub}/search.json?q=${search}&sort=${sort}&limit=${limit}`)
		.then(res => res.json())
		.then(json => json.data.children.map(p => p.data));
}

const customSort = sort => sort === "az" || sort === "za";

export function sortPostsByTitle(posts, sortType)
{
	return new Promise((resolve, reject) => {
		if (!customSort(sortType))
			return resolve(posts);

		const titleFirstLetter = post => post.title.toLowerCase().charCodeAt(0);
		const az = (a, b) => titleFirstLetter(a) > titleFirstLetter(b);
		const za = (a, b) => titleFirstLetter(a) < titleFirstLetter(b);
		posts.sort(sortType === "az" ? az : za);

		resolve(posts);
	});
}

export function clearPreviousPosts(posts)
{
	return new Promise((resolve, reject) => {
		document.getElementById("posts").innerHTML = "";
		resolve(posts);
	});
}

function renderPost(post)
{
	const div = document.createElement("div");
	div.className = "post";
	div.id = `${post.subreddit}/${post.id}`;

	let upsBar = appendElement(div, "div", "upsBar");
	let arrows = appendElement(upsBar, "div", "arrows");
	appendImage(arrows, "up", "img/up.png", "Up");
	appendElement(arrows, "span", "ups", formatKs(post.ups));
	appendImage(arrows, "down", "img/down.png", "Down");
	let bottomUpsbar = appendElement(upsBar, "div", "bottomUpsbar");
	appendElement(bottomUpsbar, "span", "hideSpan", 'Hide');
	appendElement(bottomUpsbar, "span", "commentSpan", "Comm");

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
	let postDiv = document.getElementById(`${post.subreddit}/${post.id}`);

	let up = postDiv.querySelector(".up");
	let down = postDiv.querySelector(".down");
	up.onclick = () => {
		up.src = "img/up_click.png";
		down.src = "img/down.png";
	}
	down.onclick = () => {
		down.src = "img/down_click.png";
		up.src = "img/up.png";
	}

    let span = postDiv.querySelector(".hideSpan");
    span.onclick = () => postDiv.outerHTML = "";

    let commentSpan = postDiv.querySelector(".commentSpan");
    commentSpan.onclick = () => {
        if (postDiv.querySelector(".postComments"))
        {
            let commentDiv = postDiv.querySelector(".postComments");
            if (commentDiv.classList.contains("hidden"))
                commentDiv.classList.remove("hidden");
            else
                commentDiv.classList.add("hidden");
        }
        else
        {
            let commentDiv = appendElement(postDiv.querySelector(".postMain"), "div", "postComments");

            const appendComment = c => {
                if (!c.author)
                    return;

                let comment = appendElement(commentDiv, "div", "comment", `u/${c.author} commented on ${formatDate(new Date(c.created * 1000))}`);
                appendElement(comment, "span", "commentContent", formatHtml(c.body_html));
            }
            const handleComments = comments => comments.forEach(appendComment);

            fetchPostComments(post.subreddit, post.id).then(handleComments);
        }
    }
}

export function addPostHandlers(posts)
{
	posts.forEach(addPostHandler);
}

export function handlePostsError(err)
{
	fetchSubreddit();
	alert(err); //do wyjebania 🤷
}

function fetchPostComments(sub, post)
{
    return fetch(`https://www.reddit.com/r/${sub}/comments/${post}.json`)
        .then(res => res.json())
        .then(json => json.map(arr => arr.data).filter(e => !e.dist))
        .then(arr => arr.map(e => e.children)[0])
        .then(arr => arr.map(e => e.data))
}