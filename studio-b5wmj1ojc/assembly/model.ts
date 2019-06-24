// assembly/model.ts
export class Cell {
  rgb: RGB;
  price: u64;
  owner: string;
}

export class RGB {
  r: u32;
  g: u32;
  b: u32;
}

export class Point {
  x: u32;
  y: u32;
}

export class TransferArgs {
  from: string;
  to: string;
  tokens: u64;
}

export class ContinueArgs {
  point: Point;
  cell: Cell;
}