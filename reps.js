var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users/w0rng/repos', false);
xhr.send();

var resp = JSON.parse(xhr.responseText);

resp.forEach(function (item, i, arr) {
    if (item["language"] == "Python") {
        projects.insertAdjacentHTML("afterbegin",
            "🔥 <a href=\"" + item["html_url"] + "\">" + item["name"] + "</a>" +
            "<span class=\"click\"> (клик)<br>" +
            item["created_at"].split('T')[0] + " - " + item["updated_at"].split('T')[0] +
            "</span><h4>" + item["description"] + "</h4><br>");
    }
});

