import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FeedComponent } from "./features/feed/feed.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, FeedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
