export type CrtVariant = "terminal" | "cinematic" | "blue-screen" | "nintendo";

export type ScreenSurface =
  | { mode: "buffer" }
  | { mode: "cap"; width: number }
  | { mode: "fixed"; width: number; height: number };

export type CrtStyle = {
  curve: readonly [number, number];
  scanDensity: number;
  scanDepth: number;
  triadCss: number;
  grille: number;
  chroma: number;
  bar: number;
  flicker: number;
  grain: number;
  noise: number;
  vignette: number;
  mono: number;
  gain: number;
  halo: number;
  sheen: readonly [number, number, number];
  room: readonly [number, number, number];
  background: string;
  filtering: "linear" | "nearest";
  surface: ScreenSurface;
  redrawMs: number;
};

export const CRT_STYLES: Record<CrtVariant, CrtStyle> = {
  terminal: {
    curve: [0.115, 0.165],
    scanDensity: 0.44,
    scanDepth: 0.3,
    triadCss: 3.2,
    grille: 0.34,
    chroma: 1,
    bar: 0.045,
    flicker: 0.028,
    grain: 0.022,
    noise: 0,
    vignette: 0.58,
    mono: 0,
    gain: 1.34,
    halo: 0.1,
    sheen: [0.55, 1, 0.78],
    room: [0.012, 0.03, 0.022],
    background: "#03100a",
    filtering: "linear",
    surface: { mode: "buffer" },
    redrawMs: 0
  },
  cinematic: {
    curve: [0.085, 0.125],
    scanDensity: 0.4,
    scanDepth: 0.22,
    triadCss: 3.6,
    grille: 0.14,
    chroma: 0.7,
    bar: 0.022,
    flicker: 0.02,
    grain: 0.055,
    noise: 0,
    vignette: 0.74,
    mono: 1,
    gain: 1.16,
    halo: 0.2,
    sheen: [0.86, 0.9, 1],
    room: [0.016, 0.016, 0.018],
    background: "#07070a",
    filtering: "linear",
    surface: { mode: "cap", width: 1280 },
    redrawMs: 33
  },
  "blue-screen": {
    curve: [0.13, 0.18],
    scanDensity: 0.46,
    scanDepth: 0.34,
    triadCss: 3,
    grille: 0.3,
    chroma: 1.9,
    bar: 0.055,
    flicker: 0.042,
    grain: 0.038,
    noise: 1,
    vignette: 0.6,
    mono: 0,
    gain: 1.22,
    halo: 0.16,
    sheen: [0.62, 0.76, 1],
    room: [0.014, 0.02, 0.046],
    background: "#050a24",
    filtering: "linear",
    surface: { mode: "cap", width: 1600 },
    redrawMs: 96
  },
  nintendo: {
    curve: [0.07, 0.1],
    scanDensity: 0.34,
    scanDepth: 0.26,
    triadCss: 3.4,
    grille: 0.2,
    chroma: 0.55,
    bar: 0.018,
    flicker: 0.014,
    grain: 0.014,
    noise: 0,
    vignette: 0.46,
    mono: 0,
    gain: 1.2,
    halo: 0.06,
    sheen: [0.72, 0.84, 1],
    room: [0.02, 0.024, 0.04],
    background: "#0a1030",
    filtering: "nearest",
    surface: { mode: "fixed", width: 320, height: 180 },
    redrawMs: 16
  }
};

export type ScreenPainter = (context: CanvasRenderingContext2D, width: number, height: number, time: number) => void;

const MONO_FONT = 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace';
const SANS_FONT = '"Helvetica Neue", "Inter", Helvetica, Arial, sans-serif';
const padZero = (val: number, len: number = 2) => String(Math.floor(val)).padStart(len, "0");
const CYCLE_COUNT = 8;
const CORNERS = [
  { text: "PICTURE START", corner: "tl" },
  { text: "MONO · ACADEMY", corner: "bl" },
  { text: "REEL 02 OF 04", corner: "br" }
];

function drawCrosshair(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, size * 0.52, 0, Math.PI * 2);
  ctx.stroke();
}

