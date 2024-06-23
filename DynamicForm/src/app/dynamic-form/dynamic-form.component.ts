import { Component, inject } from '@angular/core';
import { DynamicFormService } from '../service/dynamic-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {

  private _dynamicFormService = inject(DynamicFormService);

  formGroup: FormGroup | undefined;
  formDetails: any;

  ngOnInit(): void {
    this.getDynamicFormData();
  }

  getDynamicFormData() {
    this._dynamicFormService.getFormMetadata().subscribe((data) => {
      if (data) {
        this.formDetails = data;
        this.formGroup = this._dynamicFormService.toCreateFormGroup(
          [...this.formDetails.formFields.flatMap((element: any) => element.fields), ...this.formDetails.fields]
        );
      }
    })
  }

  onSubmit() {
    this.formGroup?.markAllAsTouched();
    if (this.formGroup?.invalid) {
      return;
    }
  }
}
