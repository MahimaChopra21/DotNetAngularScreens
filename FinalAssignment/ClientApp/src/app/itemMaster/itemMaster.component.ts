import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-itemMaster',
  templateUrl: './itemMaster.component.html'
})
export class ItemMasterComponent {
  public categories: any;
  items: any;
  public ItemMasterModel = {
    ItemId: 0,
    CategoryName: "",
    ItemName: "",
    CategoryID: "",
  };
  private _http: HttpClient;
  _baseUrl: string;
  count: number = 0;




  constructor(http: HttpClient, @Inject('API_URL') ApiUrl: string) {
    this._baseUrl = ApiUrl;
    http.get(ApiUrl + 'values/GetCategory').subscribe(result => {
      this.categories = result;
      console.log(this.categories);
      this._http = http;
      this.ItemMasterModel = {
        ItemId: 0,
        CategoryName: "",
        ItemName: "",
        CategoryID: "",
      }
    }, error => console.error(error));

    http.get<any>(ApiUrl + 'values/GetItemsCname').subscribe(result => {
      this.items = result;
      console.log(this.items);
    }, error => console.error(error));

  }

  Save() {
    for (let item of this.items) {
      if (this.ItemMasterModel.ItemName == item.itemName) {
        this.count++;
      }
      else {
        console.log("Error")
      }
    }
    if (this.count !== 0) {
      this.count = 0;
      alert("Item Name Already Exists.")

    }
    else {
      this._http.post<ItemMasterModel>(this._baseUrl + 'values/SaveItem', this.ItemMasterModel).subscribe(result => {
        alert("Saved Successfully");
      }, error => console.error(error));
    }
  }
}
interface ItemMasterModel {
  ItemId: number;
  CategoryName: string;
  ItemName: string;
  CategoryID: number;
}
