import './style.css';

function createElement() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello';
    element.classList.add('red');
    return element;
}
document.body.appendChild(createElement());

// function createFavicon() {
//     const favicon = document.createElement('link');
//     favicon.setAttribute('href', './images/icon.png');
//     return favicon;
// }
// document.head.appendChild(createFavicon());
