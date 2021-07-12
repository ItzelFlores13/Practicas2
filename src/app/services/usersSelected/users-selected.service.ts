import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersSelectedService {
public users =[]
  constructor() { }

  getUsers(){
    return this.users;
  }
  setUsers(u){
    this.users=u;    
  }
}
