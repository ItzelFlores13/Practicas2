import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
export const sideMenuAnimations = {
    toggle: trigger('toggle', [
        state('hide', style({ width: '6rem' })),
        state('show', style({ width: '13rem' })),
        transition('hide => show', [
            animate('700ms ease-in-out', keyframes([
                style({  width: '6rem', offset: 0 }),
                style({  width: '13rem', offset: 1 }),
            ]))
        ]),
        transition('show => hide', [
            animate('700ms ease-in-out', keyframes([
                style({ width: '13rem', offset: 0 }),                
                style({  width: '6rem', offset: 1 }),
            ]))
        ]),
    ]),
};