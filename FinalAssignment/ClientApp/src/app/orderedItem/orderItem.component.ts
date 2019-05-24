import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-orderItem',
  templateUrl: './orderItem.component.html'
})
export class orderItemComponent {

  public arr: Array<{ customerID: number, itemID: number, ItemOrderQuantity: number, TotalAmount: number }> = [];
  public customers: any;
  public orderedItems: any;
  public customerDataModel = {
    customerID: null,
    customerName: "",
    customerEmail: ""
  };

  public itemMasterModel = {
    itemID: 0,
    itemName: "",
  };
  public ItemOrder = {
    OrderID: null,
    ItemOrderQuantity: null,
    TotalAmount: null,
    customerID: null,
    itemID: null,
  };

  private _baseUrl: string;
  private _http: HttpClient;
  items: ItemMasterModel;
  myPrice: number;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this._baseUrl = apiUrl;
    this._http = http;
    this.customerDataModel = {
      customerID: 0,
      customerName: "",
      customerEmail: ""
    }
    this.itemMasterModel = {
      itemID: 0,
      itemName: "",

    }
    this.ItemOrder = {
      OrderID: null,
      ItemOrderQuantity: null,
      TotalAmount: null,
      customerID: null,
      itemID: null,
    };
    this._http.get<ItemMasterModel>(this._baseUrl + 'values/GetItems').subscribe(result => {
      this.items = result;
    }, error => console.error(error));

    this._http.get<CustomerDataModel>(this._baseUrl + 'values/GetCustomer').subscribe(result => {
      this.customers = result;
    }, error => console.error(error));

  }

  Save() {
    this._http.post<void>(this._baseUrl + 'values/PostItemOrder', this.arr).subscribe(result => {
      alert("Saved Successfully");
    }, error => console.error(error));
  }
  Add() {
    this.arr.push({
      customerID: this.ItemOrder.customerID,
      itemID: this.ItemOrder.itemID,
      ItemOrderQuantity: this.ItemOrder.ItemOrderQuantity,
      TotalAmount: this.ItemOrder.TotalAmount,
    })

    // alert("Saved Successfully");
    //  this.orderedItems = this.ItemOrder
    console.log(this.ItemOrder);
    this.ResetItem();
  }

  ResetItem() {
    this.ItemOrder = {
      OrderID: 0,
      ItemOrderQuantity: 0,
      TotalAmount: 0,
      customerID: 0,
      itemID: 0,
    };

  }
  Delete(RowIndex) {
    if (RowIndex > -1) {
      this.arr.splice(RowIndex, 1);
    }
  }
  SendData(obj) {
    console.log(obj);
    this.ItemOrder = {
      ItemOrderQuantity: obj.ItemOrderQuantity,
      customerID: obj.customerID,
      TotalAmount: obj.TotalAmount,
      OrderID: obj.OrderID,
      itemID: obj.itemID,

    }
  
  }

  getPrice(itemId)  {
    if (this.ItemOrder.ItemOrderQuantity == 0) {
      this.ItemOrder.TotalAmount = 0;
    }
    else
    {

   this._http.get<number>(this._baseUrl + 'values/GetItemRate?id=' + this.ItemOrder.itemID).subscribe(result => {

       this.ItemOrder.TotalAmount = parseFloat((result * this.ItemOrder.ItemOrderQuantity).toFixed(2));
      }, error => console.error(error));
    }
  }


}

interface CustomerDataModel {
  customerID: number;
  customerName: string;
  customerEmail: string;
}

interface ItemMasterModel {
  ItemID: number;
  ItemName: string;
  
}

interface ItemOrder {
  OrderID: number;
  ItemOrderQuantity: number;
  TotalAmount: number;
  ItemID: number;
  customerID: number;

}
