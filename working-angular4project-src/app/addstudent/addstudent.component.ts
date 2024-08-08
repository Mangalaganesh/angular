import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {

  options: string[] = ['AWS', 'DATASCIENCE', 'NODEJS', 'DOTNET', 'AI', 'SQL'];
  selectedOptions: string[] = [];

  myForm: FormGroup;
  studentdetailsForm: FormGroup;
  tab3: FormGroup;

  userFormData: any;
  selectedTabIndex = 0;

  studentdetailsFormData: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // @ViewChild("doc") fileInput: ElementRef | null = null;
  // @ViewChild('doc') fileInput: ElementRef;
  // @ViewChild('doc') fileInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild("doc") fileInput: ElementRef | null = null;

  fileToUpload: File | null = null;

  url = '';

  editMode: boolean = false;

  hasFileUploaded: boolean = false;
  showAddedImage: boolean = false;


  studentId: string;
  userFormDataName: string;
  userFormDataEmail: string;

  constructor(private fb: FormBuilder, public so: StudentService, private _snackBar: MatSnackBar,
    public route: Router, public activateroute: ActivatedRoute) {

    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],

      // dob: ['', Validators.required],
      gender: ['', Validators.required],

      email: ['', Validators.required],
      phone: ['', Validators.required],
      courses: [''],
    });

    this.studentdetailsForm = this.fb.group({

      selectedOptions: [[], Validators.required],
      dob: ['', Validators.required],
    });
    this.tab3 = this.fb.group({
      filerequired: [[], Validators.required]
    })
  }


  ngOnInit() {
    this.activateroute.paramMap.subscribe(params => {
      const studentid = params.get('id');
      if (studentid) {
        this.editMode = true;
        this.fetchstudentdata(studentid);
      }
    });

  }

  removeFile() {
    // Function to remove the uploaded file
    // Reset the file related variables or fields
    this.hasFileUploaded = false;
    this.fileToUpload = null; // Clear the file object if needed
    // Reset the form control to null or an empty value
    this.myForm.get('filerequired')?.setValue(null);
  }




  fetchstudentdata(studentid: string) {
    
    this.so.getById(parseInt(studentid, 10)).subscribe((student: any) => {

      this.hasFileUploaded = !!student.fileData;

      console.log('Fetched Student Data:', student);
      console.log('student.fileData=====>:', student.fileData);

      // this.url = student.fileData;
      this.url = 'data:image/png;base64,' + student.fileData;

// Convert base64 data to File object
const byteCharacters = atob(student.fileData);
const byteNumbers = new Array(byteCharacters.length);
for (let i = 0; i < byteCharacters.length; i++) {
  byteNumbers[i] = byteCharacters.charCodeAt(i);
}
const byteArray = new Uint8Array(byteNumbers);
const blob = new Blob([byteArray], { type: 'image/png' });

// Create File object from Blob
const file = new File([blob], 'image.png', { type: 'image/png' });


this.fileToUpload = file;

      

      console.log('url=====>:', this.url);

      this.myForm.patchValue({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        address: student.address,
        gender: student.gender

      });


      const selectedOptions = student.courses.map((course: any) => {
        return course.name;
      });

      this.studentdetailsForm.patchValue({
        selectedOptions: selectedOptions,
        dob: student.dob,
      });


      this.tab3.patchValue({
        // filerequired: this.url
      })


    },
      error => {
        console.error('Error fetching student data:', error);
      }
    );
  }


  moveToNextTab1() {
    if (this.myForm.valid) {
      if (this.selectedTabIndex < 2) {
        this.selectedTabIndex++;
        this.userFormDataName = this.myForm.get('firstName')?.value
        this.userFormDataEmail = this.myForm.get('email')?.value
      }
    }
    this.userFormData = {
      firstName: this.myForm.get('firstName')?.value,
      lastName: this.myForm.get('lastName')?.value,
      address: this.myForm.get('address')?.value,
      phone: this.myForm.get('phone')?.value,
      // dob: this.myForm.get('dob')?.value,
      gender: this.myForm.get('gender')?.value,
      email: this.myForm.get('email')?.value
    };

    console.log("FORM 1: ", this.userFormData);

  }

  moveToPreviousTab() {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  moveToNextTab2() {
    if (this.studentdetailsForm.valid) {
      this.studentdetailsFormData = this.studentdetailsForm.value;


      this.selectedTabIndex++;
    }
    else {
      this.studentdetailsForm.markAllAsTouched();
    }
  }


  onFileSelected(event: Event): void {
    this.showAddedImage = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log("File attached........... ");
      this.fileToUpload = input.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          this.url = event.target.result;
        }
      }

    }
  }

  getStudentId(): string | null {
    const studentId = this.activateroute.snapshot.paramMap.get('id');
    return studentId;
  }


  // ngAfterViewInit() {
  //   Access file input element here
  //   this.fileInput = this.fileInput.nativeElement; 
  // }

  submitform() {
    console.log("FORM 1: ", this.myForm.value);
    console.log("FORM 2: ", this.studentdetailsForm.value);
    // this.myForm.value.courses = this.studentdetailsForm.value.selectedOptions;
    // console.log("tab3", this.myForm.value)



    //trying start
    if (this.editMode) {

    

      console.log("editzzzzzzzzz");

      const std_id = this.getStudentId();
      console.log("std_idddddddd", std_id);

      const formdata = new FormData();
      const dataToSend = {
        userInfo: this.myForm.value,
        academicInfo: this.studentdetailsForm.value,
        // student_id:std_id
      };

      formdata.append('dataToSend', JSON.stringify(dataToSend));
      console.log("DATA TO SEND :", dataToSend);

      // formdata.append('student_id', std_id); 

      console.log(">>dataToSend>>>", dataToSend);

    

      // if (this.fileInput && this.fileInput.nativeElement.files.length > 0) {
      //   console.log("File input present...");
      //   const file = this.fileInput.nativeElement.files[0];
      //   console.log("Selected File:", file);
  
      //   formdata.append('file', file);
      // } else {
      //   console.log("No file selected...");
      // }



      // if (this.fileInput) {
      //   console.log("file input.......");
      //   const file = this.fileInput.nativeElement.files[0];
      //   if (file) {
      //     console.log("file theree......", file);
      //     formdata.append('file', file);
      //   }
      // }

      if (this.fileToUpload) {
          formdata.append('file', this.fileToUpload);
        }else {
            console.log("No file selected...");
           }


           console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n", formdata.get('file'))
           console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n", formdata.get('dataToSend'))
      

      // if (this.fileToUpload) {
      //   formdata.append('file', this.fileToUpload, this.fileToUpload.name);
      //   console.log(">>File>>>", formdata);
      // }





      this.so.updateEmployee(formdata, std_id).subscribe(response => {
        console.log(response);
        Swal.fire({
          title: 'Updated!',
          text: 'Your data has been Updated.',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
            // window.location.reload();
            this.route.navigate(['/viewstudent'])
          }
        });
      })
      // const statusCode = response.status;

      // formdata.append('id', std_id);

      //  if (statusCode === 500) {
      //    alert("Internal Server error");
      //  } else {
      //    console.log("return data", response);



      //      Swal.fire({
      //        title: 'Success!',
      //        text: 'Your data has been updated successfully...',
      //        icon: 'success',
      //      });
      //       window.location.reload();

      //    }

      //  });
    } else {

      const formdata = new FormData();

      const dataToSend = {
        userInfo: this.myForm.value,
        academicInfo: this.studentdetailsForm.value,

      };

      console.log("userInfo", dataToSend.userInfo);
      console.log("academicInfo", dataToSend.academicInfo);
      formdata.append('dataToSend', JSON.stringify(dataToSend));

      if (this.fileToUpload) {
        formdata.append('file', this.fileToUpload, this.fileToUpload.name);
        console.log(">>File>>>", formdata);
      }

      if (!this.fileToUpload) {
        console.log('No file selected');
        return;
      }

      // formdata.append('dataToSend', new Blob([JSON.stringify(dataToSend)], { type: 'application/json' }));

      console.log("DATA TO SEND :", dataToSend);

      console.log("FORM DATA", formdata);
      // this.so.addstudent(this.myForm.value).subscribe((data: any) => {
      this.so.addstudent(formdata).subscribe(response => {

        const statusCode = response.status;

        if (statusCode === 500) {
          alert("Internal Server error");
        } else {
          // alert(response.body);

          // console.log('Student registered:', response);
          console.log("return data", response);
          // this.openSnackBar();
          Swal.fire({
            title: 'Success!',
            text: 'Your data has been registered successfully...',
            icon: 'success',
          });
          this.route.navigate(['/viewstudent'])
        }

      });
    }
  }



  openSnackBar() {
    this._snackBar.open('Added Successfully!!', 'ok', {
    });
    this.route.navigate(['/viewstudent'])
  }

  clear() {
    this.myForm.reset();

  }

  clearTab2() {
    this.studentdetailsForm.reset();
  }

  reload() {
    location.reload();
  }




}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

