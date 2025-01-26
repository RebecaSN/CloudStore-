import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-properties-editor',
  templateUrl: './custom-properties-editor.component.html',
  styleUrls: ['./custom-properties-editor.component.scss']
})
export class CustomPropertiesEditorComponent {

  @Input() customProperties: FormArray;
  @Output() addCustomPropertyEvent = new EventEmitter();
  @Output() removeCustomPropertyEvent = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder) {}

  createCustomPropertyGroup(property?: { key: string; value: string }): FormGroup {
    return this.formBuilder.group({
      key: [property?.key || '', [Validators.required]],
      value: [property?.value || '', [Validators.required]],
    });
  }

  addCustomProperty(): void {
    this.customProperties.push(this.createCustomPropertyGroup());
    this.addCustomPropertyEvent.emit();
  }

  removeCustomProperty(index: number): void {
    this.customProperties.removeAt(index);
    this.removeCustomPropertyEvent.emit(index);
  }
}
