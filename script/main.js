import { addPostHandlers, fetchPosts, handlePostsError, renderPosts } from "./posts.js";

window.onload = () => {
	document.getElementById("searchbtn").onclick = () => {
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
	document.getElementById("posts").innerHTML = "";

	fetchPosts(sub)
		.then(renderPosts)
		.then(addPostHandlers)
		.catch(handlePostsError)

	// let parentDiv = document.getElementById('posts')
	// parentDiv.innerHTML = ""
	// fetch(`https://www.reddit.com/r/${sub}.json`)
	// 	.then(response => response.json())
	// 	.then(body => {
	// 		for (let index = 0; index < body.data.children.length; index++)
	// 		{
	// 			let div = document.createElement('div')
	// 			let h4 = document.createElement('h4')
	// 			let p = document.createElement('p')
	// 			h4.textContent = body.data.children[index].data.title
	// 			if (body.data.children[index].data.post_hint === 'image')
	// 			{
	// 				let image = document.createElement('img')
	// 				image.src = body.data.children[index].data.url_overridden_by_dest
	// 				div.appendChild(image)
	// 			}
	// 			div.appendChild(h4)
	// 			parentDiv.appendChild(div)
	//
	// 		}
	// 		document.body.appendChild(parentDiv)
	// 	})
}
