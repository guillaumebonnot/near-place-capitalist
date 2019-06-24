
      import { storage, near } from "./near";
      import { JSONEncoder } from "./json/encoder"
      import { JSONDecoder, ThrowingJSONHandler, DecoderState } from "./json/decoder"
      import {setCoords as wrapped_setCoords, continueSetCoords as wrapped_continueSetCoords, getCoords as wrapped_getCoords, getMap as wrapped_getMap} from "./main";

      // Runtime functions
      @external("env", "return_value")
      declare function return_value(value_len: usize, value_ptr: usize): void;
    
import {context as context,storage as storage,near as near,ContractPromise as ContractPromise} from "./near";
import {Cell as Cell,RGB as RGB,Point as Point,TransferArgs as TransferArgs,ContinueArgs as ContinueArgs} from "./model.near";
import { __near_decode_Point } from "./model.near";
import { __near_decode_RGB } from "./model.near";
export class __near_ArgsParser_setCoords extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_setCoords>;
        handledRoot: boolean = false;
      
__near_param_point: Point;
__near_param_value: RGB;
setNull(name: string): void {
if (name == "point") {
        this.__near_param_point = <Point>null;
        return;
      }
if (name == "value") {
        this.__near_param_value = <RGB>null;
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
          this.__near_param_point = <Point>__near_decode_Point(this.buffer, this.decoder.state);
          return false;
        }
if (name == "value") {
          this.__near_param_value = <RGB>__near_decode_RGB(this.buffer, this.decoder.state);
          return false;
        }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
export function setCoords(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_setCoords();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_setCoords>(handler);
      handler.decoder.deserialize(json);
wrapped_setCoords(
handler.__near_param_point,handler.__near_param_value
);
}
import { __near_decode_Cell } from "./model.near";
export class __near_ArgsParser_continueSetCoords extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_continueSetCoords>;
        handledRoot: boolean = false;
      
__near_param_point: Point;
__near_param_cell: Cell;
setNull(name: string): void {
if (name == "point") {
        this.__near_param_point = <Point>null;
        return;
      }
if (name == "cell") {
        this.__near_param_cell = <Cell>null;
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
          this.__near_param_point = <Point>__near_decode_Point(this.buffer, this.decoder.state);
          return false;
        }
if (name == "cell") {
          this.__near_param_cell = <Cell>__near_decode_Cell(this.buffer, this.decoder.state);
          return false;
        }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
import { __near_encode_Cell } from "./model.near";
export function continueSetCoords(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_continueSetCoords();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_continueSetCoords>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_continueSetCoords(
handler.__near_param_point,handler.__near_param_cell
);

        let encoder = new JSONEncoder();
      
if (result != null) {
          encoder.pushObject(null);
          __near_encode_Cell(<Cell>result, encoder);
          encoder.popObject();
        } else {
          encoder.setNull(null);
        }

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}
export class __near_ArgsParser_getCoords extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_getCoords>;
        handledRoot: boolean = false;
      
__near_param_point: Point;
setNull(name: string): void {
if (name == "point") {
        this.__near_param_point = <Point>null;
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
          this.__near_param_point = <Point>__near_decode_Point(this.buffer, this.decoder.state);
          return false;
        }

        return super.pushObject(name);
      }

      pushArray(name: string): bool {

        return super.pushArray(name);
      }
}
export function getCoords(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_getCoords();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_getCoords>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_getCoords(
handler.__near_param_point
);

        let encoder = new JSONEncoder();
      
if (result != null) {
          encoder.pushObject(null);
          __near_encode_Cell(<Cell>result, encoder);
          encoder.popObject();
        } else {
          encoder.setNull(null);
        }

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}
export class __near_ArgsParser_getMap extends ThrowingJSONHandler {
        buffer: Uint8Array;
        decoder: JSONDecoder<__near_ArgsParser_getMap>;
        handledRoot: boolean = false;
      
setNull(name: string): void {

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
export function __near_encode_Array_Cell(
          value: Array<Cell>,
          encoder: JSONEncoder): void {
for (let i = 0; i < value.length; i++) {
if (value[i] != null) {
          encoder.pushObject(null);
          __near_encode_Cell(<Cell>value[i], encoder);
          encoder.popObject();
        } else {
          encoder.setNull(null);
        }
}
}
export function getMap(): void {
      // Reading input bytes.
      let json = storage._internalReadBytes(4, 0, 0);
      let handler = new __near_ArgsParser_getMap();
      handler.buffer = json;
      handler.decoder = new JSONDecoder<__near_ArgsParser_getMap>(handler);
      handler.decoder.deserialize(json);
let result = wrapped_getMap(

);

        let encoder = new JSONEncoder();
      
if (result != null) {
          encoder.pushArray(null);
          __near_encode_Array_Cell(<Array<Cell>>result, encoder);
          encoder.popArray();
        } else {
          encoder.setNull(null);
        }

        let val = encoder.serialize();
        return_value(val.byteLength, val.buffer.data);
      
}