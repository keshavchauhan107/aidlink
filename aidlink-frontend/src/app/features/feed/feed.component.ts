import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedItem } from './feed.model';
import { FeedService } from './feed.service';

import { PostComponent } from './post/post.component';
import { PollComponent } from './poll/poll.component';
import { EventComponent } from './event/event.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PostComponent, PollComponent, EventComponent, ProgressSpinnerModule, CardModule, ButtonModule, AvatarModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  private feedService = inject(FeedService);
  
  feedItems = signal<FeedItem[]>([]);
  isLoading = signal(false);
  currentPage = signal(1);
  isEndOfFeed = signal(false);

  host = {
    '(window:scroll)': 'onScroll()'
  };

  ngOnInit() {
    this.loadMoreItems();
  }

  loadMoreItems() {
    if(this.isLoading() || this.isEndOfFeed()) return;

    this.isLoading.set(true);
    this.feedService.getFeedItems(this.currentPage()).then(newItems => {
      if(newItems.length > 0) {
        this.feedItems.update(currentItems => [...currentItems, ...newItems]);
        this.currentPage.update(page => page + 1);
      } else {
        this.isEndOfFeed.set(true);
      }
      this.isLoading.set(false);
    });
  }

  onScroll() {
    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;
    
    if (position >= height - threshold) {
      this.loadMoreItems();
    }
  }

  trackById(index: number, item: FeedItem) {
    return item.id;
  }
}
