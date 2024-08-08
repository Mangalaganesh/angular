import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-updatestudent',
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})
export class UpdatestudentComponent implements OnInit{

  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public address: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  studentId: number;
  editForm: FormGroup;
  student: Student;

  constructor(

    private formBuilder: FormBuilder,
    private routerr: ActivatedRoute, // Add ActivatedRoute to constructor
    public so: StudentService,
    private _snackBar: MatSnackBar,
    public route: Router,
    public dialogRef: MatDialogRef<UpdatestudentComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: { id: number }
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit(): void {
    this.so.getById(this.data.id).subscribe((student: Student) => {
      this.firstName = student.firstName;
      this.lastName = student.lastName;
      this.email = student.email;
      this.phone = student.phone;
      this.address = student.address;

    });
  }

  onSubmit(){
    
  }

  // onSubmit(): void {
   
  //   const updatedStudentData = {
  //     id: this.data.id,
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //     phone: this.phone,
  //     address: this.address
  //   };
   

  //   this.so.updateEmployee(updatedStudentData).subscribe(response => {
  //    const statusCode = response.status;

  //     if (statusCode === 500) {
  //       alert("Internal Server error");
  //     } else {
  //       console.log("return data", response);
  //       this.dialogRef.close(updatedStudentData);
        
  //       // this.openSnackBar();
  //       Swal.fire({
  //         title: 'Success!',
  //         text: 'Your data has been updated successfully...',
  //         icon: 'success',
  //       });
  //        window.location.reload();

  //     }

  //   });
  //   this.dialogRef.close(updatedStudentData);

    

  // }

  cancel(): void {
    this.dialogRef.close(); 
  }


  openSnackBar() {
    this._snackBar.open('Updated Successfully!!', 'ok', {
    });
    this.route.navigate(['/viewstudent'])
  }

}