const renderCinematic: ScreenPainter = (ctx, width, height, time) => {
  const marginY = height * 0.112;
  const top = marginY;
  const bottom = height - marginY;
  const frameH = bottom - top;
  const midX = width / 2;
  const midY = top + frameH / 2;
  const radius = frameH * 0.325;
  const cycleTime = (time % CYCLE_COUNT + CYCLE_COUNT) % CYCLE_COUNT;
  const isCountdown = cycleTime < 7;
  const countNum = Math.max(2, 9 - Math.ceil(cycleTime || 1e-4));

  const grad = ctx.createLinearGradient(0, top, 0, bottom);
  grad.addColorStop(0, "#101013");
  grad.addColorStop(0.55, "#08080a");
  grad.addColorStop(1, "#0d0d10");

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(236,236,240,0.20)";
  const spH = frameH / 9;
  const spOffset = (time * spH * 2.4) % spH;
  const spW = width * 0.011;
  const spSegH = spH * 0.34;
  for (let y = top - spH + spOffset; y < bottom + spH; y += spH) {
    ctx.fillRect(width * 0.022, y, spW, spSegH);
    ctx.fillRect(width - width * 0.022 - spW, y, spW, spSegH);
  }

  ctx.strokeStyle = "rgba(238,238,244,0.16)";
  ctx.lineWidth = Math.max(1, height * 16e-4);
  ctx.beginPath();
  ctx.moveTo(midX, top);
  ctx.lineTo(midX, bottom);
  ctx.moveTo(width * 0.06, midY);
  ctx.lineTo(width * 0.94, midY);
  ctx.stroke();

  ctx.strokeStyle = "rgba(238,238,244,0.30)";
  for (const c of ["tl", "tr", "bl", "br"]) {
    const cx = c.endsWith("l") ? width * 0.085 : width * 0.915;
    const cy = c.startsWith("t") ? top + frameH * 0.16 : bottom - frameH * 0.16;
    drawCrosshair(ctx, cx, cy, height * 0.024);
  }

  if (isCountdown) {
    ctx.strokeStyle = "rgba(240,240,246,0.42)";
    ctx.lineWidth = Math.max(1.4, height * 32e-4);
    ctx.beginPath();
    ctx.arc(midX, midY, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(240,240,246,0.22)";
    ctx.beginPath();
    ctx.arc(midX, midY, radius * 0.845, 0, Math.PI * 2);
    ctx.stroke();

    const sweep = (cycleTime % 1) * Math.PI * 2;
    const startAngle = -Math.PI / 2;
    ctx.fillStyle = "rgba(244,244,250,0.085)";
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.arc(midX, midY, radius, startAngle, startAngle + sweep);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(248,248,252,0.70)";
    ctx.lineWidth = Math.max(1.2, height * 26e-4);
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX + Math.cos(startAngle + sweep) * radius, midY + Math.sin(startAngle + sweep) * radius);
    ctx.stroke();

    ctx.strokeStyle = "rgba(238,238,244,0.34)";
    ctx.lineWidth = Math.max(1, height * 2e-3);
    for (let i = 0; i < 12; i += 1) {
      const a = startAngle + (i / 12) * Math.PI * 2;
      const tickInner = i % 3 === 0 ? radius * 1.055 : radius * 1.028;
      ctx.beginPath();
      ctx.moveTo(midX + Math.cos(a) * tickInner, midY + Math.sin(a) * tickInner);
      ctx.lineTo(midX + Math.cos(a) * radius * 1.1, midY + Math.sin(a) * radius * 1.1);
      ctx.stroke();
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(255,255,255,0.55)";
    ctx.shadowBlur = height * 0.03;
    ctx.fillStyle = "#f6f6fa";
    ctx.font = `700 ${(radius * 1.28).toFixed(2)}px ${SANS_FONT}`;
    ctx.fillText(String(countNum), midX, midY + radius * 0.02);
    ctx.shadowBlur = 0;
  } else {
    const flash = Math.max(0, 1 - (cycleTime - 7) / 0.1);
    if (flash > 0) {
      ctx.fillStyle = `rgba(250,250,252,${(flash * 0.62).toFixed(3)})`;
      ctx.fillRect(0, top, width, frameH);
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(244,244,248,0.92)";
    const fontSize = height * 0.052;
    ctx.font = `500 ${fontSize.toFixed(2)}px ${MONO_FONT}`;
    ctx.shadowColor = "rgba(255,255,255,0.45)";
    ctx.shadowBlur = height * 0.02;
    ctx.fillText("T H E   L O N G   Q U I E T", midX, midY - fontSize * 0.78);
    ctx.shadowBlur = 0;
    ctx.font = `400 ${(fontSize * 0.42).toFixed(2)}px ${MONO_FONT}`;
    ctx.fillStyle = "rgba(232,232,238,0.60)";
    ctx.fillText("S C E N E   1 4   ·   T A K E   0 3", midX, midY + fontSize * 0.62);
  }

  const tagSize = height * 0.0255;
  ctx.font = `500 ${tagSize.toFixed(2)}px ${MONO_FONT}`;
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(226,226,232,0.66)";
  for (const item of CORNERS) {
    ctx.textAlign = item.corner.endsWith("l") ? "left" : "right";
    const x = item.corner.endsWith("l") ? width * 0.055 : width * 0.945;
    ctx.fillText(item.text, x, item.corner.startsWith("t") ? top + frameH * 0.055 : bottom - frameH * 0.055);
  }

  const frames = Math.floor(time * 24);
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(240,240,246,0.82)";
  ctx.fillText(
    `01:${padZero((frames / 1440) % 60)}:${padZero((frames / 24) % 60)}:${padZero(frames % 24)}`,
    width * 0.945,
    top + frameH * 0.055
  );

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, marginY);
  ctx.fillRect(0, bottom, width, marginY + 1);
};

const BLUE_SCREEN_LINES = [
  { text: "SIGNAL HALTED", tone: "head" },
  { text: "" },
  { text: "A fault was detected in the video subsystem and the raster" },
  { text: "driver was stopped to prevent damage to the display." },
  { text: "" },
  { text: "*  If this screen appears again, power the unit down and let" },
  { text: "   the flyback transformer discharge before restarting." },
  { text: "" },
  { text: "*  Horizontal deflection module HD-04 reported a bad sync" },
  { text: "   pulse on line 312 of field 2." },
  { text: "" },
  { text: "Technical information:", tone: "bright" },
  { text: "" },
  { text: "***  STOP: 0x0000CA7E  (0x0F13D0C0, 0x00000002, 0xC0000005)" },
  { text: "***  RASTER.SYS  -  address 8C1FA00E  base at 8C1F0000" },
  { text: "" }
];

const renderBlueScreen: ScreenPainter = (ctx, width, height, time) => {
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, "#212ec0");
  grad.addColorStop(0.62, "#1a22a4");
  grad.addColorStop(1, "#141a86");

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  const cols = 62;
  const rows = BLUE_SCREEN_LINES.length + 4;
  const fontSize = Math.min((height * 0.88) / (rows * 1.44), (width * 0.82) / (cols * 0.6));
  ctx.font = `600 ${fontSize.toFixed(2)}px ${MONO_FONT}`;

  const charW = ctx.measureText("M").width || fontSize * 0.6;
  const lineH = fontSize * 1.44;
  const totalW = charW * cols;
  const startX = Math.round((width - totalW) / 2);
  const startY = Math.round((height - rows * lineH) / 2);

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  const headerText = BLUE_SCREEN_LINES[0].text;
  const headerBoxW = charW * (headerText.length + 4);
  ctx.fillStyle = "#e9ecff";
  ctx.fillRect(Math.round((width - headerBoxW) / 2), startY - fontSize * 0.2, headerBoxW, lineH);
  ctx.fillStyle = "#161d92";
  ctx.fillText(headerText, Math.round((width - headerBoxW) / 2) + charW * 2, startY);

  ctx.shadowColor = "rgba(196,214,255,0.55)";
  ctx.shadowBlur = fontSize * 0.3;

  let curY = startY + lineH;
  for (const line of BLUE_SCREEN_LINES.slice(1)) {
    if (line.text) {
      ctx.fillStyle = line.tone === "bright" ? "#ffffff" : line.tone === "dim" ? "#aab6f0" : "#dfe5ff";
      ctx.fillText(line.text, startX, curY);
    }
    curY += lineH;
  }

  const dumpProgress = Math.min(100, Math.floor(((time % 12 + 12) % 12) * 22));
  ctx.fillStyle = "#dfe5ff";
  ctx.fillText(
    dumpProgress >= 100
      ? "Dump of video memory complete."
      : `Beginning dump of video memory: ${padZero(dumpProgress, 2)}%`,
    startX,
    curY
  );
  curY += lineH * 2;

  const promptStr = "Press any key to restart the deflection stage ";
  ctx.fillText(promptStr, startX, curY);
  if (Math.floor(time * 2) % 2 === 0) {
    ctx.fillRect(startX + charW * promptStr.length, curY + fontSize * 0.08, charW * 0.9, fontSize * 0.96);
  }
  ctx.shadowBlur = 0;
};

