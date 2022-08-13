import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistrictService } from 'src/app/DataService/district.service';
import { StateService } from 'src/app/DataService/state.service';
import Validation from 'src/app/utils/validation';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  form!:FormGroup;
  form1!:FormGroup;
  submitted = false;
  allStates:any;
  page:number=200;
  allDistricts:any;
  model={name:"",checked:"",_id:""};
  constructor(private formBuilder:FormBuilder,private http:DistrictService,private stateservice:StateService) { }

  ngOnInit(): void {
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
      name:['',Validators.required],
      abbreviation:['',Validators.required],
      state_id:['',Validators.required],

    });

    
    this.form1 = this.formBuilder.group({
      name:['',Validators.required],
      abbreviation:['',Validators.required],
      state_id:['',Validators.required],
      _id:['']
    });

   this.ListState();
   this.ListDistricts();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.form1.controls;
  }
  
  AddDistrict()
  {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.invalid)
    {
      return;
    }
    else{
      return this.http.AddDistrict(this.form.value).subscribe(res=>{
        if(res.is_success)
        {
          alert("District added successfully");
        }
      },error=>{})
    }
  }

  ListState()
  {
     this.stateservice.ListState(this.page).subscribe(res=>{
      if(res.is_success)
      { 
        this.allStates = res.data;
        console.log(this.allStates);
      }
     },error=>{})
  }

  ListDistricts()
  {
    return this.http.ListDistrict().subscribe(res=>{
      if(res.is_success)
      {
        this.allDistricts =res.data;
        console.log(this.allDistricts);
      }
    },error=>{})
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
  UpdateDistrict()
  {
    this.submitted = true;
    console.log(this.form1.value);
    if(this.form1.invalid)
    {
      return;
    }
    else{
      return this.http.UpdateDistrict(this.form1.value).subscribe(res=>{
        if(res.is_success)
        {
          alert(res.message);
          this.ListDistricts();
        }
      },error=>{
        alert(error)
      })
    }
  }
}
