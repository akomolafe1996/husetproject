window.addEventListener("DOMContentLoaded", init);


const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search");

const id = urlParams.get("id");

const category = urlParams.get("category");

function init() {
    if (search) {
        //console.log("this is a search result")
        getsearchData();
    } else if (id) {
        getSingleEvent();
    } else if (category) {

        getCategoryData(category)
    } else {
        //console.log("NOT searching")
        getFrontpageData();
    }

    getNavigation()

    function getNavigation() {
        fetch("http://michaljaworski.dk/wordpress/wp-json/wp/v2/categories")
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                data.forEach(addLink)
            })
    }

}

function addLink(oneItem) {
    //console.log(oneItem.name)
    //document.querySelector(".categories").innerHTML += oneItem.name
    if (oneItem.parent === 44) {
        const link = document.createElement("a");
        link.textContent = oneItem.name;
        document.querySelector(".categories").appendChild(link);

        link.setAttribute("href", "category.html?category=" + oneItem.id)
    }
}

function getCategoryData(catId) {
    console.log(catId)
    fetch("http://michaljaworski.dk/wordpress/wp-json/wp/v2/ArtEvent?_embed&categories=" + catId)
        .then(res => res.json())
        .then(handleData)
}

function getFrontpageData() {
    //console.log("getData")
    fetch("http://michaljaworski.dk/wordpress/wp-json/wp/v2/ArtEvent?_embed")
        .then(res => res.json())
        .then(handleData)

}

function getsearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    //console.log("getData")
    fetch("http://michaljaworski.dk/wordpress/wp-json/wp/v2/ArtEvent?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)

}

function getSingleEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id)

    fetch("http://michaljaworski.dk/wordpress/wp-json/wp/v2/ArtEvent/" + id)
        .then(res => res.json())
        .then(showEvent)

    function showEvent(event) {
        console.log(event)
        document.querySelector("article h1").textContent = event.title.rendered
        document.querySelector(".eventdate").innerHTML = event.event_date;
        document.querySelector(".eventtime").innerHTML = event.event_time;
        document.querySelector(".eventlocation").innerHTML = event.event_location;
        document.querySelector(".type").innerHTML = event.event_type;
        document.querySelector(".body-copy").innerHTML = event.long_description;


        const img = document.querySelector("img.cover");
        const imgPath = event.event_image.guid;
        img.setAttribute("src", imgPath)
        img.setAttribute("alt", "Poster of the event" + event.title.rendered)
    }
}

function handleData(myData) {
    //console.log("myData");
    //1 loop
    myData.forEach(showPost)
}

function showPost(post) {
    console.log(post)


    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);

    const h1 = postCopy.querySelector("h1");
    h1.textContent = post.title.rendered;

    const img = postCopy.querySelector("img.cover");
    const imgPath = post.event_image.guid;
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Poster of the event" + post.title.rendered)

    const a = postCopy.querySelector("a");
    a.href = "sub.html?id=" + post.id

    const date = postCopy.querySelector(".eventdate");
    date.innerHTML = post.event_date;

    const time = postCopy.querySelector(".eventtime");
    time.innerHTML = post.event_time;

    const location = postCopy.querySelector(".eventlocation");
    location.innerHTML = post.event_location;

    const type = postCopy.querySelector(".type");
    type.innerHTML = post.event_type;

    document.querySelector("#posts").appendChild(postCopy)
}
