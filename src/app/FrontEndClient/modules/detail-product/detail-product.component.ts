import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Produit } from 'src/app/Models/Produit';
import { Reviews } from 'src/app/Models/Reviews';
import { ProduitService } from 'src/app/Services/produit.service';
import { ReviewsService } from 'src/app/Services/reviews.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit,OnDestroy {
  id: string;
  ob: Subscription;
  produit: Produit;
  reviewtab: Reviews[];

  currentRate=0;

  rating3 = 0;


  constructor(
    private ar: ActivatedRoute,
    public productservice: ProduitService,
    private reviewservice: ReviewsService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.ob.unsubscribe();
  }

  ngOnInit(): void {
    this.id = this.ar.snapshot.paramMap.get('id');

    this.getByid(this.id);

    this.getReviewByIdProduit(this.id);






  }

  getByid(id) {
    this.ob = this.productservice.getbyid(id).subscribe((res) => {
      this.produit = res;
    });
  }

  getReviewByIdProduit(id) {
    this.ob = this.reviewservice.getReviews(id).subscribe((res) => {
      this.reviewtab = res;
      console.log(this.reviewtab);
    });
  }

  AddReview(f:NgForm,v:any)
  { 



this.ob = this.reviewservice.PostReview(f.value,v).subscribe((res) => {
  f.reset();
  this.toastr.success('Notification', 'Youe Review has been succesfully submitted');


});
    

  }
}
