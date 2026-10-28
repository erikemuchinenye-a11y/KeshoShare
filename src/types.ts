export type ItemCondition = 'Brand New' | 'Like New' | 'Gently Used' | 'Needs Quick Fix';

export type CollectionMethod = 
  | 'Estate Security Gate'
  | 'Public Landmark Meetup'
  | 'Recipient Arranges Dispatch Rider'
  | 'Direct Neighborhood Pickup';

export type ItemStatus = 'available' | 'claimed' | 'handed_over';

export interface User {
  id: string;
  name: string;
  avatar: string;
  city: string;
  state: string;
  neighborhood: string;
  itemsGiven: number;
  itemsReceived: number;
  impactScore: number;
  memberSince: string;
  isVerifiedNeighbor: boolean;
}

export interface ClaimRequest {
  id: string;
  itemId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  recipientNeighborhood: string;
  message: string;
  proposedTime: string;
  collectionMethod: CollectionMethod;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: ItemCondition;
  state: string;
  city: string;
  neighborhood: string;
  landmark: string;
  collectionMethod: CollectionMethod;
  giverId: string;
  giverName: string;
  giverAvatar: string;
  giverImpactScore: number;
  imageUrl: string;
  status: ItemStatus;
  createdAt: string;
  claimsCount: number;
  dispatchFriendly: boolean;
  handoverNotes?: string;
  claimedBy?: {
    id: string;
    name: string;
  };
}

export interface CommunityRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'Normal' | 'Urgent' | 'Flexible';
  state: string;
  city: string;
  neighborhood: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar: string;
  createdAt: string;
  responsesCount: number;
  status: 'open' | 'fulfilled';
}

export interface GratitudeStory {
  id: string;
  itemId: string;
  itemTitle: string;
  giverId: string;
  giverName: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  location: string;
  message: string;
  imageUrl?: string;
  createdAt: string;
  likesCount: number;
  likedByCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSystemNote?: boolean;
}

export interface ActiveConversation {
  id: string;
  itemId: string;
  itemTitle: string;
  otherUser: {
    id: string;
    name: string;
    avatar: string;
    role: 'giver' | 'recipient';
  };
  pickupDetails: {
    landmark: string;
    time?: string;
    collectionMethod: CollectionMethod;
    confirmed: boolean;
  };
  messages: ChatMessage[];
}
