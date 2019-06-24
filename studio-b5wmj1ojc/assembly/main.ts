import "allocator/arena";
export { memory };

import { context, storage, near, ContractPromise } from "./near";
import { Cell, RGB, Point, TransferArgs, ContinueArgs } from "./model.near";

// --- contract code goes below

let ERC20_CONTRACT: string = "studio-tttvtybmc";

export function setCoords(point: Point, value: RGB): void {
  // load cell
  let cell = getCell(point);
  let sender = context.sender;

  // pay
  let args: TransferArgs = {tokens: cell.price, from: sender, to: cell.owner}
  let promise = ContractPromise.create(ERC20_CONTRACT, "transferFrom", args.encode(), 1);

  // update
  cell.rgb = value;
  cell.price *= 2;
  cell.owner = sender;

  // callback to do the update
  let args2: ContinueArgs = {point: point, cell: cell}
  promise = promise.then("continueSetCoords", args2.encode(), 1);

  promise.returnAsResult();
}

// needs to be exported to used as a callback
export function continueSetCoords(point: Point, cell: Cell): Cell {
  // TODO have something really safe
  // please near protocol, improve the contract promise API
  // protect from external call
  assert(context.sender == ERC20_CONTRACT, "dont call this contract")

  let results = ContractPromise.getResults();

  // verify everything was alright
  for (let i=0; i<results.length; i++) {
    assert(results[i].success, "Transfer failed");
  }

  storage.setBytes(format(point), cell.encode());
  return cell;
}

// not used
export function getCoords(point: Point): Cell {
  return getCell(point);
}

export function getMap(): Cell[] {
  let num_rows = 10;
  let num_cols = 10;
  let total_cells = num_rows * num_cols;
  var arrResult:Cell[] = new Array(total_cells);
  let i = 0;
  for (let row=0; row<num_rows; row++) {
    for (let col=0; col<num_cols; col++) {
      arrResult[i] = getCell({x:row, y:col});
      i++;
    }
  }
  return arrResult;
}

function key(x: u32, y: u32): string {
  return near.str(x) + "," + near.str(y)
}

function format(point: Point): string {
  return near.str(point.x) + "," + near.str(point.y)
}

function getCell(point: Point): Cell {
  let raw = storage.getBytes(format(point));
  if(raw == null) {
    return {
      rgb: {
        r:255,
        g:255,
        b:255,
        },
      owner: "-",
      price: 1,
    };
  }
  else {
    let cell = Cell.decode(raw);
    return cell;
  }
}