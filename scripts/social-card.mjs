import zlib from "node:zlib";

const WIDTH = 1200;
const HEIGHT = 630;

const COLORS = {
  ink: "#06181c",
  paper: "#fdf6e9",
  shell: "#f4ead7",
  reef: "#0b3a3f",
  tide: "#0a6a72",
  kelp: "#13848e",
  coral: "#ec5b3c",
  crab: "#d9472b",
  crabDark: "#7d2613",
  sun: "#f4a93a",
  sand: "#e9d7b1",
};

const FONT = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  0: ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  2: ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  3: ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  4: ["10010", "10010", "10010", "11111", "00010", "00010", "00010"],
  5: ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
  6: ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
  7: ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  8: ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  9: ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
  ".": ["00000", "00000", "00000", "00000", "00000", "01100", "01100"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
  "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
};

export function socialCardPng() {
  const card = new Raster(WIDTH, HEIGHT);
  card.background();

  card.roundRect(68, 66, 680, 498, 30, rgba(COLORS.paper, 0.96));
  card.roundRect(82, 80, 652, 470, 22, rgba("#f7ecd3", 0.94));
  card.rect(82, 532, 652, 16, rgba(COLORS.coral, 1));
  card.rect(82, 516, 424, 16, rgba(COLORS.sun, 1));
  card.rect(506, 516, 228, 16, rgba(COLORS.kelp, 1));

  card.text("OPENCLAW MAINTENANCE BOT", 112, 112, 4, COLORS.coral, 1);
  card.text("CLAW", 110, 166, 22, COLORS.ink, 1);
  card.text("SWEEPER", 112, 330, 14, COLORS.reef, 1);
  card.text("REVIEW APPLY REPAIR COMMIT", 112, 478, 4, COLORS.tide, 0);

  card.roundRect(804, 96, 310, 88, 24, rgba(COLORS.paper, 0.16));
  card.text("FOUR", 838, 128, 6, COLORS.paper, 1);
  card.text("LANES", 1002, 128, 6, COLORS.sun, 1);

  card.roundRect(790, 220, 352, 260, 32, rgba(COLORS.paper, 0.1));
  card.lobster(966, 332, 1.02);

  card.roundRect(806, 506, 318, 52, 18, rgba(COLORS.ink, 0.36));
  card.text("CLAW SWEEP", 846, 522, 5, COLORS.paper, 1);

  card.text("CLAWSWEEPER.BOT", 812, 574, 4, COLORS.sand, 1);
  return encodePng(card.width, card.height, card.data);
}

