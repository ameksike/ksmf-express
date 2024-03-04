export type TFnFingerprint = (cp: any, req?: any, res?: any) => any;
export type TFnMiddleware = (req?: any, res?: any, next?: any) => any;
export type TFnHandler = (req?: any, res?: any, next?: Function) => any;
