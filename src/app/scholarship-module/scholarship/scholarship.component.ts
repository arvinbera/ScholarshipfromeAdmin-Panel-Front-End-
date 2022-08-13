import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import BaseCore from 'src/app/core/BaseCore';
import { CategoryService } from 'src/app/DataService/category.service';
import { QualificationService } from 'src/app/DataService/qualification.service';
import { ScholarshipserviceService } from 'src/app/DataService/scholarshipservice.service';
import { StateService } from 'src/app/DataService/state.service';
import { Gender } from 'src/app/enum/Gender';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css'],
})
export class ScholarshipComponent implements OnInit {

  constructor(private http:ScholarshipserviceService, private stateservice: StateService,private qualificationservice: QualificationService,
    private categoryservice:CategoryService) { }
  allScholarships:any;
  model:any={} as any;
  public settings = {};
  dropdownList: any[] = [];
  dropdownQualificationList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedStates: IDropdownSettings ={};
  selectedQualification: IDropdownSettings ={};
  page: number = 200;
  genders: any[] = [];
  allCategories:any;
  ScholarshipList()
  {
    return this.http.ListScholarship().subscribe(res=>{
      
      console.log(res);
      if(res.is_success)
      {
        this.allScholarships=res.data;
        console.log(this.allScholarships.data);
      }
    },error=>{})
  }

  CategoryList()
  {
     return this.categoryservice.ListCategory().subscribe(res=>{
      if(res.is_success)
      {
        this.allCategories=res.data;

      }
     },error=>{})
  }
  OpenScholarshipView(a:any)
  {
    var modal_open_btn = document.getElementById("modal_open_btn");
    var modal = document.getElementById("myModal") as any;
    modal.style.display = "block";
    this.model=a;

    
  }

  getGenderName(gender:any){
   return Gender[gender];
  }

  closeScholarshipView()
  {
    var modal_close_btn = document.getElementById("modal_close_btn");
    var modal = document.getElementById("myModal") as any;
    modal.style.display = "none";
  }

  closeEditScholarshipView()
  {
    var modal_close_btn = document.getElementById("modal_close_btn");
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "none";
  }

  OpenScholarshipEditView(b:any)
  {
    var modal_open_btn = document.getElementById("modal_open_edit_btn");
    var modal = document.getElementById("myEditModal") as any;
    modal.style.display = "block";
    this.model=b;
    
    
    var selectedStates=[] as any[];
    this.model.scholarship_states?.forEach((element:any) => {
      
      var state={"_id":element.state_id,"name":element.state?.name} as any;
      selectedStates.push(state);
    });

    this.model.selectedStates=selectedStates;

    this.model.deadline_date=this.model.deadline_date?.substring(0,10)
  
    var selectedQualification = [] as any[];
    this.model.scholarship_qualifications?.forEach((element:any)=>{
    debugger;
      var qualification={"_id":element.qualification_id,"name":element.qualification?.name} as any;
      selectedQualification.push(qualification);
    });
    this.model.selectedQualification=selectedQualification;
    
  }

  config: any = {
    placeholder: '',
    tabsize: 2,
    height: '200px',

    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
  UpdateScholarship()
  {
    var model=this.form.value;
    console.log(model);
    model._id=this.model._id;
    var states=model.states as any[];
    var qualifications=model.qualifications as any[];
    model.states=states.map(i=>i._id).join(",");
    model.qualifications=qualifications.map(i=>i._id).join(",");
    
    let p = this.ConvertFormData(model);
    return this.http.UpdateScholarship(p).subscribe(res=>{
      if(res.is_success)
      {
        alert("Scholarship updated");
      }
    },error=>{
      alert(error);
    })
  }

  SetImage(event: any) {
    const [file] = event.target.files;
    this.form.patchValue({
      image: file
    });
  }

  ConvertFormData(model: any) {
    let formData = new FormData();
    for (let key in model) {
      formData.append(key, model[key]);
    }
    return formData;
  }
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    states: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
    award: new FormControl('', Validators.required),
    deadline_date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    provider_name: new FormControl('', Validators.required),
    eligibility: new FormControl('', Validators.required),
    documents_needed: new FormControl('', Validators.required),
    how_to_apply: new FormControl('', Validators.required),
    application_link: new FormControl('', Validators.required),
    qualifications: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    provider_details:new FormControl('',Validators.required)
  });
  ngOnInit(): void {
    this.ScholarshipList();
    this.StateList();
    this.CategoryList();
    this.QualificationList();
    this.dropdownSettings = {
      idField: '_id',
      textField: 'name',
    };
    this.genders = BaseCore.ToEnumList(Gender);
    this.selectedStates = {
      idField: '_id',
      textField: 'name',
    };


    var modal=document.getElementById("myEditModal");
    window.onclick=function(event:any){
      if(event.target==modal){
        var myEditModal = document.getElementById("myEditModal") as any;
        myEditModal.style.display = "none";
      }
    }
  }

  StateList() {

    return this.stateservice.ListState(this.page).subscribe(res => {
      if (res.is_success) {

        var states = res.data as any[];
        this.dropdownList = states;
        
      }
    }, error => { })
  }

  QualificationList() {
    return this.qualificationservice.ListQualification().subscribe(res=>{
      if(res.is_success){
         var qualifications = res.data as any;
        
         this.dropdownQualificationList = qualifications.data;
        
      }
    },error=>{})
  }

}
