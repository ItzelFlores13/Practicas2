import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class notificationCountService {
notiNuevas=0;
	constructor( ) { }

	setValue(value){
		this.notiNuevas=value;
	}
}