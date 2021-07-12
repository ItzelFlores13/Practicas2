export interface ContactParams {
  id: number;
  nombre_completo: string;
  telefono: string;
  correo: string;
  horario_atencion_inicio: string;
  horario_atencion_fin: string;
  url_facebook: string;
}

export class Contact {

  private props: ContactParams; 

  constructor(params?: ContactParams) {
    if (params) this.initParams(params); 
    if (!params) this.initEmpty(); 
  }

  // BOLIERPLATE, Generic Setters and Getters

  get id() { return this.props.id }
  set id(value) { this.props.id = value; }

  get nombre_completo() { return this.props.nombre_completo }
  set nombre_completo(value) { this.props.nombre_completo = value; }

  get telefono() { return this.props.telefono }
  set telefono(value) { this.props.telefono = value; }

  get correo() { return this.props.correo }
  set correo(value) { this.props.correo = value; }

  get horario_atencion_inicio() { return this.props.horario_atencion_inicio }
  set horario_atencion_inicio(value) { this.props.horario_atencion_inicio = value; }

  get horario_atencion_fin() { return this.props.horario_atencion_fin }
  set horario_atencion_fin(value) { this.props.horario_atencion_fin = value; }

  get url_facebook() { return this.props.url_facebook }
  set url_facebook(value) { this.props.url_facebook = value; }


  private initParams(params: ContactParams) {
    this.props = {
      ...params
    }; 
  } 

  private initEmpty() {
    this.props = {
      id : null, 
      nombre_completo : '', 
      telefono : '', 
      correo : '', 
      horario_atencion_inicio : '', 
      horario_atencion_fin : '', 
      url_facebook : ''
    }
  }
}