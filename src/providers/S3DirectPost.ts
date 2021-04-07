import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Storage } from '@ionic/storage'; 

  /*

    S3 Steps: 

    0.- Get URL
    1.- Get params from URL
    2.- Get File Field 
    3.- Get target Hidden Field 
    4.- Upload file to URL 
    5.- Set Hidden Field to returned URL 
    6.- Progress, etc 

  */

@Injectable()
export class S3DirectPostProvider {

  S3URL: any; 
  S3FORMDATA: any; 

  constructor(
    private http: HttpClient,
    public storage: Storage, 
    
  ) {

  }
  public S3GetURL() {
    return this.S3URL; 
  }

  public upload(file) {

    var promise = new Promise((resolve, reject) => {
      var formData = new FormData(); 
      var request = new XMLHttpRequest(); 
      var url = new URL(this.S3FORMDATA.formAttributes.action); 


      var keys = Object.keys(this.S3FORMDATA.formInputs); 
      keys.forEach((key)=>{
        formData.append(key, this.S3FORMDATA.formInputs[key]); 
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
        // Percentage of upload completed
      });      
      request.open('POST', url.href); 
      request.send(formData);        
    });

    return promise; 
  }

  public async getDirectPostURL(){
    return new Promise (resolve => {
      this.storage.get("bearer").then((credentials) => {
        var credentials:any = credentials; 
        let api_headers = new HttpHeaders().set('Authorization', 'Bearer ' + credentials);
        api_headers.set('Access-Control-Allow-Origin:', '*');

        this.http.get("https://api.oden.mx/api/get-direct-post-url",  {headers: api_headers} ).subscribe(data => {
          this.S3FORMDATA = data;
        }, error => {
          
        });
      });
    });
   
  }
}