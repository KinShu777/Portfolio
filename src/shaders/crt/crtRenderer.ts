import { CRT_STYLES, CRT_SCREENS, type CrtStyle, type CrtVariant } from "./crtScreens";
import { CRT_VERTEX_SHADER, CRT_FRAGMENT_SHADER } from "./crtShaders";

export const CRT_VARIANTS = ["terminal", "cinematic", "blue-screen", "nintendo"] as const;

export type CrtOptions = {
  variant: CrtVariant;
  speed: number;
  typeSpeed: number;
  motion: number;
  brightness: number;
  opacity: number;
  hue: number;
  saturation: number;
};

export const CRT_DEFAULTS: CrtOptions = {
  variant: "terminal",
  speed: 1,
  typeSpeed: 1,
  motion: 1,
  brightness: 1,
  opacity: 1,
  hue: 0,
  saturation: 1
};

export const crtStyle = (variant: CrtVariant): CrtStyle => CRT_STYLES[variant] ?? CRT_STYLES.terminal;

type TextSpan = { t: string; c: "p" | "d" | "a" | "h" };
const span = (t: string, c: "p" | "d" | "a" | "h" = "p"): TextSpan => ({ t, c });
const dots = (count: number) => "·".repeat(count);

const TERMINAL_LOG: TextSpan[][] = [
  [span("ZION MAINFRAME  v9.1.1"), span("   (c) 2199 Nebuchadnezzar", "d")],
  [span("CONSTRUCT Broadcast  Rev M  S/N NX-0101-0011", "d")],
  [],
  [span("Hacking Matrix grid nodes "), span(`${dots(14)} `, "d"), span("OK", "a")],
  [span("Neural Jack  0x000-0x0FF "), span(`${dots(11)} `, "d"), span("ONLINE "), span("OK", "a")],
  [span("Pinging agent signatures "), span(`${dots(6)} `, "d"), span("3 found")],
  [span("nav0  OPERATOR UPLINK SECURE ", "d"), span(`${dots(6)} `, "d"), span("READY", "a")],
  [span("vis0  CODE RAIN DECRYPT 256bit ", "d"), span("READY", "a")],
  [span("net0  HARDLINE CONNECTION MAX ", "d"), span(`${dots(4)} `, "d"), span("LINK", "a")],
  [span("red0  RED PILL EXTRACTION ", "d"), span(`${dots(4)} `, "d"), span("READY", "a")],
  [span("Mounting /dev/mind -> ROOT: "), span(`${dots(6)} `, "d"), span("OK", "a")],
  [span("Loading weapon training program "), span(`${dots(4)} `, "d"), span("OK", "a")],
  [span("Starting [ jmp spd str wpn ] "), span(`${dots(4)} `, "d"), span("OK", "a")],
  [span("Locating the Oracle sector "), span(`${dots(6)} `, "d"), span("99.9%")],
  [],
  [span("SYSTEM ANOMALY  "), span("detected.", "h")],
  [span("subject Thomas A. Anderson   status asleep ", "d"), span("z", "d"), span("Z", "d")],
  [],
  [span("wake up: ")]
];

const TERMINAL_PALETTE: Record<"p" | "d" | "a" | "h", { fill: string; glow: string }> = {
  p: { fill: "#8df0b4", glow: "rgba(28,236,132,0.95)" },
  d: { fill: "#4f9a76", glow: "rgba(28,236,132,0.45)" },
  a: { fill: "#ffba5e", glow: "rgba(255,150,52,0.95)" },
  h: { fill: "#eafff3", glow: "rgba(120,255,190,0.95)" }
};

const lineLength = (line: TextSpan[]) => line.reduce((acc, s) => acc + s.t.length, 0);
const TOTAL_TERMINAL_CHARS = TERMINAL_LOG.reduce((acc, l) => acc + lineLength(l), 0);
const MAX_LINE_CHARS = Math.max(...TERMINAL_LOG.map(lineLength));

const MAX_WIDTH = 1920;
const MIN_WIDTH = 640;
const MAX_PIXELS = 24e5;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const s = gl.createShader(type);
  if (!s) throw new Error("Unable to create CRT shader");
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) ?? "CRT shader compilation failed");
  }
  return s;
}

