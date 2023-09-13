import { Canvas } from './canvas'
import { Controls } from './controls';
import { Game } from './game';
import './style.css'


const app = document.querySelector<HTMLDivElement>('#app')

if (app === null) {
  throw new Error("not #app");
}

const canvas = new Canvas(app, 500, 300)

const game = new Game(canvas)

const controls = new Controls(app, game)