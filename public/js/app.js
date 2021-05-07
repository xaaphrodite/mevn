const api = document.getElementById("api");
api.innerHTML = `${window.location.protocol}${window.location.hostname}:${window.location.port}/api/mevn`;

const author = document.getElementById("author");
author.innerHTML = "by rasetiansyah";

let typed = new Typed(".typing", {
    strings: [`SERVER SIDE.`],
    typeSpeed: 150,
    backSpeed: 150,
    loop: true,
});