// Hand-authored 5x7 bitmap font for Nintendo retro console
const FONT_5X7: Record<string, string> = {
  0: ".###.#...##..###.#.###..##...#.###.",
  1: "..#...##....#....#....#....#...###.",
  2: ".###.#...#....#...#...#...#...#####",
  3: "####.....#....#.###.....#....#####.",
  4: "#..#.#..#.#..#.#####...#....#....#.",
  5: "######....####.....#....##...#.###.",
  6: ".###.#....#....####.#...##...#.###.",
  7: "#####....#...#...#...#....#....#...",
  8: ".###.#...##...#.###.#...##...#.###.",
  9: ".###.#...##...#.####....#....#.###.",
  A: ".###.#...##...#######...##...##...#",
  B: "####.#...##...#####.#...##...#####.",
  C: ".#####....#....#....#....#.....####",
  D: "####.#...##...##...##...##...#####.",
  E: "######....#....####.#....#....#####",
  F: "######....#....####.#....#....#....",
  G: ".#####....#....#..###...##...#.####",
  H: "#...##...##...#######...##...##...#",
  I: "#####..#....#....#....#....#..#####",
  J: "....#....#....#....##...##...#.###.",
  K: "#...##..#.#.#..##...#.#..#..#.#...#",
  L: "#....#....#....#....#....#....#####",
  M: "#...###.###.#.##...##...##...##...#",
  N: "#...###..##.#.##..###...##...##...#",
  O: ".###.#...##...##...##...##...#.###.",
  P: "####.#...##...#####.#....#....#....",
  Q: ".###.#...##...##...##.#.##..#..##.#",
  R: "####.#...##...#####.#.#..#..#.#...#",
  S: ".#####....#.....###.....#....#####.",
  T: "#####..#....#....#....#....#....#..",
  U: "#...##...##...##...##...##...#.###.",
  V: "#...##...##...##...##...#.#.#...#..",
  W: "#...##...##...##...##.#.###.###...#",
  X: "#...##...#.#.#...#...#.#.#...##...#",
  Y: "#...##...#.#.#...#....#....#....#..",
  Z: "#####....#...#...#...#...#....#####",
  " ": "...................................",
  "-": "...............#####...............",
  ".": "..........................##...##..",
  ":": "......##...##........##...##.......",
  "!": "..#....#....#....#....#.........#..",
  "?": ".###.#...#....#..##...#.........#..",
  "(": "..##..#....#....#....#....#.....##.",
  ")": ".##.....#....#....#....#....#..##..",
  "/": "....#....#...#...#...#...#....#....",
  "*": ".....#.#.#.###.#####.###.#.#.#.....",
  "'": "..#....#..........................."
};

