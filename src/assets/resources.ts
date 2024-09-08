// resources.ts
import { ImageSource, Loader, SpriteSheet } from "excalibur";

//@ts-ignore
import map from "./atlas.png";
//@ts-ignore
import playerImage from "./character.png";

export const Resources = {
  map: new ImageSource(map),
  playerImage: new ImageSource(playerImage),
};

export const playerSS1 = SpriteSheet.fromImageSource({
  image: Resources.playerImage,
  grid: {
    rows: 16,
    columns: 15,
    spriteWidth: 16,
    spriteHeight: 32,
  },
});

export const mapSS = SpriteSheet.fromImageSource({
  image: Resources.map,
  grid: {
    rows: 32,
    columns: 32,
    spriteWidth: 32,
    spriteHeight: 32,
  },
});

export const grass = mapSS.getSprite(22, 3);
export const water = mapSS.getSprite(10, 12);
export const rock = mapSS.getSprite(19, 3);

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
