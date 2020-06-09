import {NgModule, Component} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export  const routes: Routes = [
    { path: '', redirectTo: 'home'},
    { path: 'home', component: HomeComponent },
    { path: 'user/:id', component: UserDetailsComponent },
    { path: 'add' , component: UserFormComponent},
    { path: 'edit/:id' , component: UserFormComponent}
];

@NgModule({
    exports: [ RouterModule ],
    imports: [RouterModule.forChild(routes),
    ]
})

export class DashboardRoutingModule { }