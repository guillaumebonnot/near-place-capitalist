// src/main.js

// Loads nearlib and this contract into nearplace scope.
let self = this;
self.nearplace = {};
self.erc20 = {};
self.cells = {};
self.cell = {};

// Quick init promise for contract
window.nearInitPromise = doInitContract().catch(console.error);

async function doInitContract() {
  const config = await nearlib.dev.getConfig();
  console.log("nearConfig", config);
  self.nearplace.near = await nearlib.dev.connect();

  self.nearplace.contract = await self.nearplace.near.loadContract(config.contractName, {
    viewMethods: ["getMap"],
    changeMethods: ["setCoords"],
    sender: nearlib.dev.myAccountId
  });

  loadBoardAndDraw();
  self.nearplace.timedOut = false;
  const timeOutPeriod = 10 * 60 * 1000; // 10 min
  setInterval(() => { self.nearplace.timedOut = true; }, timeOutPeriod);

  // TODO replace the contract address
  self.erc20.contract = await self.nearplace.near.loadContract("studio-tttvtybmc", {
    viewMethods: ["balanceOf"],
    changeMethods: ["airdrop", "transfer"],
    sender: nearlib.dev.myAccountId
  });

  loadWallet()
}

function sleep(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}

// Application code
function loadBoardAndDraw() {
  if (self.nearplace.timedOut) {
    console.log("Please reload to continue");
    return;
  }
  const board = getBoard().then((fullMap) => {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var i = 0;
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        var cell = fullMap[i];
        ctx.fillStyle = rgbToHex(cell.rgb);
        ctx.fillRect(x*10, y*10, 10, 10);
        i++;
      }
    }
  });
}

function getMousepos(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function myCanvasClick(e) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const position = getMousepos(canvas, e);
  const x = Math.floor(position.x/10);
  const y = Math.floor(position.y/10);

  const rgb = document.getElementById('picker').value;
  var hex = "#" + rgb;

  self.cell = { x:x, y:y, price: self.cells[index(x,y)].price}
  console.log(self.cell)
  selectCell(self.cell, hex);
}

async function getBoard() {
  const result = await self.nearplace.contract.getMap({})
  console.log(result);
  self.cells = result;
  return result;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
  return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
}

async function loadWallet() {
  var balance = await self.erc20.contract.balanceOf({tokenOwner: nearlib.dev.myAccountId});
  if(self.erc20.balance == 0) {
    balance = await self.erc20.contract.airdrop({to: nearlib.dev.myAccountId});
  }
  self.erc20.balance = balance;
  updateBalance()
}

function updateBalance() {
  document.getElementById('balance').innerText = self.erc20.balance;
}

function selectCell(cell, hex) {
  // repaint the previously selected cell
  if(self.selected !== undefined) {
    let rgb = self.cells[index(self.selected.x, self.selected.y)].rgb
    paint(self.selected.x, self.selected.y, rgbToHex(rgb))
  }

  let x = cell.x;
  let y = cell.y;
  
  self.selected = { x:x, y:y};

  paint(x, y, hex)

  document.getElementById('cell_x').innerText = cell.x;
  document.getElementById('cell_y').innerText = cell.y;
  document.getElementById('cell_price').innerText = cell.price;
}

function paint(x, y, hex) {  
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = hex;
  ctx.fillRect(x*10, y*10, 10, 10);
}

async function buyCell() {
  let x = self.cell.x;
  let y = self.cell.y;

  const rgb = document.getElementById('picker').value;
  var hex = "#" + rgb;
  
  console.log(x + "," + y, hex);
  let args = {point:{x: x, y: y}, value:hexToRgb(hex)};
  var result = await self.nearplace.contract.setCoords(args);
  let cell = result.lastResult;

  loadWallet()

  console.log(cell);

  self.cells[index(x,y)] = cell;
  self.cell = { x:x, y:y, price: cell.price}
  selectCell(self.cell, rgbToHex(cell.rgb));
}

function index(x,y) {
  return x*10+y;
}