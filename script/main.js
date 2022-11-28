import { addPostHandlers, fetchPosts, handlePostsError, renderPosts, sortPostsByTitle } from "./posts.js";
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
	let sort = document.getElementById("sorting").value;

	fetchPosts(sub ? sub : "all", sort, limit)
		.then(posts => sortPostsByTitle(posts, sort))
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError);

	showSidebar();

	fetchRules(sub)
		.then(renderRules)
		.catch(hideSidebar);

	fetchInfo(sub)
		.then(renderInfo)
		.catch(hideSidebar);

}

function showSidebar()
{
	const sidebar = document.getElementById("sidebar");
	if (sidebar)
		sidebar.className = "";
}

function hideSidebar()
{
	const sidebar = document.getElementById("sidebar");
	if (sidebar)
		sidebar.className = "hidden";
}
