const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)

fetch("http://michaljaworski.dk/wordpress/wp-json/wp/v2/ArtEvent/"+id)
.then(res=>res.json())
.then(showEvent)

function showEvent(event) {
    console.log(event)
    document.querySelector("article h1").textContent=event.title.rendered
    document.querySelector(".eventdate").innerHTML=event.event_date;
     document.querySelector(".eventtime").innerHTML=event.event_time;
     document.querySelector(".eventlocation").innerHTML=event.event_location;
     document.querySelector(".type").innerHTML=event.event_type;
    document.querySelector(".body-copy").innerHTML=event.long_description;
    
    
    const img = document.querySelector("img.cover");
     const imgPath = event.event_image.guid;
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Poster of the event" + event.title.rendered)
}