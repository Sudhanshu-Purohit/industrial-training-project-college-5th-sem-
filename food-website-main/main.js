
var book_table = new Swiper(".book-table-img-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 2000,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 3,
        stretch: 2,
        depth: 100,
        modifier: 5,
        slideShadows: false,
    },
    loopAdditionSlides: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

var team_slider = new Swiper(".team-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 2000,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1.2,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 3,
        },
    },
});

jQuery(".filters").on("click", function () {
    jQuery("#menu-dish").removeClass("bydefault_show");
});
$(function () {
    var filterList = {
        init: function () {
            $("#menu-dish").mixItUp({
                selectors: {
                    target: ".dish-box-wp",
                    filter: ".filter",
                },
                animation: {
                    effects: "fade",
                    easing: "ease-in-out",
                },
                load: {
                    filter: ".all, .breakfast, .lunch, .dinner",
                },
            });
        },
    };
    filterList.init();
});

jQuery(".menu-toggle").click(function () {
    jQuery(".main-navigation").toggleClass("toggled");
});

jQuery(".header-menu ul li a").click(function () {
    jQuery(".main-navigation").removeClass("toggled");
});

gsap.registerPlugin(ScrollTrigger);

var elementFirst = document.querySelector('.site-header');
ScrollTrigger.create({
    trigger: "body",
    start: "30px top",
    end: "bottom bottom",

    onEnter: () => myFunction(),
    onLeaveBack: () => myFunction(),
});

function myFunction() {
    elementFirst.classList.toggle('sticky_head');
}

var scene = $(".js-parallax-scene").get(0);
var parallaxInstance = new Parallax(scene);


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});

// firebase
const firebaseConfig = {
    apiKey: "AIzaSyBH52evfHDDScfFCi7fLLB5ov9VeXffqB0",
    authDomain: "industrial-trai.firebaseapp.com",
    databaseURL: "https://industrial-trai-default-rtdb.firebaseio.com",
    projectId: "industrial-trai",
    storageBucket: "industrial-trai.appspot.com",
    messagingSenderId: "539038949594",
    appId: "1:539038949594:web:f96e3bc87da6c4c1fd85e3",
    measurementId: "G-GLTGCK3P2E"
  };

// const orderBtn = document.querySelector(".order-btn");
const nam = document.querySelector("#name");
const Email = document.querySelector("#email");
const Address = document.querySelector("#address");
const Phone = document.querySelector("#phone");
const date = document.querySelector("#book_date");
const Time = document.querySelector("#book_time");
const Flavour = document.querySelector("#flavour");
const Quantity = document.querySelector("#quantity");
const siteHeader = document.querySelector(".site-header")


firebase.initializeApp(firebaseConfig);
// Reference messages collection
var ordersRef = firebase.database().ref("Orders");

document.querySelector("#contactForm").addEventListener("submit", submitForm);
// Submit form
function submitForm(e){
    if(nam.value == "" || Email.value == "" || Address.value == "" || Phone.value == "" || date.value == "" || Time.value == "" || Flavour.value == "" || Quantity.value == "") {
        document.querySelector('#alert').style.display = 'block';
        document.querySelector('#alert').textContent = "Enter all the details."
        siteHeader.classList.remove("site-header")
        setTimeout(function(){
            document.querySelector('#alert').style.display = 'none';
            siteHeader.classList.add("site-header")
          },3000);
        // alert("Enter all the details.")
        e.preventDefault();
        return;
    }
  e.preventDefault();

  document.querySelector('#alert').textContent = "Your order has been placed!🎉🎉"
  // Save message function
  saveMessage(nam.value, Email.value, Address.value, Phone.value, date.value, Time.value, Flavour.value, Quantity.value);

  // Show alert
  document.querySelector('#alert').style.display = 'block';
  siteHeader.classList.remove("site-header")
  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('#alert').style.display = 'none';
    siteHeader.classList.add("site-header")
  },3000);

  // Clear form
  document.querySelector("#contactForm").reset()
}

// Save message to firebase
function saveMessage(nam, Email, Address, Phone, date, Time, Flavour, Quantity){
  var newOrdersRef = ordersRef.push();
  newOrdersRef.set({
    nam: nam,
    Email: Email,
    Address: Address,
    Phone: Phone,
    date: date,
    Time: Time,
    Flavour: Flavour,
    Quantity: Quantity
  });
}


// cart
const addToCartButtons = document.getElementsByClassName("dish-add-btn")
let cartContainer = document.getElementsByTagName('tbody')[0]
let quantityFields = document.getElementsByClassName('num')
let delete_buttons = document.getElementsByClassName('uk-button-danger')


/// picking up all the Add-To-Cart buttons
for(let i = 0; i < addToCartButtons.length; i++){
    addToCartButtons[i].addEventListener('click', addToCart)
}

// This function helps to add items to our cart
function addToCart(event){
    let itemContainer = document.createElement('tr')
    let btn = event.target
    let btnGrandParent = btn.parentElement.parentElement.parentElement.parentElement.parentElement.children[0]
    let btnParent = btn.parentElement.parentElement.parentElement.parentElement.parentElement.children[2]

    let itemImage = btnGrandParent.children[0].src
    let itemName = btnParent.children[0].innerText
    let itemPrice = btn.parentElement.parentElement.parentElement.children[0].innerText
    
    
    itemContainer.innerHTML = `
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
    <td class="uk-table-link">
        <h5 class = "item-name">${itemName}</h5>
    </td>
    <td class="uk-text-truncate item-price"><h5>${itemPrice}</h5></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h5>${itemPrice}</h5></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
`
    cartContainer.append(itemContainer)

    // Accessing individual quantity fields
    for(let i = 0; i < quantityFields.length; i++){
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)
    }

    // Accessing individual quantity fields
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem)
    }

    grandTotal()
}



// This function helps to multiply the quantity and the price
function totalCost(event){
    let quantity = event.target
    console.log(quantity.value);

    quantity_parent = quantity.parentElement.parentElement
    // console.log(quantity_parent);

    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    // console.log(price_field);

    total_field = quantity_parent.getElementsByClassName('total-price')[0]
    // console.log(total_field);

    price_field_content = price_field.innerText.replace('Rs.', '')
    // console.log(price_field_content);

    total_field.children[0].innerText = `Rs ${quantity.value * price_field_content}`

    if(isNaN(quantity.value)|| quantity.value <= 0){
        quantity.value = 1
        total_field.children[0].innerText = `Rs ${quantity.value * price_field_content}`
    }

    grandTotal()
}

// This function helps to add up the total of the items
function grandTotal(){
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]
    all_total_fields = document.getElementsByClassName('total-price')
    for(let i = 0; i < all_total_fields.length; i++){
        all_prices = Number(all_total_fields[i].innerText.replace('Rs.', ''))
        console.log(all_prices);
        total+=all_prices
    }
    grand_total.children[0].innerText = `Rs ${total}`
    grand_total.children[0].style.fontWeight = 'bold'
    // console.log(total)
}


function removeItem(event){
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    // console.log(del_btn)
    grandTotal()
}