const FONT_W = 5;
const FONT_H = 7;

function measureText5x7(str: string, scale: number): number {
  return str.length ? (str.length * (FONT_W + 1) - 1) * scale : 0;
}

function drawText5x7(
  ctx: CanvasRenderingContext2D,
  str: string,
  x: number,
  y: number,
  scale: number,
  fill: string
) {
  ctx.fillStyle = fill;
  let curX = x;
  for (const ch of str.toUpperCase()) {
    const glyph = FONT_5X7[ch];
    if (glyph) {
      for (let r = 0; r < FONT_H; r += 1) {
        for (let c = 0; c < FONT_W; c += 1) {
          if (glyph[r * FONT_W + c] === "#") {
            ctx.fillRect(curX + c * scale, y + r * scale, scale, scale);
          }
        }
      }
    }
    curX += (FONT_W + 1) * scale;
  }
}

const RUNNER_PALETTE: Record<string, string> = {
  1: "#1a1028",
  2: "#e0402c",
  3: "#f4f4f4",
  4: "#2ec4e8",
  5: "#22304a"
};

const RUNNER_TORSO = [
  "....111111....",
  "...13333331...",
  "..1333333331..",
  "..1355555531..",
  "..1355555531..",
  "..1333333331..",
  "...13333331...",
  "....111111....",
  "...12222221...",
  ".122222222221.",
  ".124444444421.",
  ".122222222221.",
  "..1222222221.."
];

const RUNNER_LEGS: Record<string, string[]> = {
  a: ["...122..221...", "...122..221...", "..1111..1111.."],
  b: ["..122....221..", ".122......221.", "1111......1111"],
  jump: ["..122....221..", ".1221....1221.", ".111......111."]
};

