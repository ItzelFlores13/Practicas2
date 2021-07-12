import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { da } from 'date-fns/locale';
import { DateProvider } from '../../providers/DateProvider';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string = undefined;
  private _headers: Promise<Headers> = this.storage.get('token').then((token) => {
    const today = new Date();
    this.token = token;
    return new Headers({
      'Timestamp': this.formatFecha(new Date()),
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': `application/json`,
      
    }); 
  });
  
  
  constructor(private storage: Storage,
              private http: HttpClient,
              private dateProvider: DateProvider,
    ) {
  }
  
  formatFecha(fecha: Date){
    let mes = fecha.getMonth()+1;
    let dia = fecha.getDate();
    return fecha.getFullYear()+'-'+(mes < 10 ? '0'+mes:mes)+'-'+(dia < 10 ? '0'+dia:dia)+' 00:00:00';
  }
  async post(endpoint, data){
    return this._headers.then((headers)=>{
      return fetch(environment.base_url + endpoint, {
        method: 'POST',
        headers,
        mode: 'cors',
        body: JSON.stringify(data)
      });
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    });
  }

  async postFile(endpoint, data) {
    const today = new Date();
    this.token = await this.storage.get('token');
    const headers = {
      Authorization: `Bearer ${this.token}`,
      Timestamp: this.dateProvider.getDateTimeFormat(today)
    };
    let response;
    return this.http.post(environment.base_url + endpoint, data, {headers}).toPromise();
     /*  console.log(request,'api');
      //response = request;
      //return request;
    }, error => {
      //return error;
      response = error;
      console.log('error',error);
    });
    return response; */
  }

  async put(endpoint, data) {
    return this._headers.then((headers) => {
      return fetch(environment.base_url + endpoint, {
        method: 'PUT',
        headers,
        mode: 'cors',
        body: JSON.stringify(data)
      });
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    });
  }
  async get(endpoint) {
    return this._headers.then((headers) => {
      return fetch(environment.base_url + endpoint, {
        method: 'GET',
        headers,
        mode: 'cors'
      });
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    });
  }
  async getFile(endpoint, filename) {
    const today = new Date();
    const headers = {
      Authorization: `Bearer ${this.token}`,
      Timestamp: this.dateProvider.getDateTimeFormat(today)
    };
    this.http.get(environment.base_url + endpoint, {headers, responseType: 'arraybuffer'}).subscribe(data => {
      this.downloadfile(data, filename);
    }, error => {
      console.log('error', error);
    });
  }

  downloadfile(data, filename) {
    let blob = new Blob([data], {type: 'xlsx'});
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
  async delete(endpoint) {
    return this._headers.then((headers) => {
      return fetch(environment.base_url + endpoint, {
        method: 'DELETE',
        headers,
        mode: 'cors'
      });
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    });
  } 
  async deleteWithoutResponse(endpoint) {
    return this._headers.then((headers) => {
      return fetch(environment.base_url + endpoint, {
        method: 'DELETE',
        headers,
        mode: 'cors'
      });
    })
    .then((response) => {
      return response;
    }).then((data) => {
      return data;
    });
  }

}