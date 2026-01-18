import { create } from 'zustand';
import { Conversation, Message, User } from '@/types/chat';
import { MOCK_CONVERSATIONS, CURRENT_USER } from '@/lib/data';

interface ChatState {
    activeConversationId: string | null;
    currentUser: User | null;
    conversations: Conversation[];

    // Actions
    setActiveConversation: (id: string | null) => void;
    sendMessage: (content: string) => void;

    // Computed/Selectors helper equivalent (kept in state for simplicity or derived in components)
    getActiveConversation: () => Conversation | undefined;
}

export const useChatStore = create<ChatState>((set, get) => ({
    activeConversationId: null,
    currentUser: CURRENT_USER,
    conversations: MOCK_CONVERSATIONS,

    setActiveConversation: (id) => set({ activeConversationId: id }),

    sendMessage: (content) => {
        const { activeConversationId, currentUser, conversations } = get();
        if (!activeConversationId || !currentUser) return;

        const newMessage: Message = {
            id: crypto.randomUUID(),
            content,
            senderId: currentUser.id,
            createdAt: new Date(),
            status: 'sent'
        };

        const updatedConversations = conversations.map(conv => {
            if (conv.id === activeConversationId) {
                return {
                    ...conv,
                    messages: [...conv.messages, newMessage]
                };
            }
            return conv;
        });

        set({ conversations: updatedConversations });
    },

    getActiveConversation: () => {
        const { activeConversationId, conversations } = get();
        return conversations.find(c => c.id === activeConversationId);
    }
}));
