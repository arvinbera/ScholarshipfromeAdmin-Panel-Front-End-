import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import BaseCore from 'src/app/core/BaseCore';
import { ScholarshipserviceService } from 'src/app/DataService/scholarshipservice.service';
import { StateService } from 'src/app/DataService/state.service';
import { Gender } from 'src/app/enum/Gender';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { QualificationService } from 'src/app/DataService/qualification.service';
import { CategoryService } from 'src/app/DataService/category.service';
@Component({
  selector: 'app-addscholarship',
  templateUrl: './addscholarship.component.html',
  styleUrls: ['./addscholarship.component.css']
})
export class AddscholarshipComponent implements OnInit {
  htmlOutput: any;
  public data: any[] = [];
  submitted = false;
  genders: any[] = [];
  page: number = 200;
  public loadContent: boolean = false;
  public settings = {};
  dropdownList: any[] = [];
  dropdownQualificationList: any[] = [];
  allQualifications: any;
  allCategories: any;
  dropdownSettings: IDropdownSettings = {};
  dropdownQualificationSettings: IDropdownSettings = {};
  ngOnInit(): void {
    this.genders = BaseCore.ToEnumList(Gender);
    this.StateList();
    this.QualificationList();
    this.CategoryList();
    this.dropdownSettings = {
      idField: '_id',
      textField: 'name',
    };
    this.dropdownQualificationSettings = {
      idField: '_id',
      textField: 'name',
    };
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    states: new FormControl(this.data, Validators.required),
    scholarship_description: new FormControl('', Validators.required),
    award: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    provide: new FormControl('', Validators.required),
    eligibility: new FormControl('', Validators.required),
    documents: new FormControl('', Validators.required),
    apply: new FormControl('', Validators.required),
    applicationlink: new FormControl('', Validators.required),
    qualifications: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });
  constructor(private formBuilder: FormBuilder, private http: ScholarshipserviceService, private stateservice: StateService, private qualificationservice: QualificationService,private categoryservice: CategoryService) { }
  StateList() {

    return this.stateservice.ListState(this.page).subscribe(res => {
      if (res.is_success) {

        var states = res.data as any[];
        this.dropdownList = states;

      }
    }, error => { })
  }
  SetImage(event: any) {
    debugger
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

  CategoryList()
  {
    return this.categoryservice.ListCategory().subscribe(res=>{
      if(res.is_success)
      {
        this.allCategories = res.data;
      }
    },error=>{})
  }
  getGenderName(gender:any){
    return Gender[gender];
   }
   
  QualificationList() {
    return this.qualificationservice.ListQualification().subscribe(res => {
      if (res.is_success) {
        console.log(res.data)
        this.allQualifications = res.data;
        this.dropdownQualificationList = this.allQualifications.data;

      }
    }, error => { })
  }
  AddScholarship() 
  { debugger
    this.submitted = true;

    const x = this.form.value;
    var model=x;
    var states = (model.states) ? model.states as any[] : [];
    var qualifications = (model.qualifications) ? model.qualifications as any[] : [];
    model.qualifications = qualifications.map(i => i._id).join(",");
    model.states = states.map(i => i._id).join(",");
    console.log(model);

    if (this.form.invalid) {
      return;
    }
    else {
      let p = this.ConvertFormData(model);
      return this.http.AddScholarship(p).subscribe(res => {
        debugger
        if (res.is_success) {
          alert(res.message);
        }
      }, error => { })
    }
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


}
