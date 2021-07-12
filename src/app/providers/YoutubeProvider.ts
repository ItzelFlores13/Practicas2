import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class YoutubeProvider {
    //apikey = 'AIzaSyBrhvrRQTcsEf4ynMRAUTDicqMscbaJOh8'; // Production ODEN
    apikey = 'AIzaSyC-j_NH1YJIODIQtVrMKDJSC5csqzDsTzA'; // ESR

    constructor(public http: HttpClient) {

    }

    getEmbedUrl(videoID) {
      return `https://www.youtube.com/embed/${videoID}`;
    }

    async searchVideos(searchTerm: string): Promise<any> {
      return this.http.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchTerm}&type=video&key=${this.apikey}`
      ).toPromise();
    }

    getEmbedFromUrl(videoUrl: string) {
      return this.getEmbedUrl(videoUrl.split('v=')[1]);
    }
}
