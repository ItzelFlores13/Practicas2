import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CONTENIDO_TUTO } from './contenidoTutorial';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  sideMenu: boolean = true;
  hideText: boolean = true;
  timer: number;
  sectionSelected=0;
  sectionsContent=CONTENIDO_TUTO;
  user: User;
  
  sections = [
    {
      name: 'SIDEMENU.DASHBOARD',
      id: 1,
      id_rol:[1,2,3,4,5,6,7],
      routerLink: '/dashboard/home',
      click: 'dashboard()',
      img:'/assets/images/icons/dashboard.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.BRANCHES',
      id: 2,
      id_rol:[3,4],
      routerLink: '/gymbranch-index',
      click: '',
      img:'/assets/images/icons/gym-icon.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'Gimnasios',
      id: 2,
      id_rol:[1,2],
      routerLink: '/gymbranch-index',
      click: '',
      img:'/assets/images/icons/gym-icon.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.USERS',
      id: 3,
      id_rol:[1,2,3,4,5,7],
      routerLink: '/users',
      click: '',
      img:'/assets/images/icons/oden-icon.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.MEMBERSHIPS',
      id: 4,
      id_rol:[3,4],
      routerLink: '/memberships-group',
      click: '',
      img:'/assets/images/icons/membresia.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'Planes',
      id: 4,
      id_rol:[1,2],
      routerLink: '/planes',
      click: '',
      img:'/assets/images/icons/membresia.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.CLASSES',
      id: 5,
      id_rol:[1,2,3,4,5,7],
      routerLink: '/schedule',
      click: '' ,
      img:'/assets/images/icons/Icono-clases2.png',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.BLACKBOARD',
      id:6,
      id_rol:[1,2,3,4,5,7],
      routerLink: '',
      click: 'openBlackboard',
      img:'/assets/images/icons/blackboard.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.SHOP',
      id: 7,
      id_rol:[1,2,3,4,5,7],
      routerLink: '/shop',
      click: '' ,
      img:'/assets/images/icons/icono-tienda.png',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.EXERCICES',
      id: 8,
      id_rol:[1,2,3,4,5],
      routerLink: '/exercises',
      click: '',
      img:'/assets/images/icons/ejercicios.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.ROUTINES',
      id: 9,
      id_rol:[1,2,3,4,5],
      routerLink: '/routines',
      click: '' ,
      img:'/assets/images/icons/entrenamientos.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.NOTIFICATIONS',
      id: 10,
      id_rol:[1,2,3,4],
      routerLink: '/notifications',
      click: '' ,
      img:'/assets/images/icons/notificaciones.svg',
      plans: [
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.MURO',
      id: 11,
      id_rol:[1,2],
      routerLink: '/muro',
      click: '' ,
      img:'/assets/images/icons/muro.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
    {
      name: 'SIDEMENU.DIVISAS',
      id: 12,
      id_rol:[1,2],
      routerLink: '/divisas',
      click: '' ,
      img:'/assets/images/icons/notificaciones.svg',
      plans: [
        'free',
        'basic',
        'premium',
        'elite'
      ]
    },
  ]
  constructor(private translate: TranslateService) {
   }

  getState() {
    return this.sideMenu;
  }
  toggle() {
    this.sideMenu = !this.sideMenu;
    if (this.hideText) {
      this.timer = 400;
    }
    else {
      this.timer = 0;
    }
    this.toggleHideText();
  }
  toggleHideText() {
    setTimeout(() => {
      this.hideText = !this.hideText;
    }, this.timer);
  }
  selectSection(section) {
    this.sectionSelected = section;
  }
// obtiene las secciones por id_rol
  getSections(id){
    let sectionsByRol=[];
    this.sections.forEach(s => {
      let found=s.id_rol.find(id_rol=>id_rol==id);
      if(found){
       sectionsByRol.push(s) 
      }
    });
    // console.log(sectionsByRol);
    
    return sectionsByRol;
  }
  getContenidoTutorial(id){
    return this.sectionsContent.find(e=>e.id==id);
  }
}
