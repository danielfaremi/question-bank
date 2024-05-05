import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LayersGuard } from './guards/layers.guard';
import { CustomerComponent } from './shared/customer/customer.component';
import { QuickAddComponent } from './shared/customer/quick-add/quick-add.component';
import { ManageCustomerComponent } from './shared/customer/manage-customer/manage-customer.component';
import { EditCustomerComponent } from './shared/customer/edit-customer/edit-customer.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: '/login' 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'customer/manage-customer',
    component: ManageCustomerComponent
  },
  {
    path: 'quick-addcustomer',
    component: QuickAddComponent
  },
  {
    path: 'customer/edit-customer/:id',
    component: EditCustomerComponent
  },
  {
    path: 'admin-home',
    canActivate: [LayersGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'staff-home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
