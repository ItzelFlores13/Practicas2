export interface EmergencyContactParams {
     id: number;
     nombre_contacto: string;
     telefono_contacto: string;
  }
  
  export class EmergencyContact {
  
    private props: EmergencyContactParams; 
  
    constructor(params?: EmergencyContactParams) {
      if (params) this.initParams(params); 
      if (!params) this.initEmpty(); 
    }
  
    // BOLIERPLATE, Generic Setters and Getters
  
    get id() { return this.props.id }
    set id(value) { this.props.id = value; }
    
    get nombre_contacto() {return this.props.nombre_contacto}
    set nombre_contacto(value) {this.props.nombre_contacto = value}

    get telefono_contacto() {return this.props.telefono_contacto}
    set telefono_contacto(value) { this.props.telefono_contacto = value}
  
    private initParams(params: EmergencyContactParams) {
      this.props = {
        ...params
      }; 
    } 
  
    private initEmpty() {
      this.props = {
        id : null, 
        nombre_contacto: "",
        telefono_contacto: "",
      }
    }
  }