var myArr = [];
var myPhone;
function loadBody() {
    var phone = localStorage.getItem("AUTH");
    if(phone === null) {
        window.location.href="/login";
    }
    else {
        loadCart(phone);
    }
}
function loadCart(phone) {
    var totalP = 0;
    phone = phone.slice(0, 10);
    phone = phone.split("");
    phone = phone.reverse();
    phone = phone.join("");
    myPhone = phone;
    fetch("http://127.0.0.1/loadCart:"+phone)
    .then(response => response.json())
    .then(data => {
      var len = data.length;
      for(var i = 0; i < len; i++) {
        var Each = data[i];
        var name = Each['productName'];
        if(screen.width< 440) {
        name = name.slice(0, 56);
        }
        else {
          name = name.slice(0, 96);
        }
        name = name+"....";
        var id = Each['productId'];
        var Url = Each['imgUrl1'];
        myArr.push(id);
        var price = Each['price'];
        var price2 = price.replace(",", "");
        price2 = parseInt(price2);
        totalP = totalP + price2;
        var category = Each['keywords'];
        category = category.split(",");
        var l = category.length;
        category = category[l-1];
        assign(name, id, Url, price, category);
      }
      var container = document.getElementById("number-div");
      container.innerHTML = `
      <h2 class="text-xl font-bold">Shoping Cart</h2>
            <h3 class="text-xl font-bold" id="len">${len} Items</h3>
      `;
      var container2 = document.getElementById("div-3");
      container2.innerHTML = `<span class="uppercase">Total cost</span>
      <span>${totalP + len * 200}</span>`;
      var container3 = document.getElementById("div-4");
      container3.innerHTML = `
      <span class="text-sm font-medium text-gray-400 mr-1"
                  >Subtotal:</span
                >
                <span class="text-lg font-bold text-gray-800" id="totalP">${totalP}</span>
      `;
      var container4 = document.getElementById("div-5");
      container4.innerHTML = `
      <span>Items ${len}</span>
              <span>${totalP}+ ${200*len} Shipping</span>
      `;
    });
}


function assign(name, id, Url, price, category) {
  var element = `<div id="product${id}" onclick="enLarge(this)" class="flex justify-between items-center mt-6 pt-6">
    <div class="flex items-center">
      <img
        src="${Url}"
        width="60"
        class="square-full"
      />
      <div class="flex flex-col ml-3">
        <span class="md:text-md font-medium">${name}</span>
        <span class="text-xs font-light text-gray-400">${id}</span>
        <span class="text-sm font-light text-orange-400"
          >${category}</span
        >
      </div>
    </div>
    <div class="flex justify-center items-center">
      <div class="pr-8 flex">
      </div>
      <div class="pr-8">
        <span class="text-xs font-medium"><big>${price}</big></span>
      </div>
      <div><button id="p${id}" onclick="removeItem(this)" class="fa fa-close text-xs font-medium"></button></div>
    </div>
    </div>`;
    var container = document.getElementById("main-div");
    var inn = document.getElementById("main-div").innerHTML;
    container.innerHTML = element + inn;
}

function removeItem(a) {
    var id = a.id;
    var idC = id;
    idC = idC.replace("p", "");
    id = id.replace("p", "product");
    document.getElementById(id).setAttribute("style", "display:none;");
    var AUTH = localStorage.getItem("AUTH");
    var phone = AUTH.slice(0,10);
    phone = phone.split("");
    phone = phone.reverse();
    phone = phone.join("");
    myPhone = phone;
    fetch("http://127.0.0.1/remove:"+phone+""+idC)
    .then(response => response.text())
    .then(data => location.reload());
}

function enLarge(a) {
  var id = a.id;
  id = id.replace("product", "");
  window.location.href="/product:"+id;
}

function makePayment() {
    var fetchUrl = "http://127.0.0.1/createOrder:"+myPhone+"&";
    var shipping = document. getElementById('mySelect').selectedOptions[0].value;
    var amount = document.getElementById("totalP").innerHTML;
    var len = document.getElementById("len").innerHTML;
    len = len.replace(" Items", "");
    if(shipping == "Cash On Delivery") {
      len = parseInt(len);
      len = len * 200;
      amount = parseInt(amount);
      amount = amount+len;
      amount = amount * 100;
      var fetchUrl3 = fetchUrl.replace("createOrder", "orderOfline");
      for(i=0;i<myArr.length;i++) {
        fetchUrl3 = fetchUrl3+myArr[i]+"&";
      }
      fetchUrl3 = fetchUrl3 + amount;
      // Main Fetch For Ofline Orders
      console.log("Yes This Is Calling");
      fetch(fetchUrl3)
      .then(response => response.text())
      .then(data => {
        console.log(data);
        alert("Your Order Has Been Placed!, You Will Recieve A Call Soon..");
        window.location.href="/myOrder";
      });
    }
    else {
      for(i=0;i<myArr.length;i++) {
        fetchUrl = fetchUrl+myArr[i]+"&";
      }
      fetchUrl = fetchUrl+amount+"&";
      var fetchUrl2 = fetchUrl.replace("createOrder", "checkSucess");
      fetch(fetchUrl)
      .then(reponse => reponse.json())
      .then(data => {
        fetchUrl2 = fetchUrl2 + data['id'];
        var options = {
          "key": "rzp_test_je0cjIQMvAQ8vm", 
          "currency": "INR",
          "name": "Acme Corp",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": data['id'], 
          "callback_url": fetchUrl2,
          "prefill": {
              "name": "Gaurav Kumar",
              "email": "gaurav.kumar@example.com",
              "contact": "9999999999"
          },
          "notes": {
              "address": "Razorpay Corporate Office"
          },
          "theme": {
              "color": "#3399cc"
          }
      };
      var rzp1 = new Razorpay(options);
     rzp1.open();

     
      });
    }
}

