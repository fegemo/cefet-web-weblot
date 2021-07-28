import { GameEngine } from "./engine.js";
import { Note } from "./music.js";
import { Lane, lerp } from "./utils.js";

const GMSTATE = {
  LOADING: 0,
  INGAME: 1,
  MAPPER: 2,
};

class Game {
  #engine;
  #gameState;
  #context;
  #gamepadConnected;
  #musicName;
  #activateMapper;

  /**
   * @param {String} musicName - Music to be loaded
   * @param {Number} acceptance - Note height/hitbox
   * @param {Number} spd - Note speed
   * @param {Boolean} activateMapper - Initiate game in mapper mode
   */
  constructor(
    musicName = "B'z-Into_Free",
    acceptance = 15,
    spd = 0.5,
    activateMapper = false
  ) {
    this.#musicName = musicName;
    this.acceptance = acceptance;
    this.spd = spd;
    this.#activateMapper = activateMapper;

    this.#engine = new GameEngine(this.init, this.updateLoop, this.drawLoop);
    this.#engine.loadAssets([
      ["cross", "images/ButtonCross.svg"],
      ["circle", "images/ButtonCircle.svg"],
      ["triangle", "images/ButtonTriangle.svg"],
      ["square", "images/ButtonSquare.svg"],
      [musicName, `musics/${musicName}.png`],
    ]);
    this.#engine.loadSounds([musicName]);
    this.#engine.run();
  }

  init = () => {
    window.addEventListener("gamepadconnected", (e) => {
      if (e.gamepad.index == 0) {
        this.#gamepadConnected = true;
      }
    });
    this.setState(GMSTATE.LOADING);
  };

  setState(state) {
    this.#gameState = state;
    switch (this.#gameState) {
      case GMSTATE.LOADING:
        break;
      case GMSTATE.INGAME:
        this.ingameInit(this.#engine.musics[this.#musicName]);
        break;
      case GMSTATE.MAPPER:
        this.mapperInit(this.#engine.musics[this.#musicName]);
        break;
    }
  }

  updateLoop = (dt) => {
    switch (this.#gameState) {
      case GMSTATE.LOADING:
        if (this.#engine.allSoundsLoaded()) {
          if (this.#activateMapper) this.setState(GMSTATE.MAPPER);
          else this.setState(GMSTATE.INGAME);
        }
        break;
      case GMSTATE.INGAME:
        this.ingameUpdateLoop(dt);
        break;
      case GMSTATE.MAPPER:
        this.mapperUpdateLoop(dt);
        break;
    }
  };

  drawLoop = (dt) => {
    switch (this.#gameState) {
      case GMSTATE.LOADING:
        break;
      case GMSTATE.INGAME:
        this.ingameDrawLoop(dt);
        break;
      case GMSTATE.MAPPER:
        this.mapperDrawLoop(dt);
        break;
    }
  };

  // ========================================= ingame state
  ingameInit = (music) => {
    this.#context = {
      currentMusic: music,
      play: false,
      startCountdown: -1,
      hits: 0,

      lanes: [
        new Lane(49, 171, 220), // blue - cross
        new Lane(207, 67, 49), // red - circle
        new Lane(115, 181, 100), // green - triangle
        new Lane(243, 231, 60), // yellow - square
      ],

      bgOffset: { x: 0, y: 0 },
      bgScale: 1,
      hitShakeIntensity: 50,
    };
    // clean notes
    music.setNotesStroke(false);

    // current workaround to play audio
    window.addEventListener(
      "gamepadconnected",
      () =>
        !this.#context.play &&
        this.#context.startCountdown <= 0 &&
        this.startMusicCountdown()
    );
  };

  ingameUpdateLoop = (dt) => {
    const input = this.getGamepadInput();
    this.#context.startCountdown = Math.max(
      0,
      this.#context.startCountdown - dt
    );

    // update lanes - ds4 mapping
    this.#context.lanes[0].pressed = input[6] || input[0]; // l2 || ✕
    this.#context.lanes[1].pressed = input[4] || input[1]; // l1 || ◯
    this.#context.lanes[2].pressed = input[5] || input[3]; // r1 || △
    this.#context.lanes[3].pressed = input[7] || input[2]; // r2 || ☐

    // reset bg Offset and Scale
    this.#context.bgOffset.x = lerp(this.#context.bgOffset.x, 0, 0.35);
    this.#context.bgOffset.y = lerp(this.#context.bgOffset.y, 0, 0.35);
    this.#context.bgScale = lerp(this.#context.bgScale, 1, 0.1);

    // check for stroke hits
    for (const note of this.#context.currentMusic.mapping) {
      if (
        this.#context.lanes[note.lane].pressed &&
        !note.stroke &&
        note.isNearLaneEnd(this.spd, this.acceptance)
      ) {
        note.stroke = true;
        this.#context.hits++;

        this.#context.bgOffset.x =
          this.#context.hitShakeIntensity * (Math.random() - 0.5);
        this.#context.bgOffset.y =
          this.#context.hitShakeIntensity * (Math.random() - 0.5);
        this.#context.bgScale = 1.2 + 0.2 * Math.random();
      }
    }
  };

  ingameDrawLoop = (dt) => {
    const { ctx } = this.#engine;
    const [canvasWidth, canvasHeight] = [ctx.canvas.width, ctx.canvas.height];
    const laneHeight = canvasHeight * 0.9;
    const { startCountdown, play, lanes, currentMusic } = this.#context;

    this.drawBg();
    this.drawBgImage(this.#engine.assets[this.#musicName]);
    this.drawBg("rgba(34,37,38, 0.75)");

    // lanes
    for (const index in lanes) {
      lanes[index].draw(ctx, index, laneHeight);
    }

    // countdow
    if (startCountdown > 0) {
      this.drawCountdown();
    }

    if (play) {
      // notes
      for (const note of currentMusic.mapping) {
        if (
          Math.abs(laneHeight - note.getOffset()) <= 1.5 * canvasHeight &&
          !note.stroke
        ) {
          note.draw(ctx, laneHeight, this.spd, this.acceptance);
        }
      }

      // hit count
      this.drawHitCount();
    }

    // buttons
    this.drawButton(this.#engine.assets["cross"], 0, laneHeight);
    this.drawButton(this.#engine.assets["circle"], 1, laneHeight);
    this.drawButton(this.#engine.assets["triangle"], 2, laneHeight);
    this.drawButton(this.#engine.assets["square"], 3, laneHeight);
  };

  // helpers
  getGamepadInput = () => {
    let buttons = [];
    if (this.#gamepadConnected) {
      buttons = navigator.getGamepads()[0].buttons.map((b) => b.pressed);
    }
    return buttons;
  };

  startMusicCountdown = () => {
    this.#context.startCountdown = 3000;
    setTimeout(() => {
      this.#context.currentMusic.play();
      this.#context.play = true;
    }, this.#context.startCountdown);
  };

  drawCountdown = () => {
    const { ctx } = this.#engine;
    const { startCountdown } = this.#context;

    ctx.font = "80px arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      String(Math.ceil(startCountdown / 1000)),
      ctx.canvas.width / 2,
      ctx.canvas.height / 2
    );
  };

  drawHitCount = () => {
    const { ctx } = this.#engine;
    const { hits } = this.#context;

    ctx.font = "80px arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(hits), ctx.canvas.width / 11, ctx.canvas.height / 2);
  };

  drawButton(asset, lane, laneHeight) {
    const ctx = this.#engine.ctx;
    const [canvasWidth, canvasHeight] = [ctx.canvas.width, ctx.canvas.height];

    const cellWidth = canvasWidth / 11;
    const [width, height] = [cellWidth / 2, cellWidth / 2];

    ctx.drawImage(
      asset,
      2 * cellWidth + 2 * lane * cellWidth + width / 2,
      laneHeight - height / 2,
      width,
      height
    );
  }

  drawBg = (color = "rgb(34,37,38)") => {
    const { ctx } = this.#engine;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  drawBgImage = (img) => {
    const { ctx } = this.#engine;
    const [canvasWidth, canvasHeight] = [ctx.canvas.width, ctx.canvas.height];
    const { bgOffset, bgScale } = this.#context;

    let imgWidth = img.width;
    let imgHeight = img.height;
    if (canvasHeight > canvasWidth) {
      imgHeight = canvasHeight;
      imgWidth = (imgHeight * img.width) / img.height;
    } else {
      imgWidth = canvasWidth;
      imgHeight = (imgWidth * img.height) / img.width;
    }
    imgWidth *= 1.2 * bgScale;
    imgHeight *= 1.2 * bgScale;

    const xfloating = 10 * Math.sin(Date.now() * 0.003);
    const yfloating = 15 * Math.sin(Date.now() * 0.0025);

    ctx.drawImage(
      img,
      canvasWidth / 2 - imgWidth / 2 + xfloating + bgOffset.x,
      canvasHeight / 2 - imgHeight / 2 + yfloating + bgOffset.y,
      imgWidth,
      imgHeight
    );
  };

  // ========================================= mapper state
  mapperInit = (music) => {
    music.mapping = [];
    this.#context = {
      currentMusic: music,
      startCountdown: -1,
      play: false,
      lanes: [
        new Lane(49, 171, 220), // blue - cross
        new Lane(207, 67, 49), // red - circle
        new Lane(115, 181, 100), // green - triangle
        new Lane(243, 231, 60), // yellow - square
      ],
    };

    // current workaround to play audio
    window.addEventListener(
      "gamepadconnected",
      () =>
        !this.#context.play &&
        this.#context.startCountdown <= 0 &&
        this.startMusicCountdown()
    );

    // export mapping
    music.audio.addEventListener("ended", () => {
      console.log(this.#context.notes);
    });
  };

  mapperUpdateLoop = (dt) => {
    const input = this.getGamepadInput();
    const { currentMusic, play, lanes } = this.#context;

    // update countdown
    this.#context.startCountdown = Math.max(
      0,
      this.#context.startCountdown - dt
    );

    // update lanes - ds4 mapping
    this.#context.lanes[0].pressed = input[6] || input[0]; // l2 || ✕
    this.#context.lanes[1].pressed = input[4] || input[1]; // l1 || ◯
    this.#context.lanes[2].pressed = input[5] || input[3]; // r1 || △
    this.#context.lanes[3].pressed = input[7] || input[2]; // r2 || ☐

    // create note
    const time = Date.now() - currentMusic.start;
    if (play) {
      for (const index in lanes) {
        const lane = lanes[index];
        if (lane.pressed) {
          currentMusic.appendNote(new Note(time, Number(index), currentMusic));
          // console.log('new note ' + newNote + ' #notes ' + String(this.#context.notes.length))
        }
      }
    }
  };

  mapperDrawLoop = (dt) => {
    const { ctx } = this.#engine;
    const [canvasWidth, canvasHeight] = [ctx.canvas.width, ctx.canvas.height];
    const laneHeight = canvasHeight * 0.9;
    const { currentMusic, startCountdown, lanes } = this.#context;

    this.drawBg();

    // lanes
    for (const index in lanes) {
      lanes[index].draw(ctx, index, laneHeight);
    }

    // notes
    for (const note of currentMusic.mapping) {
      const offset = Date.now() - (currentMusic.start + note.time);
      if (offset <= 2 * canvasHeight) {
        note.drawReverse(ctx, laneHeight, this.spd, this.acceptance);
      }
    }

    // buttons
    this.drawButton(this.#engine.assets["cross"], 0, laneHeight);
    this.drawButton(this.#engine.assets["circle"], 1, laneHeight);
    this.drawButton(this.#engine.assets["triangle"], 2, laneHeight);
    this.drawButton(this.#engine.assets["square"], 3, laneHeight);

    // countdown
    if (startCountdown > 0) {
      this.drawCountdown();
    }
  };
}

const game = new Game(
  "Dominic_Ninmark-Super_Mario_Sunshine_-_Delfino_Plaza",
  15,
  0.5,
  false
);
