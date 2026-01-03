import { ChangeDetectionStrategy, Component, computed, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PollModel, PollOptionModel } from '../feed.model';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, RadioButtonModule, ProgressBarModule, AvatarModule, RippleModule],
})
export class PollComponent implements OnInit {
  poll = input.required<PollModel>();
  
  selectedOption = signal<PollOptionModel | null>(null);
  voted = signal(false);
  totalVotes = signal(0);
  
  pollWithOptions = computed(() => {
    const p = this.poll();
    const total = this.totalVotes();
    return p.options.map(option => ({
      ...option,
      percentage: total > 0 ? Math.round((option.votes / total) * 100) : 0
    }));
  });

  ngOnInit() {
    this.totalVotes.set(this.poll().options.reduce((sum, opt) => sum + opt.votes, 0));
  }

  vote() {
    if (this.selectedOption()) {
      const selected = this.selectedOption();
      if(selected) {
        selected.votes++;
        this.totalVotes.update(v => v + 1);
        this.voted.set(true);
      }
    }
  }
}