class Raster {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = Buffer.alloc(width * height * 4);
  }

  background() {
    const top = rgb(COLORS.reef);
    const bottom = rgb(COLORS.ink);
    for (let y = 0; y < this.height; y++) {
      const t = y / (this.height - 1);
      const row = mix(top, bottom, t);
      for (let x = 0; x < this.width; x++) {
        const wave = Math.sin((x + y * 0.8) / 34) * 4 + Math.sin((x - y * 1.4) / 91) * 6;
        const grain = ((x * 17 + y * 31) % 23) - 11;
        this.raw(x, y, row[0] + wave + grain, row[1] + wave * 0.8, row[2] + wave * 0.55, 255);
      }
    }
    for (let y = 0; y < this.height; y += 38)
      this.line(0, y, this.width, y + 110, rgba("#ffffff", 0.025), 2);
    this.circle(1088, 86, 132, rgba(COLORS.coral, 0.13));
    this.circle(1016, 594, 220, rgba(COLORS.tide, 0.2));
    this.circle(760, -40, 180, rgba(COLORS.sun, 0.12));
  }

  lobster(cx, cy, scale) {
    const s = scale;
    const crab = rgba(COLORS.crab, 1);
    const dark = rgba(COLORS.crabDark, 1);
    const ink = rgba(COLORS.ink, 1);
    this.line(cx - 76 * s, cy + 28 * s, cx - 154 * s, cy + 82 * s, dark, 12 * s);
    this.line(cx + 76 * s, cy + 28 * s, cx + 154 * s, cy + 82 * s, dark, 12 * s);
    this.circle(cx - 170 * s, cy + 88 * s, 34 * s, crab);
    this.circle(cx + 170 * s, cy + 88 * s, 34 * s, crab);
    this.circle(cx - 182 * s, cy + 76 * s, 20 * s, crab);
    this.circle(cx + 182 * s, cy + 76 * s, 20 * s, crab);
    this.circle(cx, cy + 38 * s, 88 * s, crab);
    this.ellipse(cx, cy + 30 * s, 98 * s, 64 * s, crab);
    this.line(cx - 54 * s, cy - 22 * s, cx - 54 * s, cy - 58 * s, ink, 4 * s);
    this.line(cx + 54 * s, cy - 22 * s, cx + 54 * s, cy - 58 * s, ink, 4 * s);
    this.circle(cx - 54 * s, cy - 66 * s, 12 * s, rgba(COLORS.paper, 1));
    this.circle(cx + 54 * s, cy - 66 * s, 12 * s, rgba(COLORS.paper, 1));
    this.circle(cx - 50 * s, cy - 66 * s, 4 * s, ink);
    this.circle(cx + 58 * s, cy - 66 * s, 4 * s, ink);
    this.line(cx - 48 * s, cy + 72 * s, cx + 48 * s, cy + 72 * s, rgba(COLORS.paper, 0.45), 4 * s);
    this.line(cx - 24 * s, cy + 95 * s, cx + 24 * s, cy + 95 * s, ink, 4 * s);

    for (const dir of [-1, 1]) {
      this.line(cx + dir * 62 * s, cy + 85 * s, cx + dir * 120 * s, cy + 150 * s, ink, 6 * s);
      this.line(cx + dir * 28 * s, cy + 96 * s, cx + dir * 46 * s, cy + 170 * s, ink, 6 * s);
    }
    this.line(cx + 168 * s, cy + 104 * s, cx + 216 * s, cy + 186 * s, rgba("#8a5a2c", 1), 7 * s);
    this.roundRect(cx + 196 * s, cy + 180 * s, 42 * s, 48 * s, 8 * s, rgba(COLORS.sun, 1));
    for (let i = 0; i < 5; i++) {
      this.line(
        cx + (202 + i * 8) * s,
        cy + 188 * s,
        cx + (194 + i * 12) * s,
        cy + 226 * s,
        rgba("#8a5a2c", 1),
        2 * s,
      );
    }
  }

  text(text, x, y, scale, color, gap = 1) {
    let cursor = x;
    for (const char of text.toUpperCase()) {
      const glyph = FONT[char] || FONT[" "];
      for (let gy = 0; gy < glyph.length; gy++) {
        for (let gx = 0; gx < glyph[gy].length; gx++) {
          if (glyph[gy][gx] === "1")
            this.rect(cursor + gx * scale, y + gy * scale, scale, scale, rgba(color, 1));
        }
      }
      cursor += 5 * scale + gap * scale;
    }
  }

  raw(x, y, r, g, b, a) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const i = (Math.floor(y) * this.width + Math.floor(x)) * 4;
    this.data[i] = clamp(r);
    this.data[i + 1] = clamp(g);
    this.data[i + 2] = clamp(b);
    this.data[i + 3] = clamp(a);
  }

  pixel(x, y, color) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const i = (Math.floor(y) * this.width + Math.floor(x)) * 4;
    const a = color[3] / 255;
    this.data[i] = clamp(color[0] * a + this.data[i] * (1 - a));
    this.data[i + 1] = clamp(color[1] * a + this.data[i + 1] * (1 - a));
    this.data[i + 2] = clamp(color[2] * a + this.data[i + 2] * (1 - a));
    this.data[i + 3] = 255;
  }

  rect(x, y, w, h, color) {
    const x0 = Math.max(0, Math.floor(x));
    const y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(this.width, Math.ceil(x + w));
    const y1 = Math.min(this.height, Math.ceil(y + h));
    for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) this.pixel(xx, yy, color);
  }

  roundRect(x, y, w, h, r, color) {
    this.rect(x + r, y, w - 2 * r, h, color);
    this.rect(x, y + r, w, h - 2 * r, color);
    this.circle(x + r, y + r, r, color);
    this.circle(x + w - r, y + r, r, color);
    this.circle(x + r, y + h - r, r, color);
    this.circle(x + w - r, y + h - r, r, color);
  }

  circle(cx, cy, r, color) {
    this.ellipse(cx, cy, r, r, color);
  }

  ellipse(cx, cy, rx, ry, color) {
    const x0 = Math.floor(cx - rx);
    const y0 = Math.floor(cy - ry);
    const x1 = Math.ceil(cx + rx);
    const y1 = Math.ceil(cy + ry);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        if (dx * dx + dy * dy <= 1) this.pixel(x, y, color);
      }
    }
  }

  line(x0, y0, x1, y1, color, width = 1) {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps;
      this.circle(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, width / 2, color);
    }
  }
}

function encodePng(width, height, rgbaData) {
  const stride = width * 4 + 1;
  const raw = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    raw[y * stride] = 0;
    rgbaData.copy(raw, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", Buffer.concat([u32(width), u32(height), Buffer.from([8, 6, 0, 0, 0])])),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function chunk(type, data) {
  const name = Buffer.from(type, "ascii");
  return Buffer.concat([
    u32(data.length),
    name,
    data,
    u32(crc32(Buffer.concat([name, data])) >>> 0),
  ]);
}

function u32(value) {
  const out = Buffer.alloc(4);
  out.writeUInt32BE(value >>> 0);
  return out;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  }
  return crc ^ 0xffffffff;
}

function rgb(hex) {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function rgba(hex, alpha) {
  return [...rgb(hex), Math.round(alpha * 255)];
}

function mix(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}
