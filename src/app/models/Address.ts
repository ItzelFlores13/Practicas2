import { Modify } from '../utilities/InterfaceUtilities';

export interface AddressParams {
  id: number;
  latitud: string;
  longitud: string;
  pais: string;
  estado: string;
  municipio: string;
  colonia: string;
  codigo_postal: string;
  calle: string;
  num_ext: string;
  num_int: string;
  cp: number;
}

export interface AddressProps extends Modify<AddressParams, {
}> {}

export class Address {
  private props: AddressProps;
  constructor(params?: AddressParams) {
    if (params) this.initParams(params); 
    if (!params) this.initEmpty(); 
  }

  get id() { return this.props.id }
  set id(val) { this.props.id = val }

  get latitud() { return this.props.latitud }
  set latitud(val) { this.props.latitud = val }

  get longitud() { return this.props.longitud }
  set longitud(val) { this.props.longitud = val }

  get pais() { return this.props.pais }
  set pais(val) { this.props.pais = val }

  get estado() { return this.props.estado }
  set estado(val) { this.props.estado = val }

  get municipio() { return this.props.municipio }
  set municipio(val) { this.props.municipio = val }

  get colonia() { return this.props.colonia }
  set colonia(val) { this.props.colonia = val }

  get codigo_postal() { return this.props.codigo_postal }
  set codigo_postal(val) { this.props.codigo_postal = val }

  get calle() { return this.props.calle }
  set calle(val) { this.props.calle = val }

  get num_ext() { return this.props.num_ext }
  set num_ext(val) { this.props.num_ext = val }

  get num_int() { return this.props.num_int }
  set num_int(val) { this.props.num_int = val }

  get cp() { return this.props.cp }
  set cp(val) { this.props.cp = val }


  initParams(params: AddressParams){
    this.props = {
      ...params
    }; 
  }
  initEmpty(){
    this.props = {
      id: null,
      latitud: null,
      longitud: null,
      pais: "",
      estado: "",
      municipio: "",
      colonia: "",
      codigo_postal: "",
      calle: "",
      num_ext: "",
      num_int: "",
      cp: null,
    }; 
  }
}