
      import { storage, near } from "./near";
      import { JSONEncoder } from "./json/encoder"
      import { JSONDecoder, ThrowingJSONHandler, DecoderState } from "./json/decoder"
      import {airdrop as wrapped_airdrop, balanceOf as wrapped_balanceOf, allowance as wrapped_allowance, transfer as wrapped_transfer, approve as wrapped_approve, transferFrom as wrapped_transferFrom} from "./main";

      // Runtime functions
      @external("env", "return_value")
      declare function return_value(value_len: usize, value_ptr: usize): void;
    
import {context as context,storage as storage,near as near} from "./near";
export class __near_ArgsParser_airdrop extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_airdrop>;
        handledRoot: boolean = false;
      
__near_param_to: String;
setString(name: string, value: String): void {
if (name == "to") {
            this.__near_param_to = <String>value;
            return;
          }

        super.setString(name, value);
      }
setNull(name: string): void {
if (name == "to") {
        this.__near_param_to = <String>null;
        return;
      }

      super.setNull(name);
    }

      pushObject(name: string): bool {
if (!this.handledRoot) {
      assert(name == null);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null);
    }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
export function airdrop(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_airdrop();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_airdrop>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_airdrop(
handler.__near_param_to
);

        let encoder = new JSONEncoder();
      
encoder.setString(null, result.toString());

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}
export class __near_ArgsParser_balanceOf extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_balanceOf>;
        handledRoot: boolean = false;
      
__near_param_tokenOwner: String;
setString(name: string, value: String): void {
if (name == "tokenOwner") {
            this.__near_param_tokenOwner = <String>value;
            return;
          }

        super.setString(name, value);
      }
setNull(name: string): void {
if (name == "tokenOwner") {
        this.__near_param_tokenOwner = <String>null;
        return;
      }

      super.setNull(name);
    }

      pushObject(name: string): bool {
if (!this.handledRoot) {
      assert(name == null);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null);
    }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
export function balanceOf(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_balanceOf();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_balanceOf>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_balanceOf(
handler.__near_param_tokenOwner
);

        let encoder = new JSONEncoder();
      
encoder.setString(null, result.toString());

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}
export class __near_ArgsParser_allowance extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_allowance>;
        handledRoot: boolean = false;
      
__near_param_tokenOwner: String;
__near_param_spender: String;
setString(name: string, value: String): void {
if (name == "tokenOwner") {
            this.__near_param_tokenOwner = <String>value;
            return;
          }
if (name == "spender") {
            this.__near_param_spender = <String>value;
            return;
          }

        super.setString(name, value);
      }
setNull(name: string): void {
if (name == "tokenOwner") {
        this.__near_param_tokenOwner = <String>null;
        return;
      }
if (name == "spender") {
        this.__near_param_spender = <String>null;
        return;
      }

      super.setNull(name);
    }

      pushObject(name: string): bool {
if (!this.handledRoot) {
      assert(name == null);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null);
    }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
export function allowance(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_allowance();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_allowance>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_allowance(
handler.__near_param_tokenOwner,handler.__near_param_spender
);

        let encoder = new JSONEncoder();
      
encoder.setString(null, result.toString());

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}
export class __near_ArgsParser_transfer extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_transfer>;
        handledRoot: boolean = false;
      
__near_param_to: String;
__near_param_tokens: u64;
setString(name: string, value: String): void {
if (name == "to") {
            this.__near_param_to = <String>value;
            return;
          }
if (name == "tokens") {
            this.__near_param_tokens = U64.parseInt(value);
            return;
          }

        super.setString(name, value);
      }
setNull(name: string): void {
if (name == "to") {
        this.__near_param_to = <String>null;
        return;
      }
if (name == "tokens") {
        this.__near_param_tokens = <u64>null;
        return;
      }

      super.setNull(name);
    }

      pushObject(name: string): bool {
if (!this.handledRoot) {
      assert(name == null);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null);
    }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
export function transfer(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_transfer();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_transfer>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_transfer(
handler.__near_param_to,handler.__near_param_tokens
);

        let encoder = new JSONEncoder();
      
encoder.setBoolean(null, result);

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}
export class __near_ArgsParser_approve extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_approve>;
        handledRoot: boolean = false;
      
__near_param_spender: String;
__near_param_tokens: u64;
setString(name: string, value: String): void {
if (name == "spender") {
            this.__near_param_spender = <String>value;
            return;
          }
if (name == "tokens") {
            this.__near_param_tokens = U64.parseInt(value);
            return;
          }

        super.setString(name, value);
      }
setNull(name: string): void {
if (name == "spender") {
        this.__near_param_spender = <String>null;
        return;
      }
if (name == "tokens") {
        this.__near_param_tokens = <u64>null;
        return;
      }

      super.setNull(name);
    }

      pushObject(name: string): bool {
if (!this.handledRoot) {
      assert(name == null);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null);
    }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
export function approve(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_approve();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_approve>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_approve(
handler.__near_param_spender,handler.__near_param_tokens
);

        let encoder = new JSONEncoder();
      
encoder.setBoolean(null, result);

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}
export class __near_ArgsParser_transferFrom extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_transferFrom>;
        handledRoot: boolean = false;
      
__near_param_from: String;
__near_param_to: String;
__near_param_tokens: u64;
setString(name: string, value: String): void {
if (name == "from") {
            this.__near_param_from = <String>value;
            return;
          }
if (name == "to") {
            this.__near_param_to = <String>value;
            return;
          }
if (name == "tokens") {
            this.__near_param_tokens = U64.parseInt(value);
            return;
          }

        super.setString(name, value);
      }
setNull(name: string): void {
if (name == "from") {
        this.__near_param_from = <String>null;
        return;
      }
if (name == "to") {
        this.__near_param_to = <String>null;
        return;
      }
if (name == "tokens") {
        this.__near_param_tokens = <u64>null;
        return;
      }

      super.setNull(name);
    }

      pushObject(name: string): bool {
if (!this.handledRoot) {
      assert(name == null);
      this.handledRoot = true;
      return true;
    } else {
      assert(name != null);
    }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
export function transferFrom(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_transferFrom();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_transferFrom>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_transferFrom(
handler.__near_param_from,handler.__near_param_to,handler.__near_param_tokens
);

        let encoder = new JSONEncoder();
      
encoder.setBoolean(null, result);

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}