import { addPostHandlers, fetchPosts, fetchSearchPost, handlePostsError, renderPosts, sortPostsByTitle } from "./posts.js";
import { fetchRules, renderRules } from "./rules.js";
import { fetchInfo, renderInfo } from "./info.js";

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
		.catch(handlePostsError);
}


export function fetchSubreddit(sub)
{
	let limit = document.getElementById("postsLimit").value;
	let sortType = document.getElementById("sorting").value;
	let search = document.getElementById("filterbar").value;

	(search !== "" ? fetchSearchPost(sub ? sub : "all", sortType, limit, search) : fetchPosts(sub ? sub : "all", sortType, limit))
		.then(posts => sortPostsByTitle(posts, sortType))
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError);

	setSidebarVisibility(true);

	fetchRules(sub)
		.then(renderRules)
		.catch(hideSidebar);

	fetchInfo(sub)
		.then(renderInfo)
		.catch(hideSidebar);
}

const setSidebarVisibility = v => document.getElementById("sidebar").className = v ? "" : "hidden";
const hideSidebar = () => setSidebarVisibility(false);
