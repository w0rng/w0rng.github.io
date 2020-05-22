var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users/w0rng/repos', false);
xhr.send();

var resp = JSON.parse(xhr.responseText);

resp.forEach(function (item, i, arr) {
    projects.insertAdjacentHTML("afterbegin",
        "🔥 <a href=\"" + item["html_url"] + "\">" + item["name"] + "</a>" +
        "<span class=\"click\">(клик)</span><br>" +
        "<h4>" + item["description"] + "</h4><br>");
});

