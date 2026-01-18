'use client';

import { useChatStore } from '@/store/useChatStore';
import ChatWindow from '@/components/chat/ChatWindow';
import { cn } from '@/lib/utils';
import { MessageCircle, Users, ShoppingBag, Settings, Phone, Search } from 'lucide-react';

export default function Home() {
  const { activeConversationId, setActiveConversation } = useChatStore();

  return (
    <main className="flex h-screen overflow-hidden bg-[#F0F2F5] dark:bg-[#18191A] text-[#050505] dark:text-[#E4E6EB]">
      
      {/* Navigation Rail - Leftmost */}
      <nav className="hidden md:flex flex-col items-center py-3 w-[72px] border-r border-[#E4E6EB] dark:border-[#3E4042] bg-white dark:bg-[#242526] flex-shrink-0 z-20">
         <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center mb-4 mt-2">
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.096 2 11.15C2 13.902 3.496 16.35 5.8 17.84V20.9C5.8 21.36 6.305 21.65 6.702 21.41L10.05 19.57C10.686 19.68 11.336 19.74 12 19.74C17.523 19.74 22 15.645 22 10.59C22 5.536 17.523 2 12 2Z"/></svg>
         </div>
         
         <div className="flex flex-col gap-1 w-full px-2">
            <button className="group h-12 w-full flex items-center justify-center relative rounded-lg hover:bg-[#E4E6EB] dark:hover:bg-[#3A3B3C] transition-colors">
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#1877F2] rounded-r-full"></div>
               <div className="p-2 bg-[#1877F2] text-white rounded-lg">
                 <MessageCircle className="w-6 h-6" />
               </div>
            </button>
            <button className="group h-12 w-full flex items-center justify-center text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#E4E6EB] dark:hover:bg-[#3A3B3C] rounded-lg transition-colors">
               <Users className="w-6 h-6" />
            </button>
            <button className="group h-12 w-full flex items-center justify-center text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#E4E6EB] dark:hover:bg-[#3A3B3C] rounded-lg transition-colors">
               <ShoppingBag className="w-6 h-6" />
            </button>
            <button className="group h-12 w-full flex items-center justify-center text-[#65676B] dark:text-[#B0B3B8] hover:bg-[#E4E6EB] dark:hover:bg-[#3A3B3C] rounded-lg transition-colors">
               <Phone className="w-6 h-6" />
            </button>
         </div>
         
         <div className="mt-auto flex flex-col gap-3 items-center w-full px-2 pb-2">
             <button className="text-[#65676B] dark:text-[#B0B3B8] hover:text-[#050505] dark:hover:text-[#E4E6EB] p-2 rounded-lg hover:bg-[#E4E6EB] dark:hover:bg-[#3A3B3C] transition-colors">
                <Settings className="w-6 h-6" />
             </button>
             <div className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <img src="https://i.pravatar.cc/150?u=me" alt="Me" className="w-full h-full object-cover" />
             </div>
         </div>
      </nav>

      {/* Left Sidebar - Chat List */}
      <aside className={cn(
        "flex-col w-full md:w-[360px] border-r border-[#E4E6EB] dark:border-[#3E4042] bg-white dark:bg-[#242526]",
        activeConversationId ? "hidden md:flex" : "flex"
      )}>
        <div className="p-3 h-[60px] flex items-center justify-between border-b border-[#E4E6EB] dark:border-[#3E4042] flex-shrink-0">
           <h1 className="text-2xl font-bold text-[#050505] dark:text-[#E4E6EB]">Chats</h1>
           <div className="flex items-center gap-2">
             <button className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] transition-colors">
               <Search className="w-5 h-5 text-[#050505] dark:text-[#E4E6EB]" />
             </button>
             <button className="w-9 h-9 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center hover:bg-[#D8DADF] dark:hover:bg-[#4E4F50] transition-colors">
               <svg className="w-5 h-5 text-[#050505] dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
             </button>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {useChatStore(state => state.conversations).map((conversation) => {
             const isActive = activeConversationId === conversation.id;
             const otherParticipant = conversation.participants.find(p => p.id !== 'me') || conversation.participants[0];
             const lastMessage = conversation.messages[conversation.messages.length - 1];
             
             return (
               <div 
                  key={conversation.id} 
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors",
                    isActive 
                      ? "bg-[#E7F3FF] dark:bg-[#2F3A4A]" 
                      : "hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C]"
                  )}
                  onClick={() => setActiveConversation(conversation.id)}
               >
                  <div className="relative flex-shrink-0">
                    <div className={cn(
                      "w-12 h-12 rounded-full overflow-hidden",
                      isActive ? "ring-2 ring-[#1877F2]" : ""
                    )}>
                      <img 
                        src={otherParticipant.avatar}
                        alt={otherParticipant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Simplified online status indicator logic */}
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#242526]"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-1">
                       <h3 className={cn(
                         "text-[15px] font-semibold truncate",
                         isActive ? "text-[#050505] dark:text-[#E4E6EB]" : "text-[#050505] dark:text-[#E4E6EB]"
                       )}>
                         {otherParticipant.name}
                       </h3>
                       {lastMessage && (
                        <span className={cn(
                          "text-xs ml-2 flex-shrink-0",
                          isActive ? "text-[#1877F2]" : "text-[#65676B] dark:text-[#B0B3B8]"
                        )}>
                          {/* Simple time logic, improve with date-fns if needed */}
                          {new Date(lastMessage.createdAt).getMinutes() % 2 === 0 ? '2m' : '1h'}
                        </span>
                       )}
                     </div>
                     <div className="flex items-center gap-1">
                       <p className={cn(
                         "text-sm truncate flex-1",
                         isActive ? "text-[#050505] dark:text-[#E4E6EB]" : "text-[#65676B] dark:text-[#B0B3B8]",
                         lastMessage?.senderId === 'me' && "italic"
                       )}>
                         {lastMessage ? (lastMessage.senderId === 'me' ? `You: ${lastMessage.content}` : lastMessage.content) : 'No messages yet'}
                       </p>
                       {conversation.unreadCount > 0 && (
                         <span className="w-5 h-5 rounded-full bg-[#1877F2] text-white text-xs flex items-center justify-center font-semibold flex-shrink-0">
                           {conversation.unreadCount}
                         </span>
                       )}
                     </div>
                  </div>
               </div>
             );
           })}
        </div>
      </aside>

      {/* Middle - Chat Window */}
      <section className={cn(
        "flex-1 min-w-0 relative flex flex-col bg-white dark:bg-[#18191A]",
        activeConversationId ? "flex" : "hidden md:flex"
      )}>
        {activeConversationId ? (
            <ChatWindow />
        ) : (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center">
                    <MessageCircle className="w-12 h-12 text-[#65676B] dark:text-[#B0B3B8]" />
                  </div>
                  <p className="text-[#65676B] dark:text-[#B0B3B8] text-lg">Select a chat to start messaging</p>
                </div>
            </div>
        )}
      </section>

      {/* Right Sidebar - Details */}
      <aside className={cn(
          "w-[360px] border-l border-[#E4E6EB] dark:border-[#3E4042] bg-white dark:bg-[#242526] hidden lg:flex flex-col",
          !activeConversationId && "lg:hidden xl:flex"
      )}>
         {activeConversationId ? (
             <>
                <div className="p-6 flex flex-col items-center border-b border-[#E4E6EB] dark:border-[#3E4042]">
                    <div className="w-24 h-24 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] mb-4 overflow-hidden">
                      <img src="https://i.pravatar.cc/150?u=alice" alt="Alice" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#050505] dark:text-[#E4E6EB] mb-1">Alice</h2>
                    <p className="text-sm text-[#65676B] dark:text-[#B0B3B8]">Active 5m ago</p>
                </div>
                <div className="p-4 space-y-4">
                    <h3 className="text-xs font-semibold text-[#65676B] dark:text-[#B0B3B8] uppercase tracking-wider">Shared Media</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square bg-[#E4E6EB] dark:bg-[#3A3B3C] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src="https://picsum.photos/200/200?random=1" alt="Media" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-square bg-[#E4E6EB] dark:bg-[#3A3B3C] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src="https://picsum.photos/200/200?random=2" alt="Media" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-square bg-[#E4E6EB] dark:bg-[#3A3B3C] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                          <img src="https://picsum.photos/200/200?random=3" alt="Media" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
             </>
         ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-[#65676B] dark:text-[#B0B3B8]">
                Details
            </div>
         )}
      </aside>

    </main>
  );
}
