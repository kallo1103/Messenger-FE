'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Send, Image as ImageIcon, Smile, MoreHorizontal, Phone, Video, ArrowLeft } from 'lucide-react';
import { useChatScroll } from '@/hooks/useChatScroll';
import { useChatStore } from '@/store/useChatStore';
import { MessageBubble } from './MessageBubble';
import { Message, User } from '@/types/chat';
import { cn } from '@/lib/utils'; // Assuming utils is set up

// --- Mock Data ---
const MOCK_USER: User = { id: 'other-1', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=alice' };
const INITIAL_MESSAGES: Message[] = [
  { id: '1', content: 'Hey, how are you?', senderId: 'other-1', createdAt: new Date(Date.now() - 1000 * 60 * 60), status: 'seen' },
  { id: '2', content: 'I am good! developing this messenger clone.', senderId: 'me', createdAt: new Date(Date.now() - 1000 * 60 * 30), status: 'seen' },
];

const chatSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
});

type ChatFormValues = z.infer<typeof chatSchema>;

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const { currentUser,  addOptimisticMessage, optimisticMessages, setActiveConversation } = useChatStore();
  
  // Combine historical and optimistic messages
  const allMessages = [...messages, ...optimisticMessages];

  // Auto-scroll hook
  const scrollRef = useChatScroll(allMessages);

  // Form handling
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' }
  });

  const onSubmit = async (data: ChatFormValues) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: data.message,
      senderId: currentUser?.id || 'me',
      createdAt: new Date(),
      status: 'sending'
    };

    // 1. Optimistic Update
    addOptimisticMessage(newMessage);
    reset();

    // 2. Simulate API Call
    // await sendMessageApi(newMessage); 
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black border-l border-r border-gray-200 dark:border-zinc-800">
      {/* --- Header --- */}
      <header className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-zinc-800 shadow-sm backdrop-blur-md bg-white/80 dark:bg-black/80 z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveConversation(null)}
            className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="relative">
            <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black"></span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{MOCK_USER.name}</h3>
            <p className="text-xs text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-blue-500">
          <button className="p-2 hover:bg-blue-50 dark:hover:bg-zinc-900 rounded-full transition"><Phone size={20} /></button>
          <button className="p-2 hover:bg-blue-50 dark:hover:bg-zinc-900 rounded-full transition"><Video size={20} /></button>
          <button className="p-2 hover:bg-blue-50 dark:hover:bg-zinc-900 rounded-full transition"><MoreHorizontal size={20} /></button>
        </div>
      </header>

      {/* --- Message List --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
        {allMessages.map((msg, index) => {
            const isMe = msg.senderId === 'me' || msg.senderId === currentUser?.id;
            return (
                <div key={msg.id} ref={index === allMessages.length - 1 ? scrollRef : null}>
                    <MessageBubble message={msg} isMe={isMe} sender={isMe ? currentUser! : MOCK_USER} />
                </div>
            );
        })}
        {/* Typing Indicator Mock */}
        {/* <div className="text-xs text-gray-400 pl-4">Alice is typing...</div> */}
      </div>

      {/* --- Input Area --- */}
      <footer className="p-3 border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="flex items-center gap-2">
           <button className="p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition">
              <ImageIcon size={20} />
           </button>
           <button className="p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-full transition">
              <Smile size={20} />
           </button>
           
           <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex items-center gap-2">
             <div className="relative flex-1">
               <input 
                 {...register('message')}
                 autoComplete="off"
                 placeholder="Aa" 
                 className="w-full bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-light"
               />
             </div>
             <button 
                type="submit" 
                className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-zinc-900 rounded-full transition disabled:opacity-50"
             >
               <Send size={20} className={cn(isSubmitting && "animate-pulse")} />
             </button>
           </form>
        </div>
      </footer>
    </div>
  );
}
