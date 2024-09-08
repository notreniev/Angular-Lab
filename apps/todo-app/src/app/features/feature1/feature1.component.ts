import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-feature1',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './feature1.component.html',
  styleUrls: ['./feature1.component.scss'],
})
export class Feature1Component {}
