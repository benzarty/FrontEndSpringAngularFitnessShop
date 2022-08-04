import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Produit } from 'src/app/Models/Produit';
import { Stock } from 'src/app/Models/Stock';
import { ProduitService } from 'src/app/Services/produit.service';
import { StockService } from 'src/app/Services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
})
export class ProduitComponent implements OnInit, OnDestroy {
  searchtext: any;

  listeproduit: Produit[];
  formproduit: FormGroup;

  listestock: Stock[];
  ob: Subscription;
  userFile;
  public message: string;
  public imagePath;
  imgURL: any;
  showaddButton: boolean;
  showupdateButton: boolean;

  constructor(
    public produitservice: ProduitService,
    private formbuider: FormBuilder,
    private toastr: ToastrService,
    private _stockService: StockService
  ) {}
  ngOnDestroy(): void {
    this.ob.unsubscribe();
  }

  ngOnInit(): void {
    this.infoForm();
    this.getAllProducts();
    this.getAllStock();
  }

  infoForm() {
    this.formproduit = this.formbuider.group({
      idProduit: ['', [Validators.required]],

      libelle: ['', [Validators.required]],
      code: ['', [Validators.required]],
      prixUnitaire: ['', [Validators.required]],
      fileName: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  getAllProducts() {
    this.ob = this.produitservice.getAllProduits().subscribe((res) => {
      this.listeproduit = res;
    });
  }

  goToDeleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted!', 'Your record has been deleted.', 'success');

        this.ob = this.produitservice.deleteProduct(id).subscribe((res) => {
          this.getAllProducts();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      }
    });
  }

  addprod(idStock) {
    const formData = new FormData();

    const produit = this.formproduit.value;

    this.formproduit.reset();

    console.log(produit);
    formData.append('produit', JSON.stringify(produit));
    formData.append('file', this.userFile);
    this.ob = this.produitservice
      .createData(formData, idStock)
      .subscribe((data) => {
        if (data == true) {
          this.getAllProducts();

          let ref = document.getElementById('cancel');
          ref?.click();
          this.toastr.success('Notification', 'Succesfully Added Product');
        }
        if (data == false) {
          this.toastr.warning(
            'Notification',
            'This stock is full,try another '
          );
        }
      });
  }
  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  EditUser(row: Produit) {
    this.showaddButton = false;
    this.showupdateButton = true;

    this.formproduit.controls['idProduit'].setValue(row.idProduit);
    this.formproduit.controls['code'].setValue(row.code);

    this.formproduit.controls['libelle'].setValue(row.libelle);

    this.formproduit.controls['prixUnitaire'].setValue(row.prixUnitaire);

    this.formproduit.controls['description'].setValue(row.description);
  }

  clickAddButtonTest() {
    this.formproduit.reset();
    this.showaddButton = true;
    this.showupdateButton = false;
  }

  getAllStock() {
    this.ob = this._stockService.getAllStock().subscribe((res) => {
      this.listestock = res;
    });
  }
}
