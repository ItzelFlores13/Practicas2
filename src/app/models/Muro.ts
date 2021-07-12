import { Modify } from "../utilities/InterfaceUtilities";
import { TemasMuroParams } from "./TemasMuro";

export interface MuroParams {
    id: number,
    title: string,
    urlImagen: string,
    publicationDate: string,
    publicationNow: boolean,
    tema: number,
    etiquetas: any,
    likesCount: number,
    content: any,
    editor:any
}
export interface MuroProp extends Modify<MuroParams, {
}> { }

export class Muro {

    private _props: Partial<MuroProp> = {};

    constructor(params?: MuroParams) {
        if (params) this.initWithParams(params);
        if (!params) this.initEmpty();
    }
    initWithParams(params: MuroParams) {
        Object.assign(this._props, params);
    }
    initEmpty() {
        this._props.id = 0;
        this._props.title = "";
        this._props.urlImagen = "";
        this._props.publicationDate = "";
        this._props.publicationNow = false;
        this._props.tema =0;
        this._props.etiquetas = [];
        this._props.likesCount = 0;
        this._props.content = [];
        this._props.editor=null;

    }
    get id() { return this._props.id }
    get title() { return this._props.title }
    get urlImagen() { return this._props.urlImagen }
    get publicationDate() { return this._props.publicationDate }
    get publicationNow() { return this._props.publicationNow }
    get tema() { return this._props.tema }
    get etiquetas() { return this._props.etiquetas }
    get likesCount() { return this._props.likesCount }
    get content() { return this._props.content }
    get editor() { return this._props.editor }

    set id(value) { this._props.id = value }
    set title(value) { this._props.title = value }
    set urlImagen(value) { this._props.urlImagen = value }
    set publicationDate(value) { this._props.publicationDate = value }
    set publicationNow(value) { this._props.publicationNow = value }
    set tema(value) { this._props.tema = value }
    set etiquetas(value) { this._props.etiquetas = value }
    set likesCount(value) { this._props.likesCount = value }
    set content(value) { this._props.content = value }
    set editor(value) { this._props.editor = value }

}