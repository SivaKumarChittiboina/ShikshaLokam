import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import formMetaData from '../../assets/form-metadata.json'

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private _formBuilder: FormBuilder) {
  }

  getFormMetadata(): Observable<any> {
    return new BehaviorSubject(formMetaData);
  }

  toCreateFormGroup(controls: any[]): FormGroup {
    const group: any = {};

    controls.forEach(control => {
      group[control.name] = this._formBuilder.control(
        '',
        this.prepareFormValidations(control.validations || {})
      );
    });
    return this._formBuilder.group(group);
  }

  private prepareFormValidations(validations: any) {
    const validList = [];
    if (validations.isRequired) {
      validList.push(Validators.required);
    }
    if (validations.pattern) {
      validList.push(Validators.pattern(validations.pattern));
    }
    if (validations.minLength) {
      validList.push(Validators.minLength(validations.minLength));
    }
    if (validations.maxLength) {
      validList.push(Validators.maxLength(validations.maxLength));
    }
    if (validations.email) {
      validList.push(Validators.email);
    }
    if (validations.min) {
      validList.push(Validators.min(validations.min));
    }
    if (validations.max) {
      validList.push(Validators.max(validations.max));
    }
    return Validators.compose(validList);
  }

}
