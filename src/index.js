import './style.css';
import Icon from './assets/icon.png';

function createElement() {
    const element = document.createElement('div');
    element.innerHTML = 'TETRIS';
    element.classList.add('title');
    return element;
}
document.body.appendChild(createElement());

const linkElem = document.createElement('link');
linkElem.type = 'image/png';
linkElem.rel = 'icon';
linkElem.href = Icon;
document.head.appendChild(linkElem);

function getComponent() {
    return import('./example.js').then((logHello) => {
        document.onclick = logHello;
    });
}
getComponent();
