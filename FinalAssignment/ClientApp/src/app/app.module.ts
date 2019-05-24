import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CustomerDataComponent } from './CustomerData/CustomerData.component';
import { orderItemComponent } from './orderedItem/orderItem.component';
import { ItemInventoryComponent } from './itemInventory/itemInventory.component';
import { filter } from './filter.pipe';
import { ItemMasterComponent } from './itemMaster/itemMaster.component';
//import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CustomerDataComponent,
    orderItemComponent,
    ItemInventoryComponent,
    filter,
    ItemMasterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    //Ng2SmartTableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'CustomerData', component: CustomerDataComponent },
      { path: 'orderItem', component: orderItemComponent },
      { path: 'itemInventory', component: ItemInventoryComponent },
      { path: 'itemMaster', component: ItemMasterComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
