import "./style.css";
import { UI } from "@peasy-lib/peasy-ui";
import { Engine, DisplayMode, TileMap, ImageSource, SpriteSheet, Camera, Vector, Color } from "excalibur";
import { model, template } from "./ui";
import { loader } from "./assets/resources";
import { PerlinGenerator } from "@excaliburjs/plugin-perlin";
import { tilemapArray, WorldGen } from "./worldGen";
import { player } from "./actor";

await UI.create(document.body, model, template).attached;

const game = new Engine({
  width: 800, // the width of the canvas
  height: 600, // the height of the canvas
  canvasElementId: "cnv", // the DOM canvas element ID, if you are providing your own
  displayMode: DisplayMode.Fixed, // the display mode
  pixelArt: true,
  backgroundColor: Color.fromHex("#333333"),
  suppressPlayButton: true,
});

await game.start(loader);

const camera = game.currentScene.camera;

camera.zoom = 3;

const world = new WorldGen();
game.add(player);
camera.strategy.lockToActor(player);

console.log(world);

for (let i = 0; i < tilemapArray.length; i++) {
  game.add(tilemapArray[i]);
}

world.resetTilemapByActor(player);
