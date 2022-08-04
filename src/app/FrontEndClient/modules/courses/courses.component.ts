import { OffresService } from 'src/app/Services/offres.service';
import { Component, OnInit } from '@angular/core';
import { Offers } from 'src/app/Models/Offers';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  listCourse:Offers[];
  searchtext:any
  constructor(public OffresService:OffresService) { }

  ngOnInit(): void {

    this.getAllOffres();
  }


  getAllOffres() {
    this.OffresService.getAllOffers().subscribe((res) => {
      this.listCourse = res;

   
      
    });
  }

}
