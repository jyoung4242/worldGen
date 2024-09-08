import { PerlinGenerator } from "@excaliburjs/plugin-perlin";
import { Actor, TileMap, Vector, Text, Font, Graphic } from "excalibur";
import { grass, rock, water } from "./assets/resources";

//setup chunk tilemaps (qty 9)

export const tilemap0_0 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(0, 0),
});
export const tilemap1_0 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(1024, 0),
});
export const tilemap2_0 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(2048, 0),
});
export const tilemap0_1 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(0, 1024),
});
export const tilemap1_1 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(1024, 1024),
});
export const tilemap2_1 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(2048, 1024),
});
export const tilemap0_2 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(0, 2048),
});
export const tilemap1_2 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(1024, 2048),
});
export const tilemap2_2 = new TileMap({
  tileWidth: 32,
  tileHeight: 32,
  rows: 32,
  columns: 32,
  pos: new Vector(2048, 2048),
});

export const tilemapArray = [
  tilemap0_0,
  tilemap1_0,
  tilemap2_0,
  tilemap0_1,
  tilemap1_1,
  tilemap2_1,
  tilemap0_2,
  tilemap1_2,
  tilemap2_2,
];

export class WorldGen {
  tilemapWidth = 4960; //155 chunks
  tilemapHeight = 4960; //155 chunks

  // Using a simple Uint8Array to represent tile types (e.g., 0 = water, 1 = grass, 2 = mountain)
  tileStruct = new Uint8Array(this.tilemapWidth * this.tilemapHeight);
  chunks: number[] = [];

  generator = new PerlinGenerator({
    seed: Math.random() * 1000, // random seed
    octaves: 2, // number of times noise is laid on itself
    frequency: 24, // number of times the pattern oscillates, higher is like zooming out
    amplitude: 0.91, // [0-1] amplitude determines the relative height of the peaks generated in the noise
    persistance: 0.95, // [0-1] he persistance determines how quickly the amplitude will drop off, a high degree of persistance results in smoother patterns, a low degree of persistance generates spiky patterns.
  });

  constructor() {
    for (let y = 0; y < this.tilemapHeight; y++) {
      for (let x = 0; x < this.tilemapWidth; x++) {
        const tileIndex = y * this.tilemapWidth + x;
        this.tileStruct[tileIndex] = this.generateTile(x, y);
      }
    }

    this.setupChunks();
  }

  public getTile(x: number, y: number): number {
    return this.tileStruct[y * this.tilemapWidth + x];
  }

  setupChunks() {
    for (let i = 0; i < this.tileStruct.length; i += 1024) {
      this.chunks.push(i);
    }
    console.log("chunks", this.chunks);
  }

  generateTile(x: number, y: number): number {
    // 0 = water, 1 = grass, 2 = mountain
    const noiseValue = this.generator.noise(x / this.tilemapWidth, y / this.tilemapHeight);
    if (noiseValue < 0.44) return 0; // Water
    else if (noiseValue < 0.55) return 1; // Grass
    else return 2; // Mountain
  }

  fetchChunk(chunkNumer: number) {
    /* console.log("fetchChunk", chunkNumer);
    console.log("this.chunks[chunkNumer]", this.chunks[chunkNumer]);
    console.log(this.tileStruct); */
    const start = this.chunks[chunkNumer];
    const end = this.chunks[chunkNumer] + 1024;
    // console.log("tiles: ", this.tileStruct.slice(start, end));

    return this.tileStruct.slice(start, end);
  }

  getActorChunk(actor: Actor) {
    const location = actor.pos;
    console.log("location", location);

    const chunkX = Math.floor(location.x / 1024);
    const chunkY = Math.floor(location.y / 1024);
    console.log("chunkX", chunkX, "chunkY", chunkY);

    const chunkIndex = chunkX + chunkY * 32;
    return chunkIndex;
  }

  resetTilemapByActor(player: Actor) {
    //get player chunk
    const playerChunk = this.getActorChunk(player);
    //get neighbor chunks
    const chunkX = Math.floor(playerChunk / 32);
    const chunkY = Math.floor(playerChunk / 32);
    const offsets = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];

    const neighborChunks: any[] = [];

    for (let i = 0; i < offsets.length; i++) {
      const offset = offsets[i];
      const x = chunkX + offset[0];
      const y = chunkY + offset[1];
      const chunkIndex = x + y * 32;
      neighborChunks.push({ chunkIndex, x: x * 1024, y: y * 1024 });
    }

    let playerChunkX = chunkX * 1024;
    let playerChunkY = chunkY * 1024;

    console.log("playerChunk", playerChunk);
    console.log("neighborChunks", neighborChunks);
    console.log("tilemapArray", tilemapArray);

    for (let j = 0; j < tilemapArray.length; j++) {
      const tilemap = tilemapArray[j];

      let chunk;
      if (j != 4) {
        //neighborchunks

        if (j < 4) {
          chunk = this.fetchChunk(neighborChunks[j].chunkIndex);
          tilemap.pos = new Vector(neighborChunks[j].x, neighborChunks[j].y);
        } else {
          chunk = this.fetchChunk(neighborChunks[j - 1].chunkIndex);
          tilemap.pos = new Vector(neighborChunks[j - 1].x, neighborChunks[j - 1].y);
        }
      } else {
        //playerchunk
        //neighborchunks
        chunk = this.fetchChunk(playerChunk);
        tilemap.pos = new Vector(playerChunkX, playerChunkY);
      }

      let tileIndex = 0;
      for (const tile of tilemap.tiles) {
        let sprite;
        //console.log("chunk", chunk);

        //console.log("chunk[tileIndex]", chunk[tileIndex]);

        if (chunk[tileIndex] == 0) {
          sprite = water;
        } else if (chunk[tileIndex] == 1) {
          sprite = grass;
        } else {
          sprite = rock;
        }
        tile.clearGraphics();
        tile.addGraphic(sprite);

        let chunkstring = chunk[tileIndex].toString();
        let tileIndexstring = tileIndex.toString();

        tile.addGraphic(addText(`tilemap: ${j}`, `tileIndex: ${tileIndexstring}`));
        tileIndex++;
      }
    }

    //reset tilemap
  }
}

function addText(chunkstring: string, tileIndexstring: string): Graphic {
  const newGraphic = new Text({
    text: chunkstring + " " + tileIndexstring,
    maxWidth: 32,
    font: new Font({
      family: "Arial",
      size: 4,
    }),
  });

  return newGraphic;
}
