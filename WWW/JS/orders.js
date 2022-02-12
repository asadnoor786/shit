function redirectWhatsapp() {
    var a = localStorage.getItem("AUTH");
    a = a.slice(0, 10);
    a = a.split("");
    a = a.reverse();
    a = a.join("");
    var orderName = document.querySelector(".product").innerHTML;
    var Url = "http://127.0.0.1/postMessage:"+a;
    console.log(Url);
    fetch(Url)
    .then(response => response.text())
    .then(data => {
        if(data == "done") {
            alert("Your Request Has Been Submitted, Soon You Will Get A Call From Us.");
        }
        else {
            alert("Failed To Track Order");
        }
    });
}