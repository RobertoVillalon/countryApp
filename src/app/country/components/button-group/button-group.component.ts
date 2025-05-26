import { ChangeDetectionStrategy, Component, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'app-button-group',
  imports: [],
  templateUrl: './button-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupComponent {
    group = input.required<string[]>()
    initialValue = input<string>('');
    alternativeSelected = linkedSignal<string>(() => this.initialValue());
    selectedValue = output<string>(); //ACA HAY QUE REFACTORIZAR

    handleSelection(value: string) {
        this.alternativeSelected.set(value);
        this.selectedValue.emit(value);
    }
}
