const container = document.querySelector('.products');
const BASE_URL = 'https://dummyjson.com/';
const renderElement = function(data){
    const div  = `
        <div class="product">
            <div class="product-img">
                <img src="${data.images[0]}" alt="">
            </div>
            <div class="product-data">
                <div class="product-head">
                    <p class="product-brand">${data.brand}</p>
                    <span>|</span>
                    <p class="product-title">${data.title}</p>
                </div>
                <p class="product-body product-desc">
                ${data.description}
                </p>
                <div class="product-foot">
                    <p class="product-price">${data.price} ₼</p>
                    <p class="product-rating">${data.rating} ✬ </p>
                    <button class="add-to-basket" type="button">
                        <img src="./img/basket.png" alt="">
                    </button>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend' , div)
}

const api = method => async url => {
    const res = await fetch(url);
    return await res.json();
}

api('GET')(`${BASE_URL}products`)
.then(data=> {
        const products = data.products;
        products.forEach(element => {
            renderElement(element)
        });
       })
.catch(err=>console.log(err));

function seq1(n){
    let fib = [0 , 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i-2] + fib[i-1]
    }
    return fib
}
console.log(seq1(4))

// function seq(n){
//     let fib = [];
//     for (let i = 0; i < n; i++) {
//         if(i<2) {
//             fib[i] = i;
//         }
//         else {
//             fib[i] = fib[i-1]+fib[i-2];
//         }
//     }
//     return fib
// }
// console.log(seq(2))

function fact(n){
    let factSum = 1 ;
    for (let i = 1; i <=n; i++) {
        factSum*=i        
    } 
    return factSum;
}
console.log(fact(5))

// Bubble -sort
// function sorted(arr){
//     let swapped = true;
//     do {
//         swapped = false;
//         for (let i = 0; i < arr.length; i++) {
//             console.log(arr[i])
//             if(arr[i] > arr[i+1]){
//                 let temp = arr[i];
//                 arr[i] = arr[i+1];
//                 arr[i+1] = temp;
//                 // swapped = true;
//             }
//         }
//     } while (swapped);
//     return arr
// }
console.log(sorted([4,6,1,2,9,0]));