import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { SkillService } from 'src/app/DataService/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit,AfterViewInit {
  form!:FormGroup;
  form1!:FormGroup;
  submitted=false;
  model={name:"",checked:"",_id:""};
  constructor(private formBuilder:FormBuilder,private http:SkillService) { }
  ngAfterViewInit(): void {
    this.ListSkill();
  }
 
  public exampleData!: Array<Select2OptionData>;
  allSkills:any;
  ngOnInit(): void {
    this.exampleData = [
      {
        id: 'basic1',
        text: 'School'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
    this.ListSkill();
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
    category:['',Validators.required]
  });

  this.form1 = this.formBuilder.group({
    name:['',Validators.required],
    is_active:[''],
    _id:['',Validators.required],
    category:['',Validators.required]
  });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  
  AddSkill()
  {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.invalid)
    {
      return;
    }
    else{
      return this.http.AddSkill(this.form.value).subscribe(res=>{
        if(res.is_success)
        {
          alert(res.message);
          this.ListSkill();
        }
      },error=>{
        alert(error)
      })
    }
  }

  ListSkill()
  {
    return this.http.ListSkill().subscribe(res=>{
      if(res.is_success)
      {
        console.log(res.data);
        this.allSkills = res.data;
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

  UpdateSkill()
  { 
    console.log(this.form1.value);
    if(this.form1.invalid)
    {
      return;
    }
    else{
    this.http.UpdateSkill(this.form1.value).subscribe(res=>{
      console.log(res);
      if(res.is_success)
      {
        alert(res.message);
        this.ListSkill();
      }
    },error=>{
      alert(error);
    })}
  }

  CloseEditModal()
  {
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "none";
  }
}
