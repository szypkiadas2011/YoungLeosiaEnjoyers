import { addPostHandlers, fetchPosts, handlePostsError, renderPosts, sortPostsByTitle } from "./posts.js";
import { fetchRules, renderRules } from "./rules.js";

window.onload = () => {
	document.getElementById("logo").onclick = () => fetchSubreddit("all");
	document.getElementById("searchbar").onkeyup = (e) => {
		if (e.key === 'Enter')
			fetchSubreddit(document.getElementById("searchbar").value);
	}

	// default fetch
	fetchPosts("all")
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError)
}


export function fetchSubreddit(sub)
{
	let limit = document.getElementById("postsLimit").value;
	let sort = document.getElementById("sorting").value;

	fetchPosts(sub ? sub : "all", sort, limit)
		.then(posts => sortPostsByTitle(posts, sort))
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError)

	fetchRules(sub)
		.then(renderRules)

	// info

	let sidebar = document.getElementById("sidebar hidden");
	if (sidebar)
		sidebar.id = "sidebar";
}