function drawRunner(ctx: CanvasRenderingContext2D, x: number, y: number, pose: "a" | "b" | "jump") {
  const sprite = [...RUNNER_TORSO, ...RUNNER_LEGS[pose]];
  for (let row = 0; row < sprite.length; row += 1) {
    const line = sprite[row];
    for (let col = 0; col < line.length; col += 1) {
      const color = RUNNER_PALETTE[line[col]];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x + col, y + row, 1, 1);
      }
    }
  }
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.fillStyle = "#f4f8ff";
  const puffs = [
    [0, 4, 22, 6],
    [4, 1, 14, 4],
    [11, 2, 12, 5],
    [2, 8, 20, 3]
  ];
  for (const [px, py, pw, ph] of puffs) {
    ctx.fillRect(Math.round(x + px * scale), Math.round(y + py * scale), Math.round(pw * scale), Math.round(ph * scale));
  }
}

function drawHill(ctx: CanvasRenderingContext2D, cx: number, baseY: number, steps: number, fill: string) {
  ctx.fillStyle = fill;
  for (let s = 0; s < steps; s += 1) {
    const width = (steps - s) * 4;
    ctx.fillRect(Math.round(cx - width / 2), baseY - (s + 1) * 3, width, 3);
  }
}

const NINTENDO_LOOP_SECONDS = 10;
const BLOCK_POSITIONS = [118, 208];
const GROUND_Y = 154;
const JUMP_WINDOW = 50;
const JUMP_HEIGHT = 22;

function drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#20140c";
  ctx.fillRect(x, y, 16, 16);
  ctx.fillStyle = "#d8902c";
  ctx.fillRect(x + 1, y + 1, 14, 14);
  ctx.fillStyle = "#f0c060";
  ctx.fillRect(x + 1, y + 1, 14, 3);
  ctx.fillStyle = "#8a5414";
  ctx.fillRect(x + 1, y + 11, 14, 3);
  ctx.fillStyle = "#20140c";
  ctx.fillRect(x + 6, y + 5, 4, 2);
  ctx.fillRect(x + 5, y + 7, 6, 2);
  ctx.fillRect(x + 6, y + 9, 4, 2);
}

function drawCoin(ctx: CanvasRenderingContext2D, cx: number, cy: number, frame: number) {
  const widthByFrame = [8, 6, 2, 6][frame];
  const halfW = widthByFrame / 2;
  const inset = widthByFrame > 3 ? 1 : 0;
  ctx.fillStyle = "#20140c";
  ctx.fillRect(cx - halfW - 1, cy + 1, widthByFrame + 2, 8);
  ctx.fillRect(cx - halfW, cy - 1, widthByFrame, 12);
  ctx.fillStyle = "#ffe070";
  ctx.fillRect(cx - halfW, cy + 1, widthByFrame, 8);
  ctx.fillRect(cx - halfW + inset, cy, widthByFrame - inset * 2, 10);
  ctx.fillStyle = "#fff8c8";
  ctx.fillRect(cx - halfW + inset, cy + 2, Math.max(1, halfW - inset), 4);
}

