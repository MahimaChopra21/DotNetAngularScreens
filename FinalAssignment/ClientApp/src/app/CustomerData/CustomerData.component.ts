import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-CustomerData',
  templateUrl: './CustomerData.component.html'
})
export class CustomerDataComponent {
  public customerDataModel = {
    customerId: null,
    customerName: "",
    customerEmail: ""
  };
  public count:any = 0;

  private _baseUrl: string;
  private _http: HttpClient;
    customers: any;
    countEmail: 0;

  constructor(http: HttpClient, @Inject('API_URL') apiUrl: string) {
    
    this._baseUrl = apiUrl;
    this._http = http;
    this.customerDataModel = {
      customerId: 0,
      customerName: "",
      customerEmail: ""
    }
    this.ShowRecord();
    
  }
 


  SaveRecord() {
    if (this.count !== 0) {
      for (let customer of this.customers) {
        if (this.customerDataModel.customerEmail == customer.customerEmail) {
          this.count++;
        }
        else {
          console.log("Error")
        }
      }
      if (this.countEmail !== 0) {
        this.countEmail = 0;
        alert("Email Already Exists.")

      }
    
      else {
        this._http.post<CustomerDataModel>(this._baseUrl + 'values/UpdateCustomerDetails', this.customerDataModel).subscribe(result => {
          this.ShowRecord();
          alert("Updated Successfully");

        }, error => console.error(error));
      }
    }
    
    

    else {
        this._http.post<CustomerDataModel>(this._baseUrl + 'values/Post', this.customerDataModel).subscribe(result => {
          this.ShowRecord();
          alert("Saved Successfully");

        }, error => console.error(error));
    }
  }

  ShowRecord() {
    this._http.get<CustomerDataModel>(this._baseUrl + 'values/GetCustomer').subscribe(result => {
      this.customers = result;
    }, error => console.error(error));
  }

  SendData(obj) {
    console.log(obj);
    this.customerDataModel = {
      customerId: obj.customerID,
      customerName: obj.customerName,
      customerEmail: obj.customerEmail
    }
    this.count++;
  }


}

interface CustomerDataModel {
  customerId: number;
  customerName: string;
  customerEmail: string;
}
