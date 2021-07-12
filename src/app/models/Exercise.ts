export interface ExerciseParams {
  id: number;
  nombre: string;
  instrucciones: string;
  img: string;
  galeria: any[];
  video: string;
  id_tipo_ejercicio: number;
  id_gimnasio: number;
  puntos_clave: any[];
  banner: string;
  tipo_ejercicio?:any;
}

export class Exercise {

  constructor(params?: ExerciseParams) {
    if (params) { this.initParams(params); }
    if (!params) { this.initEmpty(); }
  }

  get id() { return this.props.id; }
  set id(value) { this.props.id = value; }

  get nombre() { return this.props.nombre; }
  set nombre(value) { this.props.nombre = value; }

  get instrucciones() { return this.props.instrucciones; }
  set instrucciones(value) { this.props.instrucciones = value; }

  get img() { return this.props.img; }
  set img(value) { this.props.img = value; }

  get galeria() { return this.props.galeria; }
  set galeria(value) { this.props.galeria = value; }

  get video() { return this.props.video; }
  set video(value) { this.props.video = value; }

  get id_tipo_ejercicio() { return this.props.id_tipo_ejercicio; }
  set id_tipo_ejercicio(value) { this.props.id_tipo_ejercicio = value; }

  get tipo_ejercicio() { return this.props.tipo_ejercicio; }
  set tipo_ejercicio(value) { this.props.tipo_ejercicio = value; }

  get id_gimnasio() { return this.props.id_gimnasio; }
  set id_gimnasio(value) { this.props.id_gimnasio = value; }

  get puntos_clave() { return this.props.puntos_clave; }
  set puntos_clave(value) { this.props.puntos_clave = value; }

  get banner() { return this.props.banner; }
  set banner(value) { this.props.banner = value; }

  private props: ExerciseParams;

  private initParams(params: ExerciseParams) {
    this.props = {
      ...params
    };
  }

  private initEmpty() {
    this.props = {
      id: null,
      nombre: '',
      instrucciones: '',
      img: '',
      galeria: [],
      video: '',
      id_tipo_ejercicio : null,
      id_gimnasio: null,
      puntos_clave: [],
      banner: '',
      tipo_ejercicio:[]
    };
  }

}
