import { NONE_TYPE } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,AbstractControl,Validators,ValidatorFn } from '@angular/forms';
import { UserDataServiceService } from 'src/app/DataService/user-data-service.service';
import Validation from 'src/app/utils/validation';
import * as XLSX from 'xlsx';
//import * as jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  form!: FormGroup;
  submitted= false;
  allUsers:any;
  constructor(private formBuilder: FormBuilder,private http:UserDataServiceService){}
  @ViewChild('content') content!: ElementRef; 
  ngOnInit(): void {
    this.ListUser();
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
      user_name:['',
       [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
        ]
      ],
      mobile:['',Validators.required],
      email:['',
      [Validators.required,
      Validators.email]],
     password:['',
     [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]
      
    ],
     confirm_password:['',Validators.required]
    },
    {
      validators:[Validation.match('password','confirm_password')]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  fileName= 'ExcelSheet.xlsx';
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  
  // SavePDF(): void
  // {
  //   let content=this.content.nativeElement;  
  //   let doc = new jsPDF('p', 'mm', 'a4');  
  //   let _elementHandlers =  
  //   {  
  //     '#editor':function(element,renderer){  
  //       return true;  
  //     }  
  //   };  
  //   doc.fromHTML(content.innerHTML,15,15,{  
  
  //     'width':190,  
  //     'elementHandlers':_elementHandlers  
  //   });  
  
  //   doc.save('test.pdf');  
  // }
  public SavePDF(): void {
    let DATA: any = document.getElementById('content');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('user-list.pdf');
    });
  }
  AddUser():void
  {
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.invalid)
    {
      return;
    }
    this.http.AddUser(this.form.value).subscribe(res=>{
      console.log(res);
      if(res.is_success)
      {
        alert("User added successfully");
      }
    },error=>{})

  }

  ListUser()
  {
    this.http.ListUser().subscribe(res=>{
      if(res.is_success)
      {
        this.allUsers=res.data;
      }
    },error=>{})
  }

}
