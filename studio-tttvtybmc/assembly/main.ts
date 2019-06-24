import "allocator/arena";
export { memory };

import { context, storage, near } from "./near";

// --- contract code goes below

function airdropKey(address: string): string {
  return "airdrops:" + address;
}

function balanceKey(address: string): string {
  return "balances:" + address;
}

function approvedKey(from: string, to: string): string {
  return "approved:" + from + ":" +  to;
}

let AIRDROP_AMOUNT: u64 = 1000;
let MAX_SUPPLY: u64 = 100000;
let TOTAL_SUPPLY_KEY = "supply"

export function airdrop(to: string): u64 {
  // check we did not reach total supply
  let supply = storage.getU64(TOTAL_SUPPLY_KEY) + AIRDROP_AMOUNT
  assert(supply <= MAX_SUPPLY, "No more tokens to airdrop");

  // check that this account has not received an airdrop yet
  let key = airdropKey(to);
  assert(storage.get<boolean>(airdropKey(to), false) == false, "Already initialized token supply");

  // execute  
  let balance = storage.getU64(balanceKey(to)) + AIRDROP_AMOUNT;

  storage.setU64(TOTAL_SUPPLY_KEY, supply);
  storage.setU64(balanceKey(to), balance);
  storage.set<boolean>(key, true);

  near.log("balance after airdrop: " + balance.toString());

  return balance;
}

export function balanceOf(tokenOwner: string): u64 {
  let ownerKey = balanceKey(tokenOwner);
  near.log("balanceOf: " + tokenOwner);
  let result = storage.getU64(ownerKey);
  near.log("result: " + result.toString());
  return result;
}

export function allowance(tokenOwner: string, spender: string): u64 {
  let spenderKey = approvedKey(tokenOwner, spender);
  return storage.getU64(spenderKey);
}

export function transfer(to: string, tokens: u64): boolean {
  near.log("transfer: " + to + " tokens: " + tokens.toString());
  let fromKey = balanceKey(context.sender);
  let toKey = balanceKey(to);
  near.log("from: " + fromKey + " to: " + toKey);
  let fromAmount = storage.getU64(fromKey);
  assert(fromAmount >= tokens, "not enough tokens on account");
  storage.setU64(fromKey, fromAmount - tokens);
  storage.setU64(toKey, storage.getU64(toKey) + tokens);
  return true;
}

export function approve(spender: string, tokens: u64): boolean {
  let spenderKey = approvedKey(context.sender, spender);
  storage.setU64(spenderKey, tokens);
  return true;
}

export function transferFrom(from: string, to: string, tokens: u64): boolean {
  let fromKey = balanceKey(from);
  let toKey = balanceKey(to);
  let spenderKey = approvedKey(context.sender, to);
  let fromAmount = storage.getU64(fromKey);
  assert(fromAmount >= tokens, "not enough tokens on account");
  storage.setU64(fromKey, fromAmount - tokens);
  let approvedAmount = storage.getU64(spenderKey)
  assert(fromAmount >= tokens, "not enough tokens approved");
  storage.setU64(spenderKey, approvedAmount - tokens);
  storage.setU64(toKey, storage.getU64(toKey) + tokens);
  return true;
}
