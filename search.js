window.addEventListener("DOMContentLoaded", getData);

function getData(){
    const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search");
    //console.log("getData")
    fetch("http://michaljaworski.dk/wordpress/wp-json/wp/v2/ArtEvent?_embed&search="+search)
    .then(res=>res.json())
    .then(handleData)

}

function handleData(myData){
    //console.log("myData");
    //1 loop
    myData.forEach(showPost)
}

function showPost(post) {
    console.log(post)  

    
   const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);
    
    const h1 = postCopy.querySelector("h1");
    h1.textContent=post.title.rendered;
    
    const img = postCopy.querySelector("img.cover");
     const imgPath = post.event_image.guid;
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Poster of the event" + post.title.rendered)
    
    const a = postCopy.querySelector("a");
   a.href="sub.html?id="+post.id
    
    const date = postCopy.querySelector(".eventdate");
    date.innerHTML=post.event_date;
    
    const time = postCopy.querySelector(".eventtime");
    time.innerHTML=post.event_time;
    
    const location = postCopy.querySelector(".eventlocation");
    location.innerHTML=post.event_location;
    
    const type = postCopy.querySelector(".type");
    type.innerHTML=post.event_type;
    
    document.querySelector("#posts").appendChild(postCopy)
}