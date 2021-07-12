import { fi } from 'date-fns/locale';
import { SelectOption } from '../components/forms/select/select.component';
import { Modify } from '../utilities/InterfaceUtilities';

export interface ArticleToCarParams {
    id: number;
    id_sucursal:number;
    nombre:string;
    foto:any;
    cantidad:number;
    stock_minimo:any;
    precio:number;
    descripcion:string;
    id_categoria:number;
    categoria:string;
    hide:any;
    descuentos:any;
    accumulates_points:any;
    points:number;
    tips:any;
    images:any;
    store_link:any;
    variantes:any;
    tipo_variantes:any;

    varianteSelected:any[];
    uuid:any;
    edited:any;
    precioModificado:any;
    cantidadBuy:number;
    users:any[];
    viewUsers:boolean;
    descuento:any;
    selectOption: SelectOption[];
    

    descuento_producto: any;
    id_tipo_aplicacion_descuento_producto: any;
    descuento_mayoreo: any;
    cantidad_mayoreo: any;
    id_tipo_aplicacion_descuento_mayoreo: any;

    metodo_pago: number;

}
export interface ArticleToCarProps extends Modify<ArticleToCarParams, {
}> {}

export class ArticleToCar {

  private _props: Partial<ArticleToCarProps> = {}; 
    
  constructor(params?: ArticleToCarParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }

  get id() { return this._props.id}
  get id_sucursal() { return this._props.id_sucursal}
  get nombre() { return this._props.nombre}
  get foto() { return this._props.foto}
  get cantidad() { return this._props.cantidad}
  get stock_minimo() { return this._props.stock_minimo}
  get precio() { return this._props.precio /* new Intl.NumberFormat('en-MX',{minimumFractionDigits: 2}).format( this._props.precio ); */}
  get descripcion() { return this._props.descripcion}
  get categoria() { return this._props.categoria}
  get hide() { return this._props.hide}
  get descuentos() { return this._props.descuentos}
  get accumulates_points() { return this._props.accumulates_points}
  get points() { return this._props.points}
  get tips() { return this._props.tips}
  get store_link() { return this._props.store_link}
  get variantes() { return this._props.variantes}
  get tipo_variantes() { return this._props.tipo_variantes}
  get id_categoria() {return this._props.id_categoria}
  get images() {return this._props.images}
  get descuento_producto() {return this._props.descuento_producto}
  get descuento_mayoreo() {return this._props.descuento_mayoreo}
  get id_tipo_aplicacion_descuento_producto() {return this._props.id_tipo_aplicacion_descuento_producto}
  get cantidad_mayoreo() {return this._props.cantidad_mayoreo}
  get id_tipo_aplicacion_descuento_mayoreo() {return this._props.id_tipo_aplicacion_descuento_mayoreo}
  get varianteSelected() {return this._props.varianteSelected}
  get uuid() {return this._props.uuid}
  get edited() {return this._props.edited}
  get precioModificado() {return this._props.precioModificado}
  get cantidadBuy() {return this._props.cantidadBuy}
  get users() {return this._props.users}
  get viewUsers() {return this._props.viewUsers}
  get descuento() {return this._props.descuento}
  get selectOption() {return this._props.selectOption}
  get metodo_pago() {return this._props.metodo_pago}


  set id(value) {  this._props.id = value}
  set id_sucursal(value) {  this._props.id_sucursal = value}
  set nombre(value) {  this._props.nombre = value}
  set foto(value) {  this._props.foto = value}
  set cantidad(value) {  this._props.cantidad = value}
  set stock_minimo(value) {  this._props.stock_minimo = value}
  set precio(value) {  this._props.precio = parseInt(value.toString())}
  set descripcion(value) {  this._props.descripcion = value}
  set categoria(value) {  this._props.categoria = value}
  set hide(value) {  this._props.hide = value}
  set descuentos(value) {  this._props.descuentos = value}
  set accumulates_points(value) {  this._props.accumulates_points = value}
  set points(value) {  this._props.points = value}
  set tips(value) {  this._props.tips = value}
  set store_link(value) {  this._props.store_link = value}
  set variantes(value) {  this._props.variantes = value}
  set tipo_variantes(value) {  this._props.tipo_variantes = value}
  set id_categoria(value) { this._props.id_categoria = value }
  set images(value) { this._props.images = value }
  set cantidadBuy(value) { this._props.cantidadBuy = value }
  set users(value) { this._props.users = value }
  set viewUsers(value) { this._props.viewUsers = value }
  set descuento(value) { this._props.descuento = value }
  set selectOption(value) { this._props.selectOption = value }

