import { Conversation, Message, User } from '@/types/chat';

export const CURRENT_USER: User = {
    id: 'me',
    name: 'Me',
    avatar: 'https://i.pravatar.cc/150?u=me'
};

export const OTHER_USERS: User[] = [
    { id: 'user-1', name: 'Alice Freeman', avatar: 'https://i.pravatar.cc/150?u=alice' },
    { id: 'user-2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?u=bob' },
    { id: 'user-3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=charlie' },
    { id: 'user-4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?u=diana' },
    { id: 'user-5', name: 'Evan Wright', avatar: 'https://i.pravatar.cc/150?u=evan' },
    { id: 'user-6', name: 'Fiona Gallagher', avatar: 'https://i.pravatar.cc/150?u=fiona' },
    { id: 'user-7', name: 'George Martin', avatar: 'https://i.pravatar.cc/150?u=george' },
    { id: 'user-8', name: 'Hannah Abbott', avatar: 'https://i.pravatar.cc/150?u=hannah' },
    { id: 'user-9', name: 'Ian Somerhalder', avatar: 'https://i.pravatar.cc/150?u=ian' },
    { id: 'user-10', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?u=jane' },
];

const generateMessages = (userId: string): Message[] => {
    return [
        {
            id: `msg-${userId}-1`,
            content: 'Hey there! How are you doing?',
            senderId: userId,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            status: 'seen'
        },
        {
            id: `msg-${userId}-2`,
            content: 'I am doing great, working on this project!',
            senderId: 'me',
            createdAt: new Date(Date.now() - 1000 * 60 * 55), // 55 mins ago
            status: 'seen'
        },
        {
            id: `msg-${userId}-3`,
            content: 'That sounds awesome. Keep it up!',
            senderId: userId,
            createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
            status: 'seen'
        }
    ];
};

export const MOCK_CONVERSATIONS: Conversation[] = OTHER_USERS.map((user) => ({
    id: `chat-${user.id}`,
    participants: [CURRENT_USER, user],
    messages: generateMessages(user.id),
    unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0
}));

import { Call } from '@/types/chat';

export const MOCK_CALLS: Call[] = [
    {
        id: 'call-1',
        participant: OTHER_USERS[0],
        type: 'missed',
        date: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    },
    {
        id: 'call-2',
        participant: OTHER_USERS[1],
        type: 'incoming',
        date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        duration: '12m 4s'
    },
    {
        id: 'call-3',
        participant: OTHER_USERS[2],
        type: 'outgoing',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        duration: '5m 0s'
    },
    {
        id: 'call-4',
        participant: OTHER_USERS[3],
        type: 'missed',
        date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    },
    {
        id: 'call-5',
        participant: OTHER_USERS[4],
        type: 'incoming',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        duration: '22m 14s'
    },
];
