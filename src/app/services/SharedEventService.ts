import { Injectable } from '@angular/core'; 
import { Subject } from 'rxjs'; 
@Injectable()
export class SharedEventService {

	public notifications = new Subject();

	constructor(){

	}

}