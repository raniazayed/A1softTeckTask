import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

//Components
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { HeaderComponent } from './shared/header/header.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, UsersListComponent, UserDetailsComponent, UserFormComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
