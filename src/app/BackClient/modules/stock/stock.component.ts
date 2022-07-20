import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Stock } from 'src/app/Models/Stock';
import { StockService } from 'src/app/Services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit,OnDestroy {
  searchtext:any;

  formstock: FormGroup;
  listestock: Stock[];
  StockObject: Stock;
  currentRate: number=3;

 ob: Subscription

  constructor(private _stockService: StockService,private formbuider: FormBuilder,private toastr: ToastrService) { }
  ngOnDestroy(): void {

    this.ob.unsubscribe();
  }

  ngOnInit(): void {
    this.infoForm();


    this.getAllStock();

  }

  infoForm() {
    this.formstock = this.formbuider.group({
     
      qteMin: ['', [Validators.required]],
      libelleStock: ['', [Validators.required]],
    });
  }




  getAllStock(){
    this.ob=this._stockService.getAllStock().subscribe(res => {
      this.listestock = res;
    });
  }
  addprod()
  {

    this.StockObject = this.formstock.value
    console.log(this.StockObject);
    this.ob=this._stockService.addStock(this.StockObject).subscribe(
      {
        next: (value: any) => {

          this.formstock.reset();
          //notif houni

          let ref = document.getElementById('cancel');
          ref?.click();
          this.getAllStock();
          this.toastr.success('Notification', 'Succesfully Added');

        },
        error: err => console.error(err),
        complete: () => console.log('DONE!')
      }
    )

    
  }

  goToDeleteUsers(id: number) {


    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {


      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        );

        this.ob=this._stockService.deleteStock(id).subscribe(

          res => {
            this.getAllStock();

          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      }
    });



  }


  }



