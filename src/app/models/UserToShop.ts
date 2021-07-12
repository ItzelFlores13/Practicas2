import { Modify } from '../utilities/InterfaceUtilities';
import { Gym, GymParams } from './Gym';
import { USERS } from '../constants/UserTypes';
import { differenceInCalendarDays } from 'date-fns'; 

export interface UserToShopParams {
  id: number;
  nombre: string;
  email:string;
  fechaInicio:string;
  editedFechaInicio: boolean;
  membresias:any[];
  puntos:any[];
  articulos:any[];
  membresiasTicket:any[];
  puntosTicket:any[];
  articulosTicket:any[];
}
export interface UserToShopProps extends Modify<UserToShopParams, {
  direccion: any; 
  contacto_emergencia: any; 
  gimnasio: Gym; 
}> {}

export class UserToShop {

  private _props: Partial<UserToShopProps> = {}; 
    
  constructor(params?: UserToShopParams){
    if (params) this.initWithParams(params); 
    if (!params) this.initEmpty(); 
  }
  initWithParams(params: UserToShopParams) {
    Object.assign(this._props, params); 

  }

  get gimnasio() { 
    return this._props.gimnasio;  
  }

  get id() { return this._props.id }
  get membresias() { return this._props.membresias }
  get puntos() { return this._props.puntos }
  get articulos() { return this._props.articulos }
  get membresiasTicket() { return this._props.membresiasTicket }
  get puntosTicket() { return this._props.puntosTicket }
  get articulosTicket() { return this._props.articulosTicket }
  get nombre() { return this._props.nombre }
  get email() { return this._props.email }
  



  get editedFechaInicio() { return this._props.editedFechaInicio }
  get fechaInicio() { return this._props.fechaInicio }

  set membresias(value) { this._props.membresias = value }
  set puntos(value) { this._props.puntos = value }
  set articulos(value) { this._props.articulos = value }
  set membresiasTicket(value) { this._props.membresiasTicket = value }
  set puntosTicket(value) { this._props.puntosTicket = value }
  set articulosTicket(value) { this._props.articulosTicket = value }
  set fechaInicio(value) { this._props.fechaInicio = value }
  set editedFechaInicio(value) { this._props.editedFechaInicio = value }
  set id(value) { this._props.id = value }
  set nombre(value) { this._props.nombre = value }
  set email(value) { this._props.email = value }




  

  initEmpty() {
    this._props.id = 0;
    this._props.membresias = [];
    this._props.puntos = [];
    this._props.articulos = [];
    this._props.nombre = '';
    this._props.email = '';
    this._props.puntosTicket = [];
    this._props.membresiasTicket = [];
    this._props.articulosTicket = [];
  
  }
  numeroALetras(num, currency) {
    currency = currency || {};
    let data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: '',
        letrasMonedaPlural: currency.currency_plural || 'PESOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: currency.currency_singular || 'PESO', //'PESO', 'Dólar', 'Bolivar', 'etc'
        letrasMonedaCentavoPlural: currency.currency_cents_plural || 'CENTAVOS',
        letrasMonedaCentavoSingular: currency.currency_cents_singular || 'CENTAVO'
    };

    if (data.centavos > 0) {
        let centavos = ''
        if (data.centavos == 1)
            centavos = this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
        else
            centavos =  this.Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
        data.letrasCentavos = 'CON ' + centavos
    };

    if(data.enteros == 0)
        return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros == 1)
        return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    else
        return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
}
Millones(num) {
  let divisor = 1000000;
  let cientos = Math.floor(num / divisor)
  let resto = num - (cientos * divisor)

  let strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
  let strMiles = this.Miles(resto);

  if(strMillones == '')
      return strMiles;

  return strMillones + ' ' + strMiles;
}
Seccion(num, divisor, strSingular, strPlural) {
  let cientos = Math.floor(num / divisor)
  let resto = num - (cientos * divisor)

  let letras = '';

  if (cientos > 0)
      if (cientos > 1)
          letras = this.Centenas(cientos) + ' ' + strPlural;
      else
          letras = strSingular;

  if (resto > 0)
      letras += '';

  return letras;
}
Miles(num) {
  let divisor = 1000;
  let cientos = Math.floor(num / divisor)
  let resto = num - (cientos * divisor)

  let strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
  let strCentenas = this.Centenas(resto);

  if(strMiles == '')
      return strCentenas;

  return strMiles + ' ' + strCentenas;
}
Centenas(num) {
  let centenas = Math.floor(num / 100);
  let decenas = num - (centenas * 100);

  switch(centenas)
  {
      case 1:
          if (decenas > 0)
              return 'CIENTO ' + this.Decenas(decenas);
          return 'CIEN';
      case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
      case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
      case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
      case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
      case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
      case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
      case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
      case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
  }

  return this.Decenas(decenas);
}
Decenas(num){

  let decena = Math.floor(num/10);
  let unidad = num - (decena * 10);

  switch(decena)
  {
      case 1:
          switch(unidad)
          {
              case 0: return 'DIEZ';
              case 1: return 'ONCE';
              case 2: return 'DOCE';
              case 3: return 'TRECE';
              case 4: return 'CATORCE';
              case 5: return 'QUINCE';
              default: return 'DIECI' + this.Unidades(unidad);
          }
      case 2:
          switch(unidad)
          {
              case 0: return 'VEINTE';
              default: return 'VEINTI' + this.Unidades(unidad);
          }
      case 3: return this.DecenasY('TREINTA', unidad);
      case 4: return this.DecenasY('CUARENTA', unidad);
      case 5: return this.DecenasY('CINCUENTA', unidad);
      case 6: return this.DecenasY('SESENTA', unidad);
      case 7: return this.DecenasY('SETENTA', unidad);
      case 8: return this.DecenasY('OCHENTA', unidad);
      case 9: return this.DecenasY('NOVENTA', unidad);
      case 0: return this.Unidades(unidad);
  }
  
}
Unidades(num){

  switch(num)
  {
      case 1: return 'UN';
      case 2: return 'DOS';
      case 3: return 'TRES';
      case 4: return 'CUATRO';
      case 5: return 'CINCO';
      case 6: return 'SEIS';
      case 7: return 'SIETE';
      case 8: return 'OCHO';
      case 9: return 'NUEVE';
  }

  return '';
}

DecenasY(strSin, numUnidades) {
  if (numUnidades > 0)
      return strSin + ' Y ' + this.Unidades(numUnidades)

  return strSin;
}

}