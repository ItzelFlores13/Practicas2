import { Modify } from "../utilities/InterfaceUtilities";

export interface TemasMuroParams {
    id: number,
    nombre: string,
}
export interface TemasProp extends Modify<TemasMuroParams, {
}> { }
export class Temas {

    private _props: Partial<TemasProp> = {};

    constructor(params?: TemasMuroParams) {
        if (params) this.initWithParams(params);
        if (!params) this.initEmpty();
    }
    initWithParams(params: TemasMuroParams) {
        Object.assign(this._props, params);
    }
    initEmpty() {
        this._props.id = 0;
        this._props.nombre = "";

    }
    get id() { return this._props.id }
    set id(value) { this._props.id = value }
    get nombre() { return this._props.nombre }
    set nombre(value) { this._props.nombre = value }

}