  set descuento_producto(value) { this._props.descuento_producto = value}
  set descuento_mayoreo(value) { this._props.descuento_mayoreo = value}
  set id_tipo_aplicacion_descuento_producto(value) { this._props.id_tipo_aplicacion_descuento_producto = value}
  set cantidad_mayoreo(value) { this._props.cantidad_mayoreo = value}
  set id_tipo_aplicacion_descuento_mayoreo(value) { this._props.id_tipo_aplicacion_descuento_mayoreo = value}
  set varianteSelected(value) { this._props.varianteSelected = value}
  set uuid(value) { this._props.uuid = value}
  set edited(value) { this._props.edited = value}
  set precioModificado(value) { this._props.precioModificado = value}
  set metodo_pago(value) { this._props.metodo_pago = value}

  initWithParams(params: ArticleToCarParams) {
    Object.assign(this._props, params); 
  }
  
  initEmpty() {
    this._props.id = 0;
    this._props.id_sucursal = 0;
    this._props.nombre = "";
    this._props.foto = null;
    this._props.cantidad = 0;
    this._props.stock_minimo = 0;
    this._props.precio = 0;
    this._props.descripcion = "";
    this._props.id_categoria = 0;
    this._props.categoria = "";
    this._props.hide = null;
    this._props.descuentos = null;
    this._props.accumulates_points = false;
    this._props.points = 0;
    this._props.tips = '';
    this._props.images = null;
    this._props.store_link = null;
    this._props.variantes = null;
    this._props.tipo_variantes = null;
    this._props.descuento_producto = 0;
    this._props.id_tipo_aplicacion_descuento_producto = 0;
    this._props.descuento_mayoreo = 0;
    this._props.id_tipo_aplicacion_descuento_mayoreo = 0;
    this._props.varianteSelected = [];
    this._props.uuid = "";
    this._props.edited = false;
    this._props.precioModificado = null;
    this._props.cantidadBuy = 0;
    this._props.users = [];
    this._props.viewUsers = false;
    this._props.descuento = 0;
    this.selectOption = [];
    this.metodo_pago = 3;
  }
  public getPrecioFinal(){
    let precioFinal;
    let descuento = 0;
    if(this.descuentos.length > 0)
      descuento = this.getDescuento();
    return precioFinal
  }
  public getDescuento(){
    this.descuento = 0;
    if(this.edited == false){
      //descuento porcentaje
      let descP = this.getTipoDescuento(1);
      let descC = this.getTipoDescuento(2);
      if(descP){
        if(descP.id_tipo_aplicacion_descuento == 1){
          this.descuento = this.cantidadBuy * descP.descuento;
        }
        else{
          let desc = (descP.descuento / 100) * this.precioModificado;
          this.descuento = desc * this.cantidadBuy;
        }
      }
      if(descC){
        if(this.cantidadBuy >= descC.cantidad_mayoreo){
          if(descC.id_tipo_aplicacion_descuento == 1){
            this.descuento = this.cantidadBuy * descC.descuento;
          }
          else{
            let desc = (descC.descuento / 100) * this.precioModificado;
            this.descuento = desc * this.cantidadBuy;
          }
        }
      }
      this.descuento = new Intl.NumberFormat('en-MX',{minimumFractionDigits: 2}).format(  Number(this.descuento.toFixed(3)));
      return this.descuento;
    }
    else{
      return 0;
    } 
  }
  getTipoDescuento(idTipoDesc){
    let des = this.descuentos.find(element => element.id_tipo_descuento == idTipoDesc);
    if(des)
      return des;
    else
      return null;
  }



}