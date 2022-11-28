import { addPostHandlers, fetchPosts, fetchSearchPost, handlePostsError, renderPosts, sortPostsByTitle } from "./posts.js";
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
	let sortType = document.getElementById("sorting").value;
	let search = document.getElementById("filterbar").value
	

	if(search != ""){
		fetchSearchPost(sub ? sub : "all", sortType, limit, search)
		.then(posts => sortPostsByTitle(posts, sortType))
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError)
	}else{
		fetchPosts(sub ? sub : "all", sortType, limit)
		.then(posts => sortPostsByTitle(posts, sortType))
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError)
	}

	fetchRules(sub)
		.then(renderRules)

	// info

	let sidebar = document.getElementById("sidebar hidden");
	if (sidebar)
		sidebar.id = "sidebar";
}
