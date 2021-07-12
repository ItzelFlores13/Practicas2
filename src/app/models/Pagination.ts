import { Modify } from '../utilities/InterfaceUtilities';

export interface PaginationParams {
  currentPage: number,
  totalPages: number,
}
export interface PaginationProps extends Modify<PaginationParams, {
}> {}

export class Pagination {
  private _props: Partial<PaginationProps> = {}; 
  constructor(params?: PaginationParams) {
    if (params) Object.assign(this._props, params); 
    if (!params) this.initEmpty(); 
  }

  get currentPage() { return this._props.currentPage }
  get totalPages() { return this._props.totalPages }
  set currentPage(value) {this._props.currentPage = value}
  set totalPages(value) {this._props.totalPages = value}

  initEmpty() {
    this._props.currentPage = 1;
    this._props.totalPages = 1;
  }
}