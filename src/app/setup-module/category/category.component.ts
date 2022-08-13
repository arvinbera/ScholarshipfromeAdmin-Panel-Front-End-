import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { CategoryService } from 'src/app/DataService/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  form!:FormGroup;
  form1!:FormGroup;
  submitted=false;
  allCategories:any;
  model={name:"",checked:"",_id:""};
  constructor(private formBuilder:FormBuilder,private http:CategoryService) { }
  
  ngOnInit(): void {
    this.ListCategory();
    var modal_open_btn = document.getElementById("modal_open_btn");
    var modal = document.getElementById("myModal") as any;

    var modal_close_btn = document.getElementById("modal_close_btn");
    var modal_close_btn1 = document.getElementById("modal_close_btn1");

    modal_open_btn?.addEventListener("click", function () {
      modal.style.display = "block";
      
    });

    modal_close_btn?.addEventListener("click", function () {
      modal.style.display = "none";
    });

    modal_close_btn1?.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    this.form = this.formBuilder.group({
      name:['',Validators.required],
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
  OpenEditModal(a:any)
  {
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "block";
    this.model.name = a.name;
    this.model.checked = a.is_active;
    this.model._id = a._id;
  
  }
  CloseEditModal()
  {
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "none";
  }
  AddCategory()
  {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.invalid)
    {
      return;
    }
    this.http.AddCategory(this.form.value).subscribe(res=>{
      if(res.is_success)
      {
        alert("Category added successfully");
        this.ListCategory();
      }
    },error=>{
      alert(error);
    })
  }
  
  UpdateCategory()
  {
    this.submitted = true;
    console.log(this.form1.value);
    if(this.form1.invalid)
    {
      return;
    }
    this.http.PutCategory(this.form1.value).subscribe(res=>{
      console.log(res);
      if(res.is_success)
      {
        alert("Category updated successfully");
        this.ListCategory();
        var modal = document.getElementById("myEditModal") as any;
        modal.style.display = "none";
      }
    },error=>{})
  }
  ListCategory()
  {
    return this.http.ListCategory().subscribe(res=>{
      if(res.is_success)
      {
        this.allCategories = res.data;
      }
    },error=>{})
  }

}
