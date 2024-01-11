import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'comp2',
        loadComponent: () =>
        import('./Components/comp2/comp2.component').then(mod => mod.Comp2Component)
    

}]