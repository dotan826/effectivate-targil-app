import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private formBuilder: FormBuilder
  ){}

  typeOfContact: string[] = ["Email", "Phone"];    // Selection Options (Type of Contact)

  /**
   * Contact List Counter
   * 
   * @description
   * each Contact recognized by a Specific Number in the array.
   * each Number(Contact) has a unique 3 Form Controls : Type, Label and Value.
   * each of these Controls Names End with the Number(Contact) so we can Distinguish between each Contact values.
   */
  contactListCounter: number[] = [0];              // Contact List Counter
                                      
  userForm = this.formBuilder.group({
    name: ['', Validators.required],                       // Name
    organization: [''],                                    // Organization
    type0: ['Email'],                                      // Type of Contact
    label0: ['', Validators.required],                     // Contact Label
    value0: ['', [Validators.email, Validators.required]]  // Email/Phone Number
  });

  /**
   * Get Error Message according to Validation
   * 
   * @param inputName Name of the control which associated with the Input Element
   * @returns Error String to show beneath the Input Element
   */
  getErrorMessage = (inputName: string) => {
    if(inputName.includes("name")){
      if(this.userForm.controls["name"].invalid){                      // Name Validation Error
        return "Name is required !";
      }
    }
    else if(inputName.includes("value")){
      if(this.userForm.controls[inputName].hasError("email")){         // Email Validation Error
        return "Email is not valid !";
      }
      else if(this.userForm.controls[inputName].hasError("pattern")){  // Phone Validation Error (special pattern)
        return "Phone no. is not valid !";
      }
      else if(this.userForm.controls[inputName].invalid){              // Email/Phone Validation Error
        return "Email/Phone no is required !";
      }
    }
    else if(inputName.includes("label")){
      if(this.userForm.controls[inputName].hasError("required")){      // Contact Label Validation Error
        return "Label is required !";
      }
    }
  }

  /**
   * Update Control Validation when Type Change (Email/Phone)
   * 
   * @param type the selected object type - we get the string value from it - so it is "Email" or "Phone"
   * @param contactNumber Contact Number as in the Contact List Counter Array
   */
  onTypeChange = (type: any, contactNumber: number) => {
    if(type.value.localeCompare("Phone") === 0){
      this.userForm.setControl("value" + contactNumber, this.formBuilder.control('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])); // Phone Validation
    }
    else{
      this.userForm.setControl("value" + contactNumber, this.formBuilder.control('', [Validators.email, Validators.required])); // Email Validation
    }
  }

  /**
   * Remove Contact
   * 
   * @description Removing 3 Form Controls (Type, Label and Value) that associated with the specific Contact Number
   * @param contact Contact Number as in the Contact List Counter Array
   */
  removeContact = (contact: number) => {
    this.userForm.removeControl("type" + contact);
    this.userForm.removeControl("label" + contact);
    this.userForm.removeControl("value" + contact);

    // Remove Contact from Contact List Counter
    this.contactListCounter = this.contactListCounter.filter((value) => {
      return value !== contact;
    });
  }

  /**
   * Add Contact
   * 
   * @description Adding 3 Form Controls (Type, Label and Value) and associating them with new Contact Number
   */
  addContact = () => {
    if(this.contactListCounter.length === 0){
      this.contactListCounter.push(0); // Counter Increment
      this.userForm.addControl("type0", this.formBuilder.control('Email'));                                      // Add 3 new controls for reactive form
      this.userForm.addControl("label0", this.formBuilder.control('', Validators.required));                     // ...
      this.userForm.addControl("value0", this.formBuilder.control('', [Validators.email, Validators.required])); // ...
    }
    else{
      let counter: number = this.contactListCounter[this.contactListCounter.length - 1] + 1; // Counter Increment >>> Contact List Counter

      this.contactListCounter.push(counter); // Counter Increment
      this.userForm.addControl("type" + counter, this.formBuilder.control('Email'));                                       // Add 3 new controls for reactive form
      this.userForm.addControl("label" + counter, this.formBuilder.control('', Validators.required));                      // ...
      this.userForm.addControl("value" + counter, this.formBuilder.control('', [Validators.email, Validators.required]));  // ...
    }
  }

  /**
   * Save User Profile
   */
  onSubmit = () => {
    // console.log(this.contactListCounter);
    // console.log(this.userForm.value);
    window.alert("User saved successfully");
  }



  
}

