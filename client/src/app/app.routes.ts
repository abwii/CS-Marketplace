import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { MarketplaceComponent } from './components/marketplace/marketplace';
import { InventoryComponent } from './components/inventory/inventory';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'market', component: MarketplaceComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: '', redirectTo: '/market', pathMatch: 'full' }
];
