export function fetchInfo(sub) {
    return fetch(`https://www.reddit.com/r/${sub}/about.json`)
        .then(res => res.json())
        .then(json => json.data)
}