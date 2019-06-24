
      import { storage, near } from "./near";
      import { JSONEncoder } from "./json/encoder"
      import { JSONDecoder, ThrowingJSONHandler, DecoderState } from "./json/decoder"
      import {Cell as wrapped_Cell, RGB as wrapped_RGB, Point as wrapped_Point, TransferArgs as wrapped_TransferArgs, ContinueArgs as wrapped_ContinueArgs} from "./model";

      // Runtime functions
      @external("env", "return_value")
      declare function return_value(value_len: usize, value_ptr: usize): void;
    
export function __near_encode_RGB(
          value: wrapped_RGB,
          encoder: JSONEncoder): void {
encoder.setInteger("r", value.r);
encoder.setInteger("g", value.g);
encoder.setInteger("b", value.b);
}
export function __near_encode_Cell(
          value: wrapped_Cell,
          encoder: JSONEncoder): void {
if (value.rgb != null) {
          encoder.pushObject("rgb");
          __near_encode_RGB(<RGB>value.rgb, encoder);
          encoder.popObject();
        } else {
          encoder.setNull("rgb");
        }
encoder.setString("price", value.price.toString());
if (value.owner != null) {
            encoder.setString("owner", value.owner);
          } else {
            encoder.setNull("owner");
          }
}
export class __near_JSONHandler_Cell extends ThrowingJSONHandler {
      buffer: Uint8Array;
      decoder: JSONDecoder<__near_JSONHandler_Cell>;
      handledRoot: boolean = false;
      value: wrapped_Cell;

