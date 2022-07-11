import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { DetailComponent } from 'src/app/BackClient/modules/stock/detail/detail.component';
import { DetailFacture } from 'src/app/Models/DetailFacture';
import { DetailFactureService } from 'src/app/Services/detail-facture.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  list: DetailFacture[];
  @ViewChild('demo',{static:false}) el!: ElementRef;


  constructor(private us:DetailFactureService,private uss: ActivatedRoute) { }

  ngOnInit(): void {


    this.uss.paramMap.subscribe(
      res=>{
       let u=res.get('id');

        this.us.getDetailFacture(u).subscribe(res=>{
         this.list=res;
         console.log(this.list);
        return  this.list
         
        })
    }
  )
  ;
  }


  makePDF()
  {
    let pdf=new  jsPDF('p','pt','a1');
    pdf.html(this.el.nativeElement,{callback:(pdf)=>{pdf.save("Facture.pdf");
    }})
    
  }

}
