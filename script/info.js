import { formatDate } from './utils.js';

export function fetchInfo(sub) {
    return fetch(`https://www.reddit.com/r/${sub}/about.json`)
        .then(res => res.json())
        .then(json => json.data)
}

export function renderInfo(info) {
    const infoDiv = document.getElementById("info");
    infoDiv.innerHTML = "Data: " + formatDate(new Date(info.created * 1000)) + "<br>"
    infoDiv.innerHTML += "Members: " + info.subscribers +  "<br>"
    infoDiv.innerHTML += "Online: " + info.active_user_count
}
