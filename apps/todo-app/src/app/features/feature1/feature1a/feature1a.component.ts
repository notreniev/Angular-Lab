import { Component } from '@angular/core'

@Component({
  selector: 'app-feature1a',
  standalone: true,
  imports: [],
  templateUrl: './feature1a.component.html',
  styleUrl: './feature1a.component.scss',
})
export class Feature1aComponent {
  constructor() {
    console.log('Feature1aComponent')
  }
}
