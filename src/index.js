import './style.css';
import Icon from './assets/icon.png';
import Game from './game';
import View from './view';
import Controller from './controller';

function createHeader() {
    const element = document.createElement('h1');
    element.innerHTML = 'TETRIS';
    element.classList.add('title');
    return element;
}
document.body.append(createHeader());

const favicon = document.createElement('link');
favicon.type = 'image/png';
favicon.rel = 'icon';
favicon.href = Icon;
document.head.append(favicon);

const root = document.createElement('div');
root.id = 'root';
document.body.append(root);

const game = new Game();
const view = new View(root, 480, 640, 20, 10);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;
