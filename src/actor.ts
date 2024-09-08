import { Actor, Engine, Vector } from "excalibur";

import { Animation, AnimationStrategy } from "excalibur";
import { playerSS1 } from "./assets/resources";

export const dudeWalkUp = new Animation({
  frames: [
    {
      graphic: playerSS1.getSprite(0, 2),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(1, 2),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(2, 2),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(3, 2),
      duration: 150,
    },
  ],
});

export const dudeWalkDown = new Animation({
  frames: [
    {
      graphic: playerSS1.getSprite(0, 0),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(1, 0),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(2, 0),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(3, 0),
      duration: 150,
    },
  ],
});

export const dudeWalkRight = new Animation({
  frames: [
    {
      graphic: playerSS1.getSprite(0, 1),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(1, 1),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(2, 1),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(3, 1),
      duration: 150,
    },
  ],
});

export const dudeWalkLeft = new Animation({
  frames: [
    {
      graphic: playerSS1.getSprite(0, 3),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(1, 3),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(2, 3),
      duration: 150,
    },
    {
      graphic: playerSS1.getSprite(3, 3),
      duration: 150,
    },
  ],
});

export const dudeIdleDown = new Animation({
  frames: [
    {
      graphic: playerSS1.getSprite(0, 0),
      duration: 150,
    },
  ],
});

export const dudeIdleUp = new Animation({
  frames: [
    {
      graphic: playerSS1.getSprite(0, 2),
      duration: 150,
    },
  ],
});

export const dudeIdleRight = new Animation({
  frames: [
    {
      graphic: playerSS1.getSprite(0, 1),
      duration: 150,
    },
  ],
});

export const dudeIdleLeft = new Animation({
  frames: [
    {
      graphic: playerSS1.getSprite(0, 3),
      duration: 150,
    },
  ],
});

class Player extends Actor {
  constructor() {
    super({
      width: 16,
      height: 32,
      x: 2000,
      y: 2000,
      anchor: Vector.Zero,
    });
    this.z = 1;
  }

  onInitialize(engine: Engine) {
    this.graphics.add(dudeIdleRight);

    engine.currentScene.input.keyboard.on("hold", evt => {
      switch (evt.key) {
        case "ArrowUp":
          this.pos.y -= 1;
          break;
        case "ArrowDown":
          this.pos.y += 1;
          break;
        case "ArrowLeft":
          this.pos.x -= 1;
          break;
        case "ArrowRight":
          this.pos.x += 1;
          break;
      }
    });
  }
}

export const player = new Player();
