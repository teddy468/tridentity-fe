declare interface StringObject {
  [key: string]: string;
}

type BOOLEAN = "true" | "false";

declare interface MixObject {
  [key: string]: any;
}

interface Query {
  [key: string]: string | number | boolean | undefined;
}

type InputAction = "onBlur" | "onChange";

declare interface ResponseError {
  error: { error: string; message: string };
}
