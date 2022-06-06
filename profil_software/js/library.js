let articles = [];
function generate() {
    for(let i = 0; i < localStorage.length; i++) {
        const key = window.localStorage.key(i);
        const art = window.localStorage.getItem(key);
        fetch('https://api.spaceflightnewsapi.net/v3/articles/'+art)
        .then(response => response.json())
        .then(json => articles[i] = json)
        .then(() => {
                if(articles[i].summary.length > 200) {
                    articles[i].summary = articles[i].summary.substring(0, 200)+"...";
                }
                
                toAppend.innerHTML += `
                    <div class="card">
                        <h1><b>${articles[i].title}</b></h1>
                        <p><i>${articles[i].publishedAt.replace("T", " Time: ").replace(".000Z", "")}</i></p>
                        <img src="${articles[i].imageUrl}" alt="Image of an article"></img>
                    <div id="summary"><p><i>${articles[i].summary}</i></p></div>
                    <p>News from the site: ${articles[i].newsSite}</p>
                    <a href="${articles[i].url}"><button type="button">Read More</button></a>
                    <button type="button" onclick="window.localStorage.removeItem('${key}'); window.location.reload(true)">Remove from library</button>
                    </div>
            `;
            }
        )
    }
}

generate();

function remove() {
    for(let i = 0; i < articles.length; i++) {
        const e = document.querySelector(".card:last-child")
        e.parentElement.removeChild(e);
    }
}

function change() {
    for (let i = 0; i < articles.length; i++) {
            const index = articles.indexOf(articles[i]);
            if(articles[i].summary.length > 200) {
                articles[i].summary = articles[i].summary.substring(0, 200)+"...";
            }
            
            toAppend.innerHTML += `
                <div class="card">
                    <h1>${articles[i].title}</h1>
                    <p>${articles[i].publishedAt.replace("T", " Time: ").replace(".000Z", "")}</p>
                    <img src="${articles[i].imageUrl}" alt="Image of an article" width="500px"></img>
                   <p>${articles[i].summary}</p>
                   <p>News from the site: ${articles[i].newsSite}</p>
                   <a href="${articles[i].url}"><button type="button">Read More</button></a>
                   <button type="button" onclick="window.localStorage.removeItem('${articles[i].id}'); window.location.reload(true)">Remove from library</button>
                 </div>
        `;
            }
    }

function alAsc(arr) {
    function compare(a, b) {
        if(a.title < b.title) {
            return -1;
        }
        if(a.title > b.title) {
            return 1;
        }
        return 0;
    }
    arr.sort(compare);
    remove();
    change();
}
function alDes(arr) {
    function compare(a, b) {
        if(a.title < b.title) {
            return -1;
        }
        if(a.title > b.title) {
            return 1;
        }
        return 0;
    }
    arr.sort(compare);
    arr.reverse();
    remove();
    change();
}

function pubAsc(arr) {
    function compare(a, b) {
        if(a.publishedAt < b.publishedAt) {
            return -1;
        }
        if(a.publishedAt > b.publishedAt) {
            return 1;
        }
        return 0;
    }
    arr.sort(compare);
    arr.reverse();
    remove();
    change();
}

function pubDes(arr) {
    function compare(a, b) {
        if(a.publishedAt < b.publishedAt) {
            return -1;
        }
        if(a.publishedAt > b.publishedAt) {
            return 1;
        }
        return 0;
    }
    arr.sort(compare);
    remove();
    change();
}