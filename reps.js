const NICK = 'w0rng';
let languages = ['Python', 'Jupyter Notebook'];


function getReps() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users/' + NICK + '/repos?type=all', false);
    xhr.setRequestHeader('Accept', 'application/vnd.github.mercy-preview+json');
    xhr.send();

    return JSON.parse(xhr.responseText);
}

function sortByCreateData(arr) {
    arr.sort((a, b) => a.created_at > b.created_at ? 1 : -1);
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function cache(key, value) {
    if (typeof value == 'undefined') {
        return cache[key];
    }
    cache[key] = value;
}

function hash(str) {
    if (!cache(str)) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        cache(str, hash);
    }
    return cache(str);
}

function color(i) {
    if (!cache(i)) {
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        cache(i, '#' + ("00000".substring(0, 6 - c.length) + c) + ';');
    }

    return cache(i);;
}

function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

var resp = getReps();
sortByCreateData(resp);

resp.forEach(function (item, i, arr) {
    if (languages.indexOf(item.language) != -1) {

        var start = formatDate(new Date(item.created_at));
        var stop = formatDate(new Date(item.pushed_at));
        var url = item.html_url;
        var description = item.description.split('.');
        var name = description[0];
        description.shift();
        description = description.join('.')

        projects.insertAdjacentHTML('afterbegin',
            '🔥 <a href="' + url + '">' + name + '</a>' +
            '<span class="click"> (клик)</span><br>' +

            '<div id="' + item.name + '"></div>' +

            '<span class="click">' + start + ' - ' + stop + '</span>' +

            '<h4>' + description + '</h4><br>'
        );


        item.topics.forEach(function (item1, i1, arr1) {
            var nt = item1;
            var bg = color(hash(nt));
            var elem = document.getElementById(item.name);

            elem.insertAdjacentHTML('afterbegin',
                '<div class="topic"">' +
                '<div class="bg" style="background-color:' + bg + '"></div>' +
                nt + '</div>'
            );
        });
    }
});

