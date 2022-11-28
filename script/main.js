import { addPostHandlers, fetchPosts, handlePostsError, renderPosts } from "./posts.js";
import { fetchRules, renderRules } from "./rules.js";

window.onload = () => {
	document.getElementById("logo").onclick = () => fetchSubreddit("all");
	document.getElementById("searchbar").onkeyup = (e) => {
		if(e.key === 'Enter')
			fetchSubreddit(document.getElementById("searchbar").value);
	}

	// default fetch
	fetchPosts("all")
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError)
}


function fetchSubreddit(sub)
{
	let limit = document.getElementById("postsLimit").value
	let sort = document.getElementById("sorting").value

	fetchPosts(sub ? sub : "all", sort ? sort : "hot", limit ? limit : 25)
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError)

	fetchRules(sub)
		.then(renderRules)

	// info

	document.getElementById("sidebar hidden").id = "sidebar";
}
