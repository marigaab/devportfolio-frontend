import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/login/login';
import { DevPerfil } from './pages/dev-perfil/dev-perfil';
import { Sobre } from './pages/sobre/sobre';
import { Perfis } from './pages/perfis/perfis';
import { Contato } from './pages/contato/contato';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'sobre', component: Sobre },
    { path: 'dev/:id', component: DevPerfil },
    { path: 'perfis', component: Perfis },
    { path: 'contato', component: Contato },
    { path: 'login', component: Login },
    { path: 'admin', component: Admin },
    { path: '**', redirectTo: '' }
];
