import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { UpdatestudentComponent } from '../updatestudent/updatestudent.component';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../student';


@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.css']
})
export class ViewstudentComponent {

  getstudent: any;

  student:Student[]=[];

  constructor(public so:StudentService,private router: Router,private dialog: MatDialog) {
    this.so.getstudent().subscribe((data:any)=>{
      console.log("get return data",data);
      this.getstudent=data
    })

  }

  openEditDialog(studentId: number) {
    console.log("EDIT");
    console.log(studentId);
    const dialogRef = this.dialog.open(UpdatestudentComponent, {
        width: '550px', 
        data: { id: studentId } 
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("EDIT");
    });
}

editstudent(student:any){
  const id = student.student_id;
  this.router.navigate(['/form',id]);
}






  deleteStudent(studentdata: any) {
    console.log("Delete");
    const studentId = studentdata.student_id;
    this.so.deleteStudent(studentId).subscribe(
      (response) => {
        console.log('Delete successful:', response);
        alert("Deleted successfully");
        window.location.reload();
        
      },
      (error) => {
        console.error('Error deleting data:', error);
      }
    );
  }

 

  

 

 






}
