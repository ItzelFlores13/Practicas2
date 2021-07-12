export interface PaisParams {
  id: number;
  nombre: string;
  divisa: string;
  abreviacion_divisa: string;
  signo_divisa: string;
  paypal: number;
  openpay: number;
  currency_plural: string;
  currency_singular: string;
  currency_cents_plural: string;
  currency_cents_singular: string;
}

export class Pais {
  private props: PaisParams;

  constructor(params?: PaisParams) {
    if (params) { this.initParams(params); }
    if (!params) { this.initEmpty(); }
  }

  // BOLIERPLATE, Generic Setters and Getters

  get id() { return this.props.id; }
  set id(value) { this.props.id = value; }

  get nombre() { return this.props.nombre; }
  set nombre(value) { this.props.nombre = value; }

  get divisa() { return this.props.divisa; }
  set divisa(value) { this.props.divisa = value; }

  get abreviacion_divisa() { return this.props.abreviacion_divisa; }
  set abreviacion_divisa(value) { this.props.abreviacion_divisa = value; }

  get signo_divisa() { return this.props.signo_divisa; }
  set signo_divisa(value) { this.props.signo_divisa = value; }

  get paypal() { return this.props.paypal; }
  set paypal(value) { this.props.paypal = value; }

  get openpay() { return this.props.openpay; }
  set openpay(value) { this.props.openpay = value; }

  get currency_plural() { return this.props.currency_plural; }
  set currency_plural(value) { this.props.currency_plural = value; }

  get currency_singular() { return this.props.currency_singular; }
  set currency_singular(value) { this.props.currency_singular = value; }

  get currency_cents_plural() { return this.props.currency_cents_plural; }
  set currency_cents_plural(value) { this.props.currency_cents_plural = value; }

  get currency_cents_singular() { return this.props.currency_cents_singular; }
  set currency_cents_singular(value) { this.props.currency_cents_singular = value; }

  private initParams(params: PaisParams) {
    this.props = {
    ...params
    };
  }

  private initEmpty() {
    this.props = {
      id : null,
      nombre: '',
      divisa: '',
      abreviacion_divisa: '',
      signo_divisa: '',
      paypal: 0,
      openpay: 0,
      currency_plural: '',
      currency_singular: '',
      currency_cents_plural: '',
      currency_cents_singular: ''
    };
  }
}
