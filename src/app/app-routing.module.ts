import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './pages/products/products.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {Page404Component} from './pages/page404/page404.component';
import {HomeComponent} from './pages/home/home.component';

const routes: Routes = [
  {title: 'Product', path: '', component: HomeComponent},
  {title: 'Product', path: 'products', component: ProductsComponent},
  {title: 'About', path: 'about', component: AboutPageComponent},
  {title: '404', path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
