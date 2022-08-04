import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Offers } from 'src/app/Models/Offers';
import { OffresService } from 'src/app/Services/offres.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  formoffres: FormGroup;
  userFile;
  imgURL: any;
  public message: string;
  public imagePath;


  searchtext:any;
  listeOffres:Offers[];
  ob: Subscription;
  OffresObject:Offers;


  constructor(public OffreService : OffresService,private toastr: ToastrService,private formbuider: FormBuilder) { }

  ngOnInit(): void {

    this.infoForm();

    this.getAllCourses();

  }


  infoForm() {
    this.formoffres = this.formbuider.group({
     
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],

      coach: ['', [Validators.required]],

      placedispo: ['', [Validators.required]],
      destigneaquellepersonne: ['', [Validators.required]],
      fileName: ['', [Validators.required]],


    });
  }




  getAllCourses()
  {
    this.ob=this.OffreService.getAllOffers().subscribe(res => {
      this.listeOffres = res;
    });
  }

  DeleteCourses(id: number)
  {

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

        this.ob=this.OffreService.deleteOffersById(id).subscribe(

          res => {
            this.getAllCourses();

          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      }
    });


  }




  addoffres()
  {

    const formData = new FormData();

    const offre = this.formoffres.value;

    this.formoffres.reset();

    console.log(offre);
    formData.append('offre', JSON.stringify(offre));
    formData.append('file', this.userFile);
    this.ob = this.OffreService
      .createData(formData)
      .subscribe((data) => {
       
          this.getAllCourses();

          let ref = document.getElementById('cancel');
          ref?.click();
          this.toastr.success('Notification', 'Succesfully Added Product');
        
        
        
        
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

}
