export function fetchRules(sub) {
    return fetch(`https://www.reddit.com/r/${sub}/about/rules.json`)
        .then(res => res.json())
        .then(json => json.rules)
}

function renderRules(rules) {
    const rulesDiv = document.getElementById("rules");
}