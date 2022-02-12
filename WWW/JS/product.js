function loadBody() {
    var a = document.querySelector(".all-text").offsetWidth;
    document.querySelector(".btn-container").setAttribute("style", "width:"+a+"px;");
}
function changeImg(a) {
    var Url = a.getAttribute("src");
    console.log(Url)
    document.querySelector(".img").setAttribute("src", `${Url}`);
}

function addCart() {
    if(localStorage.getItem("AUTH")===null) {
        window.location.href="/login";
    }
    else{
    var a = localStorage.getItem("AUTH");
    a = a.slice(0, 10);
    a = a.split("");
    a = a.reverse();
    a = a.join("");
    console.log(a);
    var Url = window.location.pathname;
    Url = Url.replace("/product:", "");
    Url = Url+"&"+a;
    console.log("Url = "+Url)
    fetch("http://127.0.0.1/cart:"+Url)
    .then(response => response.json())
    .then(data => window.location.href="/myCart");
    }
}