export function createCrtRenderer(
  host: HTMLElement,
  canvas: HTMLCanvasElement,
  getOptions: () => CrtOptions
) {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    depth: false,
    premultipliedAlpha: false
  });
  if (!gl) throw new Error("CRT requires WebGL");

  const textCanvas = document.createElement("canvas");
  const textCtx = textCanvas.getContext("2d");
  if (!textCtx) throw new Error("CRT text canvas unavailable");

  const vertShader = compileShader(gl, gl.VERTEX_SHADER, CRT_VERTEX_SHADER);
  const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, CRT_FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error("Unable to create CRT program");
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "CRT link failed");
  }
  gl.useProgram(program);

  // Full-screen triangle buffer
  const quadBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uTex = u("uTex");
  const uRes = u("uRes");
  const uTime = u("uTime");
  const uMotion = u("uMotion");
  const uCurve = u("uCurve");
  const uScan = u("uScan");
  const uScanDepth = u("uScanDepth");
  const uTriad = u("uTriad");
  const uGrille = u("uGrille");
  const uChroma = u("uChroma");
  const uBar = u("uBar");
  const uFlicker = u("uFlicker");
  const uGrain = u("uGrain");
  const uNoise = u("uNoise");
  const uVignette = u("uVignette");
  const uMono = u("uMono");
  const uGain = u("uGain");
  const uHalo = u("uHalo");
  const uSheen = u("uSheen");
  const uRoom = u("uRoom");

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(uTex, 0);

  let surfaceW = 1;
  let surfaceH = 1;
  let hostW = 1;
  let hostH = 1;
  let fontSize = 14;
  let lineHeight = 20;
  let topMargin = 0;
  let charWidth = 8;
  let cursorX = 0;
  let cursorY = 0;
  let charCounter = 0;
  let typingDone = false;
  let needsUpload = true;
  let lastRedrawMs = 0;
  let lastRevealedChars = -1;
  let lastBlink = -1;
  let activeVariant: CrtVariant = "terminal";
  let activeStyle = crtStyle(activeVariant);

  const startTime = performance.now();

  const applyStyleUniforms = () => {
    gl.useProgram(program);
    gl.uniform2f(uCurve, activeStyle.curve[0], activeStyle.curve[1]);
    gl.uniform1f(uScanDepth, activeStyle.scanDepth);
    gl.uniform1f(uGrille, activeStyle.grille);
    gl.uniform1f(uChroma, activeStyle.chroma);
    gl.uniform1f(uBar, activeStyle.bar);
    gl.uniform1f(uFlicker, activeStyle.flicker);
    gl.uniform1f(uGrain, activeStyle.grain);
    gl.uniform1f(uNoise, activeStyle.noise);
    gl.uniform1f(uVignette, activeStyle.vignette);
    gl.uniform1f(uMono, activeStyle.mono);
    gl.uniform1f(uGain, activeStyle.gain);
    gl.uniform1f(uHalo, activeStyle.halo);
    gl.uniform3f(uSheen, activeStyle.sheen[0], activeStyle.sheen[1], activeStyle.sheen[2]);
    gl.uniform3f(uRoom, activeStyle.room[0], activeStyle.room[1], activeStyle.room[2]);

    const filter = activeStyle.filtering === "nearest" ? gl.NEAREST : gl.LINEAR;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  };

  const measureTerminal = () => {
    topMargin = surfaceH * 0.135;
    lineHeight = (surfaceH * 0.74) / TERMINAL_LOG.length;
    fontSize = Math.max(5, Math.min(lineHeight * 0.8, (surfaceW * 0.88) / (Math.max(MAX_LINE_CHARS, 1) * 0.62)));
    textCtx.font = `600 ${fontSize.toFixed(2)}px ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;
    charWidth = textCtx.measureText("M").width || fontSize * 0.6;
  };

  const setSpanStyle = (colorType: "p" | "d" | "a" | "h", glow: boolean) => {
    const pal = TERMINAL_PALETTE[colorType];
    textCtx.fillStyle = pal.fill;
    textCtx.shadowColor = glow ? pal.glow : "transparent";
    textCtx.shadowBlur = glow ? fontSize * 0.38 : 0;
  };

  const drawTerminal = (revealCount: number) => {
    textCtx.setTransform(1, 0, 0, 1, 0, 0);
    textCtx.fillStyle = "#03100a";
    textCtx.fillRect(0, 0, surfaceW, surfaceH);
    textCtx.textAlign = "left";
    textCtx.textBaseline = "top";
    textCtx.font = `600 ${fontSize.toFixed(2)}px ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace`;

    let remaining = revealCount;
    let curY = topMargin;
    cursorX = Math.floor((surfaceW - MAX_LINE_CHARS * charWidth) / 2);
    cursorY = topMargin;

    for (const line of TERMINAL_LOG) {
      const len = lineLength(line);
      const charsToDraw = revealCount === Infinity ? Infinity : Math.min(remaining, len);
      let curX = Math.floor((surfaceW - MAX_LINE_CHARS * charWidth) / 2);
      let drawnInLine = 0;

      for (const sp of line) {
        let text = sp.t;
        if (charsToDraw !== Infinity) {
          const avail = charsToDraw - drawnInLine;
          if (avail <= 0) break;
          if (avail < text.length) text = text.slice(0, avail);
        }
        if (text.length) {
          setSpanStyle(sp.c, true);
          textCtx.fillText(text, curX, curY);
          setSpanStyle(sp.c, false);
          textCtx.fillText(text, curX, curY);
          curX += charWidth * text.length;
        }
        drawnInLine += sp.t.length;
        if (charsToDraw !== Infinity && drawnInLine >= charsToDraw) break;
      }

      cursorX = curX;
      cursorY = curY;
      if (charsToDraw !== Infinity) remaining -= charsToDraw;
      curY += lineHeight;
      if (charsToDraw !== Infinity && remaining <= 0) break;
    }
  };

  const drawCursor = () => {
    textCtx.shadowColor = TERMINAL_PALETTE.p.glow;
    textCtx.shadowBlur = fontSize * 0.42;
    textCtx.fillStyle = "#bdf8d2";
    textCtx.fillRect(cursorX, cursorY + fontSize * 0.06, Math.max(charWidth * 0.92, 4), fontSize * 0.96);
    textCtx.shadowBlur = 0;
    textCtx.fillRect(cursorX, cursorY + fontSize * 0.06, Math.max(charWidth * 0.92, 4), fontSize * 0.96);
  };

  const uploadTexture = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    needsUpload = false;
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    hostW = Math.max(1, rect.width);
    hostH = Math.max(1, rect.height);
    const dpr = Math.min(typeof window === "undefined" ? 1 : window.devicePixelRatio || 1, 2);

    let rw = Math.max(MIN_WIDTH, Math.round(Math.min(hostW * dpr, MAX_WIDTH)));
    let rh = Math.max(1, Math.round((rw * hostH) / hostW));
    if (rw * rh > MAX_PIXELS) {
      const scale = Math.sqrt(MAX_PIXELS / (rw * rh));
      rw = Math.round(rw * scale);
      rh = Math.round(rh * scale);
    }

    const surf = activeStyle.surface;
    const targetW = surf.mode === "fixed" ? surf.width : surf.mode === "cap" ? Math.min(rw, surf.width) : rw;
    const targetH = surf.mode === "fixed" ? surf.height : Math.max(1, Math.round((targetW * rh) / rw));

    if (canvas.width !== rw || canvas.height !== rh) {
      canvas.width = rw;
      canvas.height = rh;
    }

    if (textCanvas.width !== targetW || textCanvas.height !== targetH) {
      textCanvas.width = targetW;
      textCanvas.height = targetH;
      surfaceW = targetW;
      surfaceH = targetH;
      measureTerminal();
      lastRevealedChars = -1;
      lastBlink = -1;
      lastRedrawMs = 0;
      needsUpload = true;
    }

    gl.useProgram(program);
    gl.viewport(0, 0, rw, rh);
    gl.uniform2f(uRes, rw, rh);
    gl.uniform1f(uScan, Math.max(120, Math.min(hostH * activeStyle.scanDensity, 900)));
    gl.uniform1f(uTriad, Math.max(2, (activeStyle.triadCss * rw) / hostW));
  };

  const updateTerminal = (now: number) => {
    const count = typingDone ? Infinity : Math.floor(charCounter);
    const blink = Math.floor((now - startTime) / 420) % 2 === 0 ? 1 : 0;
    const dirty = typingDone ? blink !== lastBlink : now - lastRedrawMs > 42;

    if (
      (count === lastRevealedChars && blink === lastBlink && !dirty) ||
      (!typingDone && now - lastRedrawMs <= 42 && count === lastRevealedChars && blink === lastBlink)
    ) {
      return;
    }

    drawTerminal(count);
    if (blink) drawCursor();
    lastRedrawMs = now;
    lastRevealedChars = count;
    lastBlink = blink;
    needsUpload = true;
  };

  applyStyleUniforms();

  return {
    resize,
    render(now: number) {
      const opts = getOptions();
      const variant = CRT_STYLES[opts.variant] ? opts.variant : "terminal";
      if (variant !== activeVariant) {
        activeVariant = variant;
        activeStyle = crtStyle(activeVariant);
        applyStyleUniforms();
        charCounter = 0;
        typingDone = false;
        lastRevealedChars = -1;
        lastBlink = -1;
        lastRedrawMs = 0;
        resize();
      }

      const elapsed = (now - startTime) * 1e-3 * opts.speed;

      if (activeVariant === "terminal") {
        if (!typingDone) {
          charCounter += 4.4 * opts.typeSpeed;
          if (charCounter >= TOTAL_TERMINAL_CHARS) {
            charCounter = TOTAL_TERMINAL_CHARS;
            typingDone = true;
          }
        }
        updateTerminal(now);
      } else {
        if (now - lastRedrawMs >= activeStyle.redrawMs || needsUpload) {
          CRT_SCREENS[activeVariant](textCtx, surfaceW, surfaceH, elapsed);
          lastRedrawMs = now;
          needsUpload = true;
        }
      }

      if (needsUpload) uploadTexture();

      gl.useProgram(program);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uMotion, opts.motion);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.deleteBuffer(quadBuf);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    }
  };
}
