import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,AbstractControl,Validators,ValidatorFn } from '@angular/forms';
import { QualificationService } from 'src/app/DataService/qualification.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {
  form!:FormGroup;
  form1!:FormGroup;
  submitted=false;
  allQualifications:any;
  model={name:"",checked:"",_id:""};
  constructor(private formBuilder:FormBuilder,private http:QualificationService) { }

  ngOnInit(): void {
    this.ListQualification();
    var modal_open_btn = document.getElementById("modal_open_btn");
    var modal = document.getElementById("myModal") as any;

    var modal_close_btn = document.getElementById("modal_close_btn");

    modal_open_btn?.addEventListener("click", function () {
      modal.style.display = "block";
    });

    modal_close_btn?.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    this.form = this.formBuilder.group({
      name:['',Validators.required]
    });

    this.form1 = this.formBuilder.group({
      name:['',Validators.required],
      is_active:[''],
      _id:['',Validators.required]
    });
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.form1.controls;
  }

  AddQualification()
  {
    this.submitted=true;
    console.log(this.form.value);
    if(this.form.invalid)
    {
      return;
    }
    this.http.AddQualification(this.form.value).subscribe(res=>{
      console.log(res)
      if(res.is_success)
      {
        alert("Qualification added successfully");
        this.ListQualification();
      }
    },error=>{
       alert(error);
    })
  }

  ListQualification()
  {
    return this.http.ListQualification().subscribe(res=>{
      if(res.is_success)
      {
        this.allQualifications = res.data;
        console.log(this.allQualifications.data)
      }
    },error=>{})
  }
  
  UpdateQualification()
  {
    console.log(this.form1.value)
    this.http.UpdateQualification(this.form1.value).subscribe(res=>{
    
      if(res.is_success)
      {
        alert("Qualification updated successfully");
        this.ListQualification();
        var modal = document.getElementById("myEditModal") as any;
        modal.style.display = "none";
      }
    },error=>{
        alert(error);
    })
  }
  
  OpenEditModal(a:any)
  {
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "block";
    this.model.name = a.name;
    this.model.checked = a.is_active;
    this.model._id = a._id;
    console.log(this.model);
  }
  CloseEditModal()
  {
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "none";
  }
}
