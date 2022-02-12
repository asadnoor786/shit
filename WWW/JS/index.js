function loadBody() {
    var a = document.getElementById("meraFrame").contentWindow.document.body.offsetHeight;
    document.querySelector(".section-3").setAttribute("style", "height:"+(a+30)+"px;");
    if(screen.width< 570) {
    document.getElementById("section-6").setAttribute("style", "height:"+(screen.height+100)+"px;margin-top:50px;");
    console.log("ye");
    }
    var home = document.querySelector(".ifr1").contentWindow.document.getElementById("home");
    var contact = document.querySelector(".ifr1").contentWindow.document.getElementById("contact");
    var products = document.querySelector(".ifr1").contentWindow.document.getElementById("products");
    var products2 = document.querySelector(".ifr1").contentWindow.document.getElementById("products2");
    var login = document.querySelector(".ifr1").contentWindow.document.getElementById("login");
    home.addEventListener('click', () => {
        console.log("yes");
        window.location.href="#section-1";
    });
    // about.addEventListener('click', () => {
    //     window.location.href="#section-4";
    // });
    contact.addEventListener('click', () => {
        window.location.href="#section-5";
    });
    products.addEventListener('click', () => {
        window.location.href="#section-3";
    });
    products2.addEventListener('click', () => {
        window.location.href="#section-3";
    });
    login.addEventListener('click', () => {
        window.location.href="/login";
    });
}