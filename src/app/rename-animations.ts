import {
  transition,
  trigger,
  query,
  style,
  animate,
  group
} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => *', [
      query(':enter, :leave', 
            style({ position: 'fixed', height: '100vh', width: '100vw' }), 
            { optional: true }),        
      group([
            query(':enter',[
                style({ opacity: 0, transform: 'translateY(10vh)' }),
                animate('0.3s 0.3s ease-in-out', 
                style({ opacity: 1, transform: 'translateY(0vh)' }))
            ], { optional: true }),
            query(':leave', [
                style({ opacity: 1, transform: 'translateY(0vh)'}),
                animate('0.3s ease-in-out', 
                style({ opacity: 0, transform: 'translateY(-10vh)' }))
            ], { optional: true }),
      ])
  ])
]);