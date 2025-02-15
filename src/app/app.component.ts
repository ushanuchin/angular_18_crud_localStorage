import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Employee } from './model/employee';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = "";


  employeeForm: FormGroup = new FormGroup({});
  employeeeObj: Employee = new Employee();
  employeeList: Employee[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData !== null) {
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeeObj.empId),
      empName: new FormControl(this.employeeeObj.empName, [Validators.required]),
      city: new FormControl(this.employeeeObj.city, [Validators.required, Validators.minLength(3)]),
      contactNo: new FormControl(this.employeeeObj.contactNo),
      emailId: new FormControl(this.employeeeObj.emailId),
      state: new FormControl(this.employeeeObj.state),

    })
  }

  saveEmployee() {
    const oldData = localStorage.getItem("EmpData");
    if (oldData !== null) {
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);

    }
    else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));


  }

  resetEmployee() {
    this.employeeeObj = new Employee();
    this.createForm();
  }
  editEmployee(item: Employee) {
    this.employeeeObj = item;
    this.createForm();

  }

  updateEmployee() {
    const rec = this.employeeList.find(m => m.empId == this.employeeForm.controls['empId'].value);
    if (rec != undefined) {
      rec.empName = this.employeeForm.controls['empName'].value;
      rec.city = this.employeeForm.controls['city'].value;
      rec.contactNo = this.employeeForm.controls['contactNo'].value;
      rec.emailId = this.employeeForm.controls['emailId'].value;
      rec.state = this.employeeForm.controls['state'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.resetEmployee();
  }

  deleteEmployee(id: number) {
    const isDelete = confirm("r u sure want to delete");
    if (isDelete) {
      const index = this.employeeList.findIndex(m => m.empId == id);
      this.employeeList.splice(index, 1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }
}
