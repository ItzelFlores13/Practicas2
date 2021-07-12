import { Storage } from '@ionic/storage'; 
import { ApiService } from '../services/api/api.service';
import { ROUTES } from '../services/api/api.constants';
import { Injectable } from '@angular/core';
import { UserParams, User } from '../models/User';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

/**
  * User provider
  * Muestra información de facturación , permite edición de métodos de pago
  * y procesa el cobro.
  */
export class S3Provider {  

    s3Params: any;
  constructor(
    private api: ApiService,
    private storage: Storage,
    private spinner: NgxSpinnerService,
    private toast:ToastController,
  ) {
      this.getS3Data();
  }


  /**
    * @author Sergio Castro
    * @description Obtiene los datos para api amazon 3
    * @date 5 noviembre 2020
    * @param 
    * @return info data s3
    * @exceptions lista de errores en petición de api
   */
  public async getS3Data() {
    let base = ROUTES.s3.GetPost;
    let request = (await this.api.get(base));
    this.s3Params = request;
   }

   /**
    * @author Sergio Castro
    * @description Sube imagenes a amazon
    * @date 5 noviembre 2020
    * @param file imagen
    * @return url de imagen subida
    * @exceptions lista de errores en petición de api
   */
  public upload(file){
    
    var promise = new Promise((resolve, reject) => {
      var formData = new FormData(); 
      var request = new XMLHttpRequest(); 
      var url = new URL(this.s3Params.formAttributes.action); 
      var keys = Object.keys(this.s3Params.formInputs); 
      keys.forEach((key)=>{
        formData.append(key, decodeURIComponent(this.s3Params.formInputs[key])); 
      });
      formData.append('file', file); 
      request.addEventListener('load', (event) => {

        var parser = new DOMParser();
        var xml = parser.parseFromString(request.response,"text/xml");
        var s3key = xml.querySelector("Key").innerHTML;
        var s3url = url.href + s3key;
        resolve(s3url); 
      });
      request.upload.addEventListener('progress', function(event){
        var percent_complete = (event.loaded / event.total) * 100;
      });   
      
      request.open('POST', url.href); 
      request.send(formData);        
    });
  
    return promise;
   }
}