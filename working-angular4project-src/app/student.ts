export class Student {

    student_id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender:string;
    address: string;
    dob:string;
    courses:{course_id:number,name:string}[]=[];
}