const renderNintendo: ScreenPainter = (ctx, width, height, time) => {
  const groundY = GROUND_Y;
  const loopT = (time % NINTENDO_LOOP_SECONDS + NINTENDO_LOOP_SECONDS) % NINTENDO_LOOP_SECONDS;

  const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
  skyGrad.addColorStop(0, "#2440b8");
  skyGrad.addColorStop(0.55, "#5c94fc");
  skyGrad.addColorStop(1, "#9ecbff");

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // Distant stars / sky sparkle
  for (let s = 0; s < 22; s += 1) {
    const sx = (s * 61) % width;
    const sy = 2 + ((s * 29) % 16);
    ctx.fillStyle = (s + Math.floor(time * 3)) % 5 === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.30)";
    ctx.fillRect(sx, sy, 1, 1);
  }

  // Scrolling clouds
  for (const [speed, cy, scale] of [
    [6, 18, 1.25],
    [3.5, 32, 0.85]
  ]) {
    const span = width + 80;
    for (let u = 0; u < 3; u += 1) {
      drawCloud(ctx, (time * speed + (u * span) / 3) % span - 50, cy + (u % 2) * 5, scale);
    }
  }

  // Hills
  drawHill(ctx, 48, groundY, 9, "#2f7a3a");
  drawHill(ctx, 268, groundY, 11, "#2f7a3a");
  drawHill(ctx, 160, groundY, 6, "#3e9a48");

  // Ground platform
  ctx.fillStyle = "#3ca03c";
  ctx.fillRect(0, groundY, width, 4);
  ctx.fillStyle = "#2c7a2c";
  ctx.fillRect(0, groundY + 4, width, 2);
  ctx.fillStyle = "#a05a28";
  ctx.fillRect(0, groundY + 6, width, height - groundY - 6);
  ctx.fillStyle = "#7c4018";
  for (let gy = groundY + 6; gy < height; gy += 6) {
    ctx.fillRect(0, gy, width, 1);
    for (let gx = gy % 12 === 0 ? 0 : 6; gx < width; gx += 12) {
      ctx.fillRect(gx, gy, 1, 6);
    }
  }

  // Blocks and spinning coins
  const coinFrame = Math.floor(time * 8) % 4;
  const coinBob = [0, 1, 1, 0][Math.floor(time * 6) % 4];
  for (const bx of BLOCK_POSITIONS) {
    drawBlock(ctx, bx, groundY - 16);
    drawCoin(ctx, bx + 8, groundY - 32 - coinBob, coinFrame);
  }

  // Animated runner with jump over blocks
  const runnerX = Math.round(-24 + (loopT / NINTENDO_LOOP_SECONDS) * (width + 60));
  let jumpY = 0;
  for (const bx of BLOCK_POSITIONS) {
    const rel = (runnerX - (bx - 28)) / JUMP_WINDOW;
    if (rel > 0 && rel < 1) {
      jumpY = Math.max(jumpY, Math.sin(rel * Math.PI) * JUMP_HEIGHT);
    }
  }
  const runnerPose = jumpY > 0.5 ? "jump" : Math.floor(time * 9) % 2 === 0 ? "a" : "b";
  ctx.fillStyle = "rgba(20,16,10,0.20)";
  ctx.fillRect(runnerX + 2, groundY - 1, 10, 2);
  drawRunner(ctx, runnerX, groundY - 16 - Math.round(jumpY), runnerPose);

  // Top retro HUD
  const hudItems: [string, number][] = [
    ["PLAYER-1", 10],
    ["GEMS 0" + (2 + Math.floor(loopT / 4)), 96],
    ["WORLD 1-1", 174],
    ["TIME " + padZero(Math.max(0, 384 - Math.floor(time * 2)) % 1e3, 3), 254]
  ];
  for (const [txt, pos] of hudItems) {
    drawText5x7(ctx, txt, pos, 7, 1, "#141428");
    drawText5x7(ctx, txt, pos, 6, 1, "#ffffff");
  }

  // Title marquee
  const title = "RASTER RUN";
  const titleW = measureText5x7(title, 3);
  const titleX = Math.round((width - titleW) / 2);
  drawText5x7(ctx, title, titleX + 3, 53, 3, "#141028");
  drawText5x7(ctx, title, titleX, 50, 3, "#f8e038");

  // Shimmer band through title
  const shimmerPos = titleX + ((time * 130) % (titleW + 110)) - 55;
  ctx.save();
  ctx.beginPath();
  ctx.rect(shimmerPos, 50, 24, 21);
  ctx.clip();
  drawText5x7(ctx, title, titleX, 50, 3, "#fffce0");
  ctx.restore();

  // Copyright text
  const copyStr = "(C) 1987 THREEUI";
  const copyX = Math.round((width - measureText5x7(copyStr, 1)) / 2);
  drawText5x7(ctx, copyStr, copyX, 79, 1, "#0e1430");
  drawText5x7(ctx, copyStr, copyX, 78, 1, "#dfe8ff");

  // Flashing "PUSH START"
  if (Math.floor(time * 1.6) % 2 === 0) {
    const pushStr = "PUSH START";
    const pushX = Math.round((width - measureText5x7(pushStr, 2)) / 2);
    drawText5x7(ctx, pushStr, pushX + 2, 100, 2, "#141028");
    drawText5x7(ctx, pushStr, pushX, 98, 2, "#ffffff");
  }
};

export const CRT_SCREENS: Record<Exclude<CrtVariant, "terminal">, ScreenPainter> = {
  cinematic: renderCinematic,
  "blue-screen": renderBlueScreen,
  nintendo: renderNintendo
};
