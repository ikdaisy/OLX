const token=localStorage.getItem("Token")
// console.log(token);


async function getProducts() {
    // alert("hii")
    const res=await fetch("http://localhost:3003/api/getproducts",{headers:{
    "authorization" : `Bearer ${token}`}})
    const result=await res.json();
    console.log(result);
    str=``;
    result.products.map((product)=>{
        str+=`<a class="asd" href="./pages/allProducts.html?id=${product._id}">
            <div>
            <div class="men-card">
          <div class="image">
            <img src="${product.images[0]}" alt="">
          </div>
          <div class="content">
             <span class="product-name">${product.pname.substring(0,16)}</span><br>
             <span class="price">₹${product.price}</span><br>
            
          </div>
          
        </div>
        </div> </a>
        
        `
    })

    
document.getElementById("products").innerHTML=str;



// token?document.getElementById("profile").innerHTML=` <div  class="container">
//             <img src="${result.profile}" alt="" id="profileImage" class="profile-image" onclick="popup()">
//             <div class="dropdown" id="dropdownMenu">
               
//                 <div class="dropdown-option" ><a href="./pages/profile.html?id=${result.id}"><button>View Profile</button></a></div>
//                 <div class="dropdown-option"><button onclick="logout()" id="hover">LOGOUT</button></div>
//             </div>
//         </div> `:document.getElementById("profile").innerHTML=`<a href="./pages/signin.html">LOGIN</a> `;

// document.getElementById("sell").innerHTML=`<a href="./pages/addProduct.html?id=${result.id}"><button class="sell" >+SELL</button></a>`
if(res.status==200){
    document.getElementById("profile").innerHTML=` <div  class="container">
            <img src="${result.profile}" alt="" id="profileImage" class="profile-image" onclick="popup()">
             <div class="dropdown" id="dropdownMenu">
               
                <div class="dropdown-option" ><a href="./pages/profile.html?id=${result.id}"><button>View Profile</button></a></div>
                <div class="dropdown-option"><button onclick="logout()" id="hover">LOGOUT</button></div>           </div>
        </div>
        
         `
         
         document.getElementById("sell").innerHTML=`<a href="./pages/addProduct.html?id=${result.id}"><button class="sell" >+SELL</button></a>`
}

}



getProducts()



function popup() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

// Close dropdown if clicked outside
window.addEventListener('click', (event) => {
    if (!profileImage.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

function logout() {
  
    
    localStorage.removeItem("Token");
    // window.location.href="./index.html"
    window.location.reload()
}