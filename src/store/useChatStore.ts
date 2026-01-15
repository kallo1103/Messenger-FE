import { create } from 'zustand';
import { Message, User } from '@/types/chat';

interface ChatState {
    activeConversationId: string | null;
    currentUser: User | null;
    setActiveConversation: (id: string | null) => void;
    // In a real app, messages might be separated per conversation or handled by React Query cache.
    // Here we keep a simple optimistic store for the current chat window demo.
    optimisticMessages: Message[];
    addOptimisticMessage: (msg: Message) => void;
    clearOptimisticMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    activeConversationId: null,
    currentUser: {
        id: 'me',
        name: 'You',
        avatar: 'https://github.com/shadcn.png', // Placeholder
    },
    optimisticMessages: [],
    setActiveConversation: (id) => set({ activeConversationId: id }),
    addOptimisticMessage: (msg) => set((state) => ({
        optimisticMessages: [...state.optimisticMessages, msg]
    })),
    clearOptimisticMessages: () => set({ optimisticMessages: [] }),
}));
