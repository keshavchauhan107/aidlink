import { FeedItem, CommentModel } from './feed.model';

const createSampleComments = (postId: number): CommentModel[] => {
  return [
    { id: postId * 100 + 1, user: { name: 'sarah_w', avatarUrl: `https://i.pravatar.cc/40?u=sarah_w` }, text: 'This looks amazing!', likes: 5 },
    { id: postId * 100 + 2, user: { name: 'mike_p', avatarUrl: `https://i.pravatar.cc/40?u=mike_p` }, text: 'I agree, great shot!', likes: 2 },
  ];
};


const generatedItems: FeedItem[] = [];

for (let i = 1; i <= 50; i++) {
  const user = {
    name: `User_${i}`,
    avatarUrl: `https://i.pravatar.cc/40?u=${i}`,
  };

  const type = i % 4;
  switch (type) {
    case 0: // Post with image
      const comments = createSampleComments(i);
      generatedItems.push({
        id: i,
        type: 'post',
        user,
        text: `Exploring the beautiful landscapes. What an adventure! Post #${i}`,
        imageUrl: `https://picsum.photos/600/600?random=${i}`,
        likes: Math.floor(Math.random() * 200),
        commentCount: comments.length + Math.floor(Math.random() * 10),
        comments: comments,
        shares: Math.floor(Math.random() * 20),
      });
      break;
    case 1: // Poll
      generatedItems.push({
        id: i,
        type: 'poll',
        user,
        question: `Which should be our next design focus? Poll #${i}`,
        options: [
          { id: 1, text: 'Dark Mode', votes: Math.floor(Math.random() * 50) },
          { id: 2, text: 'New Icon Set', votes: Math.floor(Math.random() * 50) },
          { id: 3, text: 'Mobile Navigation', votes: Math.floor(Math.random() * 50) },
        ],
        totalVotes: 0, // This will be calculated in the component
      });
      break;
    case 2: // Event
      generatedItems.push({
        id: i,
        type: 'event',
        user,
        title: `Design Forward 2024 #${i}`,
        date: 'October 26, 2024 @ 10:00 AM',
        location: 'Virtual Event',
        description: 'A deep dive into the future of user interface and experience design.',
        imageUrl: `https://picsum.photos/600/400?random=${i}`,
      });
      break;
    case 3: // Post without image
    default:
       const textComments = createSampleComments(i);
      generatedItems.push({
        id: i,
        type: 'post',
        user,
        text: `Just a random thought for today. Creativity is intelligence having fun. Post #${i}`,
        likes: Math.floor(Math.random() * 100),
        commentCount: textComments.length + Math.floor(Math.random() * 5),
        comments: textComments,
        shares: Math.floor(Math.random() * 10),
      });
      break;
  }
}

export const SAMPLE_FEED_DATA: FeedItem[] = generatedItems;
