import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Item, 
  CommunityRequest, 
  GratitudeStory, 
  User, 
  ActiveConversation, 
  CollectionMethod 
} from '../types';
import { 
  INITIAL_ITEMS, 
  INITIAL_REQUESTS, 
  INITIAL_GRATITUDE_STORIES, 
  CURRENT_USER, 
  DEMO_USERS 
} from '../data/mockData';

interface AppContextType {
  items: Item[];
  requests: CommunityRequest[];
  gratitudeStories: GratitudeStory[];
  currentUser: User;
  demoUsers: User[];
  activeItem: Item | null;
  activeConversation: ActiveConversation | null;
  isGiveModalOpen: boolean;
  isRequestModalOpen: boolean;
  isGratitudeModalOpen: boolean;
  isSafetyGuideOpen: boolean;
  selectedState: string;
  selectedCategory: string;
  searchQuery: string;
  activeTab: 'browse' | 'requests' | 'gratitude' | 'impact';
  presetGratitudeTarget: { itemId: string; itemTitle: string; giverId: string; giverName: string } | null;

  // Actions
  setActiveItem: (item: Item | null) => void;
  setActiveConversation: (conv: ActiveConversation | null) => void;
  setIsGiveModalOpen: (open: boolean) => void;
  setIsRequestModalOpen: (open: boolean) => void;
  setIsGratitudeModalOpen: (open: boolean) => void;
  setIsSafetyGuideOpen: (open: boolean) => void;
  setSelectedState: (state: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  setActiveTab: (tab: 'browse' | 'requests' | 'gratitude' | 'impact') => void;
  setPresetGratitudeTarget: (target: { itemId: string; itemTitle: string; giverId: string; giverName: string } | null) => void;
  
  addItem: (itemData: {
    title: string;
    description: string;
    category: string;
    condition: Item['condition'];
    state: string;
    city: string;
    neighborhood: string;
    landmark: string;
    collectionMethod: CollectionMethod;
    imageUrl: string;
    dispatchFriendly: boolean;
    handoverNotes?: string;
  }) => void;
  
  addRequest: (reqData: {
    title: string;
    description: string;
    category: string;
    urgency: CommunityRequest['urgency'];
    state: string;
    city: string;
    neighborhood: string;
  }) => void;
  
  claimItem: (itemId: string, note: string, method: CollectionMethod) => void;
  confirmHandover: (itemId: string) => void;
  addGratitudeStory: (data: {
    itemId: string;
    itemTitle: string;
    giverId: string;
    giverName: string;
    location: string;
    message: string;
    imageUrl?: string;
  }) => void;
  toggleLikeGratitude: (id: string) => void;
  sendMessageToActiveConv: (text: string) => void;
  switchUser: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const saved = localStorage.getItem('keshoshare_items');
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  const [requests, setRequests] = useState<CommunityRequest[]>(() => {
    try {
      const saved = localStorage.getItem('keshoshare_requests');
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [gratitudeStories, setGratitudeStories] = useState<GratitudeStory[]>(() => {
    try {
      const saved = localStorage.getItem('keshoshare_gratitude');
      return saved ? JSON.parse(saved) : INITIAL_GRATITUDE_STORIES;
    } catch {
      return INITIAL_GRATITUDE_STORIES;
    }
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const savedId = localStorage.getItem('keshoshare_user_id');
      const found = DEMO_USERS.find(u => u.id === savedId);
      return found || CURRENT_USER;
    } catch {
      return CURRENT_USER;
    }
  });

  const [activeItem, setActiveItem] = useState<Item | null>(null);
  const [activeConversation, setActiveConversation] = useState<ActiveConversation | null>(null);
  const [isGiveModalOpen, setIsGiveModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isGratitudeModalOpen, setIsGratitudeModalOpen] = useState(false);
  const [isSafetyGuideOpen, setIsSafetyGuideOpen] = useState(false);
  const [presetGratitudeTarget, setPresetGratitudeTarget] = useState<{ itemId: string; itemTitle: string; giverId: string; giverName: string } | null>(null);

  const [selectedState, setSelectedState] = useState('All Nigeria');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'browse' | 'requests' | 'gratitude' | 'impact'>('browse');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('keshoshare_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('keshoshare_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('keshoshare_gratitude', JSON.stringify(gratitudeStories));
  }, [gratitudeStories]);

  useEffect(() => {
    localStorage.setItem('keshoshare_user_id', currentUser.id);
  }, [currentUser]);

  const switchUser = (userId: string) => {
    const user = DEMO_USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const addItem = (itemData: {
    title: string;
    description: string;
    category: string;
    condition: Item['condition'];
    state: string;
    city: string;
    neighborhood: string;
    landmark: string;
    collectionMethod: CollectionMethod;
    imageUrl: string;
    dispatchFriendly: boolean;
    handoverNotes?: string;
  }) => {
    const newItem: Item = {
      ...itemData,
      id: `item_${Date.now()}`,
      giverId: currentUser.id,
      giverName: currentUser.name,
      giverAvatar: currentUser.avatar,
      giverImpactScore: currentUser.impactScore,
      status: 'available',
      createdAt: 'Just now',
      claimsCount: 0,
    };

    setItems(prev => [newItem, ...prev]);
    setCurrentUser(prev => ({ ...prev, itemsGiven: prev.itemsGiven + 1, impactScore: prev.impactScore + 50 }));
  };

  const addRequest = (reqData: {
    title: string;
    description: string;
    category: string;
    urgency: CommunityRequest['urgency'];
    state: string;
    city: string;
    neighborhood: string;
  }) => {
    const newReq: CommunityRequest = {
      ...reqData,
      id: `req_${Date.now()}`,
      requesterId: currentUser.id,
      requesterName: currentUser.name,
      requesterAvatar: currentUser.avatar,
      createdAt: 'Just now',
      responsesCount: 0,
      status: 'open',
    };

    setRequests(prev => [newReq, ...prev]);
  };

  const claimItem = (itemId: string, note: string, method: CollectionMethod) => {
    const targetItem = items.find(i => i.id === itemId);
    if (!targetItem) return;

    // Update item claims count
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          claimsCount: item.claimsCount + 1,
        };
      }
      return item;
    }));

    // Spawn an active collection conversation
    const conversation: ActiveConversation = {
      id: `conv_${itemId}_${Date.now()}`,
      itemId: targetItem.id,
      itemTitle: targetItem.title,
      otherUser: {
        id: targetItem.giverId,
        name: targetItem.giverName,
        avatar: targetItem.giverAvatar,
        role: 'giver'
      },
      pickupDetails: {
        landmark: targetItem.landmark,
        collectionMethod: method,
        time: 'Pending confirmation with giver',
        confirmed: false
      },
      messages: [
        {
          id: `msg_sys_1`,
          senderId: 'system',
          senderName: 'KeshoShare Bot',
          text: `🤝 Collection inquiry initiated. Safety reminder: In Nigeria, meet at busy daylight landmarks or arrange verified dispatch riders. No fees permitted.`,
          timestamp: 'Just now',
          isSystemNote: true
        },
        {
          id: `msg_claim_${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          text: `Hello ${targetItem.giverName}! I am interested in this item. Note: "${note}". Preferred pickup arrangement: ${method}.`,
          timestamp: 'Just now',
        }
      ]
    };

    setActiveConversation(conversation);
    if (activeItem?.id === itemId) {
      setActiveItem(prev => prev ? { ...prev, claimsCount: prev.claimsCount + 1 } : null);
    }
  };

  const confirmHandover = (itemId: string) => {
    const target = items.find(i => i.id === itemId);
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          status: 'handed_over',
          claimedBy: {
            id: currentUser.id,
            name: currentUser.name
          }
        };
      }
      return item;
    }));

    // Trigger gratitude prompt
    if (target) {
      setPresetGratitudeTarget({
        itemId: target.id,
        itemTitle: target.title,
        giverId: target.giverId,
        giverName: target.giverName,
      });
      setIsGratitudeModalOpen(true);
    }

    if (activeConversation && activeConversation.itemId === itemId) {
      setActiveConversation(prev => prev ? {
        ...prev,
        pickupDetails: { ...prev.pickupDetails, confirmed: true },
        messages: [
          ...prev.messages,
          {
            id: `msg_sys_${Date.now()}`,
            senderId: 'system',
            senderName: 'KeshoShare Bot',
            text: `🎉 Handover confirmed! Thank you both for embodying the spirit of KeshoShare ("Give today. Make tomorrow better").`,
            timestamp: 'Just now',
            isSystemNote: true
          }
        ]
      } : null);
    }
  };

  const addGratitudeStory = (data: {
    itemId: string;
    itemTitle: string;
    giverId: string;
    giverName: string;
    location: string;
    message: string;
    imageUrl?: string;
  }) => {
    const newStory: GratitudeStory = {
      ...data,
      id: `grat_${Date.now()}`,
      recipientId: currentUser.id,
      recipientName: currentUser.name,
      recipientAvatar: currentUser.avatar,
      createdAt: 'Just now',
      likesCount: 1,
      likedByCurrentUser: true,
    };

    setGratitudeStories(prev => [newStory, ...prev]);
    setCurrentUser(prev => ({ ...prev, impactScore: prev.impactScore + 25 }));
  };

  const toggleLikeGratitude = (id: string) => {
    setGratitudeStories(prev => prev.map(story => {
      if (story.id === id) {
        const isLiked = story.likedByCurrentUser;
        return {
          ...story,
          likedByCurrentUser: !isLiked,
          likesCount: isLiked ? story.likesCount - 1 : story.likesCount + 1,
        };
      }
      return story;
    }));
  };

  const sendMessageToActiveConv = (text: string) => {
    if (!activeConversation) return;
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text,
      timestamp: 'Just now'
    };
    setActiveConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMsg]
    } : null);
  };

  return (
    <AppContext.Provider value={{
      items,
      requests,
      gratitudeStories,
      currentUser,
      demoUsers: DEMO_USERS,
      activeItem,
      activeConversation,
      isGiveModalOpen,
      isRequestModalOpen,
      isGratitudeModalOpen,
      isSafetyGuideOpen,
      selectedState,
      selectedCategory,
      searchQuery,
      activeTab,
      presetGratitudeTarget,
      setActiveItem,
      setActiveConversation,
      setIsGiveModalOpen,
      setIsRequestModalOpen,
      setIsGratitudeModalOpen,
      setIsSafetyGuideOpen,
      setSelectedState,
      setSelectedCategory,
      setSearchQuery,
      setActiveTab,
      setPresetGratitudeTarget,
      addItem,
      addRequest,
      claimItem,
      confirmHandover,
      addGratitudeStory,
      toggleLikeGratitude,
      sendMessageToActiveConv,
      switchUser,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
