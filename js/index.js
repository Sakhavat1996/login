// 'use strict';
const form = document.querySelector('form');
const nameInput = document.querySelector('input.name');
const passInput = document.querySelector('input.password');
const body = document.querySelector('body');
const success = document.querySelector('.success');
const logoutBTN = document.querySelector('.logout');

// Get cookies
const getCookies = function(){
    const cookies = document.cookie;
    const cookiesObject = {};
    cookies && cookies.split('; ').forEach(cookie => {
        const splitedCookie = cookie.split('=')
        cookiesObject[splitedCookie[0]] = splitedCookie[1]
    });
    return cookiesObject;
}
getCookies();

// render any Message to window
const renderMessage = function(
    msg = 'Bele bir istifade yoxdur' ,
    tag = 'p' ,
    className = 'error'
    ){
    let message = 
        `<${tag} class="${className}">
            ${className === 'success' ? 'Hello' : ''} ${msg}
        </${tag}>`
    body.insertAdjacentHTML('beforeend' , message);
    return message;
};

// login action
if(getCookies().token){
    form.style.display = 'none';
    logoutBTN.style.display = 'flex';
    renderMessage(getCookies().firstName , 'h1' , 'success');
}

form.addEventListener('submit' , function(e){
    e.preventDefault();
    api('POST')('/auth/login')({
        username: nameInput.value,
        password: passInput.value
    })
    .then(data=>{
        document.querySelector('.error')?.remove()
        document.querySelector('.success')?.remove();
        if(!data.token){
            throw new Error('Bele bir istifadeci yoxdu')
        }
        form.style.display = 'none';
        renderMessage(data.firstName , 'h1' , 'success');
        document.cookie = `token=${data.token};Max-Age=70`;
        document.cookie = `firstName=${data.firstName};Max-Age=70`;
        logoutBTN.style.display = 'flex';
    })
    .catch(err=> {
        document.cookie = 'token=;Max-Age=-999999'
        renderMessage(err.message);
    })
})


// logout
logoutBTN.addEventListener('click', function(e){
    e.target.style.display = 'none';
    const success = document.querySelector('.success');
    success.textContent = `Xoş gəlmisiniz ${getCookies().firstName}! Daxil olun`;
    form.style.display = 'flex';
})

// API currying
const api = method => path => {
    return async function (body){
        const res = await fetch(`https://dummyjson.com${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return await res.json();
    }
};

// const cookie = {
//     // Function to set a cookie
//     setItem: function (key, value, expires) {
//         document.cookie = `${key}=${value}; expires=${expires}; path=/`;
//     },

//     // Function to get the value of a cookie
//     getItem: function (key) {
//         const cookies = document.cookie.split('; ');
//         for (const cookie of cookies) {
//             const [cookieKey, cookieValue] = cookie.split('=');
//             if (cookieKey === key) {
//                 return cookieValue;
//             }
//         }
//         return null;
//     },

//     // Function to remove a cookie
//     removeItem: function (key) {
//         document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
//     }
// };

// // Example usage:
// const key = 'exampleKey';
// const value = 'exampleValue';
// const expires = new Date(Date.now() + 86400000).toUTCString(); // 24 hours from now

// // Set a cookie
// cookie.setItem(key, value, expires);

// // Get the value of a cookie
// const retrievedValue = cookie.getItem(key);
// console.log(retrievedValue);

// // Remove a cookie
// cookie.removeItem(key);

// const weekdays = ['sun' , 'mon' , 'tue' , 'wed' , 'thurs' , 'fri' , 'sat']
// const obj = {
//     [weekdays[0]] : {
//         num1 : 45
//     },
//     [weekdays[1]] : {
//         num1 : 45
//     },
//     [weekdays[2]]: {
//         num1: 25
//     }
// }
// const n = 'sun'
// console.log(obj[n]?.num1 ?? 0)