import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/DataService/state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  form!: FormGroup;
  form1!: FormGroup;
  submitted = false;
  allStates: any;
  pages: Array<Number> = [];
  pageNumber:any;
  model={name:"",checked:"",_id:""};
  constructor(private formBuilder: FormBuilder, private http: StateService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.pageNumber = this.router.snapshot.paramMap.get("id");
    console.log(this.pageNumber);
    this.ListState();
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
      name: ['', Validators.required]
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
    return this.form.controls;
  }
  StateList(x)
  {
   this.pageNumber=x;
   this.ListState();
  }
  AddState() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    else {
      return this.http.AddState(this.form.value).subscribe(res => {
        if (res.is_success) {
          alert("State added successfully");
          this.ListState();
        }
      }, error => { })
    }
  }

  counter(i) {
    return new Array(i);
  }
  ListState() {
    this.http.ListState(this.pageNumber).subscribe(res => {
      if (res.is_success) {
        this.allStates = res.data;
        this.pages = this.allStates.totalPages;

      }
    }, error => { })
  }

  OpenEditModel(a:any)
  {
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "block";
    this.model.name = a.name;
    this.model.checked = a.is_active;
    this.model._id = a._id;
  }

  UpdateState()
  {
    
    console.log(this.form1.value);
    if(this.form1.invalid)
    {
      this.submitted = true;     
      return;
    }
    else{
      return this.http.UpdateState(this.form1.value).subscribe(res=>{
        if(res.is_success)
        {
          alert(res.message);
          this.ListState();
          var modal = document.getElementById("myEditModal") as any;
          modal.style.display = "none";
        }
      },error=>{
          alert(error);
      })
    }
  }

  CloseEditModal()
  {
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "none";
  }

}
