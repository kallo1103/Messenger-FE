export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface Message {
    id: string;
    content: string;
    senderId: string;
    createdAt: Date;
    status: 'sending' | 'sent' | 'seen';
}

export interface Conversation {
    id: string;
    participants: User[];
    messages: Message[];
    unreadCount: number;
}
