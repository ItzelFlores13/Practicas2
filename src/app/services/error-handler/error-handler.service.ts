import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText); 
    }
    return response.json(); 
  }
}