      constructor(value_: wrapped_Cell) {
        super();
        this.value = value_;
      }
      
setString(name: string, value: String): void {
if (name == "price") {
            this.value.price = U64.parseInt(value);
            return;
          }
if (name == "owner") {
            this.value.owner = <String>value;
            return;
          }

        super.setString(name, value);
      }
setNull(name: string): void {
if (name == "rgb") {
        this.value.rgb = <wrapped_RGB>null;
        return;
      }
if (name == "price") {
        this.value.price = <u64>null;
        return;
      }
if (name == "owner") {
        this.value.owner = <String>null;
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
if (name == "rgb") {
          this.value.rgb = <RGB>__near_decode_RGB(this.buffer, this.decoder.state);
          return false;
        }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}

export class __near_JSONHandler_RGB extends ThrowingJSONHandler {
      buffer: Uint8Array;
      decoder: JSONDecoder<__near_JSONHandler_RGB>;
      handledRoot: boolean = false;
      value: wrapped_RGB;

      constructor(value_: wrapped_RGB) {
        super();
        this.value = value_;
      }
      
setInteger(name: string, value: i64): void {
if (name == "r") {
            this.value.r = <u32>value;
            return;
          }
if (name == "g") {
            this.value.g = <u32>value;
            return;
          }
if (name == "b") {
            this.value.b = <u32>value;
            return;
          }

        super.setInteger(name, value);
      }
setNull(name: string): void {
if (name == "r") {
        this.value.r = <u32>null;
        return;
      }
if (name == "g") {
        this.value.g = <u32>null;
        return;
      }
if (name == "b") {
        this.value.b = <u32>null;
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

export function __near_decode_RGB(
        buffer: Uint8Array, state: DecoderState, value: wrapped_RGB = null):wrapped_RGB {
      if (value == null) {
        value = new wrapped_RGB();
      }
      let handler = new __near_JSONHandler_RGB(value);
      handler.buffer = buffer;
      handler.decoder = new JSONDecoder<__near_JSONHandler_RGB>(handler);
      handler.decoder.deserialize(buffer, state);
      return value;
    }

export function __near_decode_Cell(
        buffer: Uint8Array, state: DecoderState, value: wrapped_Cell = null):wrapped_Cell {
      if (value == null) {
        value = new wrapped_Cell();
      }
      let handler = new __near_JSONHandler_Cell(value);
      handler.buffer = buffer;
      handler.decoder = new JSONDecoder<__near_JSONHandler_Cell>(handler);
      handler.decoder.deserialize(buffer, state);
      return value;
    }

export function __near_encode_Point(
          value: wrapped_Point,
          encoder: JSONEncoder): void {
encoder.setInteger("x", value.x);
encoder.setInteger("y", value.y);
}
export class __near_JSONHandler_Point extends ThrowingJSONHandler {
      buffer: Uint8Array;
      decoder: JSONDecoder<__near_JSONHandler_Point>;
      handledRoot: boolean = false;
      value: wrapped_Point;

      constructor(value_: wrapped_Point) {
        super();
        this.value = value_;
      }
      
setInteger(name: string, value: i64): void {
if (name == "x") {
            this.value.x = <u32>value;
            return;
          }
if (name == "y") {
            this.value.y = <u32>value;
            return;
          }

        super.setInteger(name, value);
      }
setNull(name: string): void {
if (name == "x") {
        this.value.x = <u32>null;
        return;
      }
if (name == "y") {
        this.value.y = <u32>null;
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

export function __near_decode_Point(
        buffer: Uint8Array, state: DecoderState, value: wrapped_Point = null):wrapped_Point {
      if (value == null) {
        value = new wrapped_Point();
      }
      let handler = new __near_JSONHandler_Point(value);
      handler.buffer = buffer;
      handler.decoder = new JSONDecoder<__near_JSONHandler_Point>(handler);
      handler.decoder.deserialize(buffer, state);
      return value;
    }

export function __near_encode_TransferArgs(
          value: wrapped_TransferArgs,
          encoder: JSONEncoder): void {
if (value.from != null) {
            encoder.setString("from", value.from);
          } else {
            encoder.setNull("from");
          }
if (value.to != null) {
            encoder.setString("to", value.to);
          } else {
            encoder.setNull("to");
          }
encoder.setString("tokens", value.tokens.toString());
}
export class __near_JSONHandler_TransferArgs extends ThrowingJSONHandler {
      buffer: Uint8Array;
      decoder: JSONDecoder<__near_JSONHandler_TransferArgs>;
      handledRoot: boolean = false;
      value: wrapped_TransferArgs;

      constructor(value_: wrapped_TransferArgs) {
        super();
        this.value = value_;
      }
      
setString(name: string, value: String): void {
if (name == "from") {
            this.value.from = <String>value;
            return;
          }
if (name == "to") {
            this.value.to = <String>value;
            return;
          }
if (name == "tokens") {
            this.value.tokens = U64.parseInt(value);
            return;
          }

        super.setString(name, value);
      }
setNull(name: string): void {
if (name == "from") {
        this.value.from = <String>null;
        return;
      }
if (name == "to") {
        this.value.to = <String>null;
        return;
      }
if (name == "tokens") {
        this.value.tokens = <u64>null;
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

export function __near_decode_TransferArgs(
        buffer: Uint8Array, state: DecoderState, value: wrapped_TransferArgs = null):wrapped_TransferArgs {
      if (value == null) {
        value = new wrapped_TransferArgs();
      }
      let handler = new __near_JSONHandler_TransferArgs(value);
      handler.buffer = buffer;
      handler.decoder = new JSONDecoder<__near_JSONHandler_TransferArgs>(handler);
      handler.decoder.deserialize(buffer, state);
      return value;
    }

export function __near_encode_ContinueArgs(
          value: wrapped_ContinueArgs,
          encoder: JSONEncoder): void {
if (value.point != null) {
          encoder.pushObject("point");
          __near_encode_Point(<Point>value.point, encoder);
          encoder.popObject();
        } else {
          encoder.setNull("point");
        }
if (value.cell != null) {
          encoder.pushObject("cell");
          __near_encode_Cell(<Cell>value.cell, encoder);
          encoder.popObject();
        } else {
          encoder.setNull("cell");
        }
}
export class __near_JSONHandler_ContinueArgs extends ThrowingJSONHandler {
      buffer: Uint8Array;
      decoder: JSONDecoder<__near_JSONHandler_ContinueArgs>;
      handledRoot: boolean = false;
      value: wrapped_ContinueArgs;

      constructor(value_: wrapped_ContinueArgs) {
        super();
        this.value = value_;
      }
      
setNull(name: string): void {
if (name == "point") {
        this.value.point = <wrapped_Point>null;
        return;
      }
if (name == "cell") {
        this.value.cell = <wrapped_Cell>null;
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
if (name == "point") {
          this.value.point = <Point>__near_decode_Point(this.buffer, this.decoder.state);
          return false;
        }
if (name == "cell") {
          this.value.cell = <Cell>__near_decode_Cell(this.buffer, this.decoder.state);
          return false;
        }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}

export function __near_decode_ContinueArgs(
        buffer: Uint8Array, state: DecoderState, value: wrapped_ContinueArgs = null):wrapped_ContinueArgs {
      if (value == null) {
        value = new wrapped_ContinueArgs();
      }
      let handler = new __near_JSONHandler_ContinueArgs(value);
      handler.buffer = buffer;
      handler.decoder = new JSONDecoder<__near_JSONHandler_ContinueArgs>(handler);
      handler.decoder.deserialize(buffer, state);
      return value;
    }

export class Cell extends wrapped_Cell {
        static decode(json: Uint8Array): Cell {
          let value = new Cell();
          value.decode(json);
          return value;
        }

        decode(json: Uint8Array): Cell {
          <Cell>__near_decode_Cell(json, null, this);
          return this;
        }

        private _encoder(): JSONEncoder {
          let encoder: JSONEncoder = new JSONEncoder();
          encoder.pushObject(null);
          __near_encode_Cell(<Cell>this, encoder);
          encoder.popObject();
          return encoder;
        }

        encode(): Uint8Array {
          return this._encoder().serialize();
        }

        toString(): string {
          return this._encoder().toString();
        }
      }
export class RGB extends wrapped_RGB {
        static decode(json: Uint8Array): RGB {
          let value = new RGB();
          value.decode(json);
          return value;
        }

        decode(json: Uint8Array): RGB {
          <RGB>__near_decode_RGB(json, null, this);
          return this;
        }

        private _encoder(): JSONEncoder {
          let encoder: JSONEncoder = new JSONEncoder();
          encoder.pushObject(null);
          __near_encode_RGB(<RGB>this, encoder);
          encoder.popObject();
          return encoder;
        }

        encode(): Uint8Array {
          return this._encoder().serialize();
        }

        toString(): string {
          return this._encoder().toString();
        }
      }
export class Point extends wrapped_Point {
        static decode(json: Uint8Array): Point {
          let value = new Point();
          value.decode(json);
          return value;
        }

        decode(json: Uint8Array): Point {
          <Point>__near_decode_Point(json, null, this);
          return this;
        }

        private _encoder(): JSONEncoder {
          let encoder: JSONEncoder = new JSONEncoder();
          encoder.pushObject(null);
          __near_encode_Point(<Point>this, encoder);
          encoder.popObject();
          return encoder;
        }

        encode(): Uint8Array {
          return this._encoder().serialize();
        }

        toString(): string {
          return this._encoder().toString();
        }
      }
export class TransferArgs extends wrapped_TransferArgs {
        static decode(json: Uint8Array): TransferArgs {
          let value = new TransferArgs();
          value.decode(json);
          return value;
        }

        decode(json: Uint8Array): TransferArgs {
          <TransferArgs>__near_decode_TransferArgs(json, null, this);
          return this;
        }

        private _encoder(): JSONEncoder {
          let encoder: JSONEncoder = new JSONEncoder();
          encoder.pushObject(null);
          __near_encode_TransferArgs(<TransferArgs>this, encoder);
          encoder.popObject();
          return encoder;
        }

        encode(): Uint8Array {
          return this._encoder().serialize();
        }

        toString(): string {
          return this._encoder().toString();
        }
      }
export class ContinueArgs extends wrapped_ContinueArgs {
        static decode(json: Uint8Array): ContinueArgs {
          let value = new ContinueArgs();
          value.decode(json);
          return value;
        }

        decode(json: Uint8Array): ContinueArgs {
          <ContinueArgs>__near_decode_ContinueArgs(json, null, this);
          return this;
        }

        private _encoder(): JSONEncoder {
          let encoder: JSONEncoder = new JSONEncoder();
          encoder.pushObject(null);
          __near_encode_ContinueArgs(<ContinueArgs>this, encoder);
          encoder.popObject();
          return encoder;
        }

        encode(): Uint8Array {
          return this._encoder().serialize();
        }

        toString(): string {
          return this._encoder().toString();
        }
      }