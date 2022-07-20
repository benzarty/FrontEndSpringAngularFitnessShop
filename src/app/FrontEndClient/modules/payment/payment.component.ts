import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions,
} from 'ngx-stripe';
import { ToastrService } from 'ngx-toastr';
import { PaymentIntentDto } from 'src/app/Models/PaymentIntentDto';
import { AuthService } from 'src/app/Services/auth.service';
import { FactureService } from 'src/app/Services/facture.service';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @Input() idFacture;
  @Input() montantFacture;
  @Input() datefacture;

  error: any;
  token: any;

  elements: Elements;
  card: StripeElement;

  elementsOptions: ElementsOptions = {
    locale: 'es',
  };

  constructor(
    private stripeService: StripeService,
    private paymentService: PaymentService,
    private factureservice: FactureService,
    private auth: AuthService,

    private router: Router,
    private toastr: ToastrService
  ) {}

  public stripeForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.stripeService.elements(this.elementsOptions).subscribe((elements) => {
      this.elements = elements;
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0',
              },
            },
          },
        });
        this.card.mount('#card-element');
      }
    });
  }

  buy() {
    const name = this.stripeForm.get('name').value;
    this.stripeService.createToken(this.card, { name }).subscribe((result) => {
      if (result.token) {
        const paymentIntentDto: PaymentIntentDto = {
          token: result.token.id,
          amount: this.montantFacture * 100,
          currency: 'EUR',
          description: this.datefacture,
        };
        this.paymentService.pagar(paymentIntentDto).subscribe((data) => {
          let re = eval(data);

          this.confirmar(re.id);
          this.toastr.success(
            'Notification',
            'Payment has been mad succesfully'
          );

          this.factureservice.Closefacture(this.idFacture).subscribe((res) => {
            window.location.reload();
          });
        });
        this.error = undefined;
      } else if (result.error) {
        this.error = result.error.message;
      }
    });
  }

  confirmar(id: string): void {
    this.paymentService.confirmar(id).subscribe(
      (data) => {
        console.log('sucess');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
