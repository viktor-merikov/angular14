import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductPageComponent} from './pages/product-view/product-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';

const routes: Routes = [
  {title: 'Product', path: '', component: ProductPageComponent},
  {title: 'About', path: 'about', component: AboutPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
