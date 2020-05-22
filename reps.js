var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users/w0rng/repos?type=all', false);
xhr.send();

var resp = JSON.parse(xhr.responseText);

function sortByAge(arr) {
    arr.sort((a, b) => a["created_at"] > b["created_at"] ? 1 : -1);
}

sortByAge(resp);

resp.forEach(function (item, i, arr) {
    if (item["language"] == "Python") {

        var start = new Date(item["created_at"]);
        var stop = new Date(item["updated_at"]);
        var url = item["html_url"];
        var description = item["description"].split('.');
        var name = description[0];
        description.shift();
        description = description.join('.')

        projects.insertAdjacentHTML("afterbegin",
            "🔥 <a href=\"" + url + "\">" + name + "</a>" +
            "<span class=\"click\"> (клик)<br>" +
            start.getDate() + "." + start.getMonth() + "." + start.getFullYear() + " - " +
            stop.getDate() + "." + stop.getMonth() + "." + stop.getFullYear() +
            "</span><h4>" + description + "</h4><br>");
    }
});

