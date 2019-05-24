import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

@Component({
  selector: 'app-itemInventory',
  templateUrl: './itemInventory.component.html'
})
export class ItemInventoryComponent {
  
  public Items: any;
  public ItemInventoryModel = {
    ItemInventoryId: 0,
    ItemQuantity: "",
    ItemRate: "",
    ItemID: "",
    CreateDate: 0,
    ItemName:""
  };
  public ItemMasterModel = {
    
    ItemID: 0,
    ItemName: "",
    
  };



  private _http: HttpClient;
  _baseUrl: string;
   dtItems: any;
  itemQuantity: any;
  searchQuantity: number;


  constructor(http: HttpClient, @Inject('API_URL') ApiUrl: string) {
    this._baseUrl = ApiUrl;
    this._http = http;

    this._http.get<ItemMasterModel>(ApiUrl + 'values/GetItems').subscribe(result => {
      this.Items = result;
      console.log(this.Items);
      
      this.ItemInventoryModel = {
        ItemInventoryId: 0,
        ItemQuantity: "",
        ItemRate: "",
        ItemID: "",
        CreateDate: 0,
        ItemName:""
      
      }
    }, error => console.error(error));


    this.LoadItem();
 
   }

  LoadItem() {
    this._http.get<ItemInventoryModel>(this._baseUrl + 'values/GetItemInventory').subscribe(result => {
      this.dtItems = result;
    }, error => console.error(error));
  }
  SendData(obj) {
    console.log(obj);
    this.ItemInventoryModel = {
      ItemInventoryId: obj.itemInventoryID,
      ItemQuantity: obj.itemQuantity,
      ItemRate: obj.itemRate,
      ItemID: obj.itemID,
      CreateDate: 0,
      ItemName: obj.itemName
    }
  }
 
Save() {
    this._http.post<ItemInventoryModel>(this._baseUrl + 'values/SaveItemInventory', this.ItemInventoryModel).subscribe(result => {
      alert("Saved Successfully");
      this.LoadItem();
    }, error => console.error(error));
  }
}


interface ItemInventoryModel {
  ItemInventoryId: number;
  ItemQuantity: number;
  ItemRate: number;
  ItemID: number;
  CreateDate: any;
  ItemName: string;
}
interface ItemMasterModel {
 
  ItemID: number;
  ItemName: string;
  
}

