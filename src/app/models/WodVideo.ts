export interface WodVideoParams {
    id: number;
    title: string;
    link: string;
    id_gimnasio: number;
  }

export class WodVideo {

  constructor(params?: WodVideoParams) {
    if (params) { this.initParams(params); }
    if (!params) { this.initEmpty(); }
  }

  get id() { return this.props.id; }
  set id(value) { this.props.id = value; }

  get title() { return this.props.title; }
  set title(value) { this.props.title = value; }

  get link() { return this.props.link; }
  set link(value) { this.props.link = value; }

  get id_gimnasio() { return this.props.id_gimnasio; }
  set id_gimnasio(value) { this.props.id_gimnasio = value; }

  private props: WodVideoParams;

  private initParams(params: WodVideoParams) {
    this.props = {
      ...params
    };
  }

  private initEmpty() {
    this.props = {
      id: null,
      title: '',
      link: '',
      id_gimnasio: null,
    };
  }

}
