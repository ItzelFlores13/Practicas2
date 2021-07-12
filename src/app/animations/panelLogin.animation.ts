import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
export const loginAnimations = {
    toggle: trigger('toggle', [
        state('hide', style({ right: '-100vw' })),
        state('show', style({ right: 0 })),
        transition('hide => show', [
            animate('700ms ease-in-out', keyframes([
                style({ right: "-100vw", offset: 0 }),
                style({ right: "0", offset: 1 }),
            ]))
        ]),
        transition('show => hide', [
            animate('700ms ease-in-out', keyframes([
                style({ right: "0", offset: 0 }),
                style({ right: "-100vw", offset: 1 }),
            ]))
        ]),
    ]),
};