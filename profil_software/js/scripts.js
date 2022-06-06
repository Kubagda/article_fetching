let articles = [];
let div = document.getElementById("toAppend")
let library = "Add to library";
let numberOfArticles = 0;
async function getArticles(url = '') {
    const response = await fetch(url, {
        method: "GET"
    })
    .then(response => response.json())
    .then(json => articles = json)
    .then(data => console.log(data))
    .then(() => {
        for (let article of articles) {
            let name = library;
            let key = "";
            for(let i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i)
                if(window.localStorage.getItem(key) == article.id) {
                    name = "Remove from library";
                }
            }
            if(article.summary.length > 200) {
                article.summary = article.summary.substring(0, 200)+"...";
            }
            
            toAppend.innerHTML += `
                <div class="card">
                    <h1><b>${article.title}</b></h1>
                    <p><i>${article.publishedAt.replace("T", " Time: ").replace(".000Z", "")}</i></p>
                    <img src="${article.imageUrl}" alt="Image of an article"></img>
                   <div id="summary"><p><i>${article.summary}</i></p></div>
                   <p><b>News from the site: ${article.newsSite}</b></p>
                   <a href="${article.url}"><button type="button">Read More</button></a>
                   <button type="button" id="button${article.id}" onclick="window.localStorage.setItem('${article.id}', '${article.id}'); remove(); getArticles('https://api.spaceflightnewsapi.net/v3/articles?_limit='+numberOfArticles)">${name}</button>
                 </div>
`;
                if(name == "Remove from library") {
                    document.getElementById('button'+article.id).setAttribute("onclick", "window.localStorage.removeItem("+article.id+"); remove(); getArticles('https://api.spaceflightnewsapi.net/v3/articles?_limit='+numberOfArticles)")
            }
            numberOfArticles = div.children.length;
        }
    })
}

function remove() {
    for(let i = 0; i < numberOfArticles; i++) {
        const e = document.querySelector(".card:last-child")
        e.parentElement.removeChild(e);
    }
    numberOfArticles = div.children.length;
}


async function getCount(url = '') {
    const response = await fetch(url, {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => counter.innerHTML = `
    <h2>Number of articles: <br />
    ${numberOfArticles + parseInt(input)}/${data}
    </h2>
`);
}



let input; 

const getValueInput = () => {
    input = document.getElementById("input").value;
    getArticles("https://api.spaceflightnewsapi.net/v3/articles?_limit="+input+"&_start="+numberOfArticles);
    numberOfArticles = div.children.length;
    getCount("https://api.spaceflightnewsapi.net/v3/articles/count");
}
function debounce(func, timeout = 100){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  function display(){
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2000) {
        getArticles("https://api.spaceflightnewsapi.net/v3/articles?_limit="+input+"&_start="+numberOfArticles);
        getCount("https://api.spaceflightnewsapi.net/v3/articles/count");
    }
  }
  const processChange = debounce(() => display());

  window.addEventListener("scroll", processChange);
        