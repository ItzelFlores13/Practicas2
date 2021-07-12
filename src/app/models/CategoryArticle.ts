import { Modify } from '../utilities/InterfaceUtilities';

export interface CategoryArticleParams {
    id: number;
    nombre:string;
    id_sucursal:number;
    
}
export interface CategoryArticleProps extends Modify<CategoryArticleParams, {
}> {}

export class CategoryArticle {

  private _props: Partial<CategoryArticleProps> = {}; 
    
  constructor(params?: CategoryArticleParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }

  get id() { return this._props.id}
  get nombre() { return this._props.nombre}
  get id_sucursal() { return this._props.id_sucursal}
 
  set id(value) {  this._props.id =  value}
  set nombre(value) {  this._props.nombre =  value}
  set id_sucursal(value) {  this._props.id_sucursal =  value}

  initWithParams(params: CategoryArticleParams) {
    Object.assign(this._props, params); 
  }
  
  initEmpty() {
    this._props.id = 0;
    this._props.nombre = "";
  }

}