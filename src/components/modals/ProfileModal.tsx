
import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { useChatStore } from '@/store/useChatStore';
import { Camera, Mail, MapPin, Calendar } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useChatStore();

  if (!currentUser) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profile">
      <div className="flex flex-col items-center">
        {/* Cover Photo */}
        <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg relative">
        </div>
        
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
           <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#242526] overflow-hidden bg-white">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
           </div>
           <button className="absolute bottom-1 right-1 p-2 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] text-[#050505] dark:text-[#E4E6EB] hover:bg-[#D8DADF] transition-colors">
              <Camera size={16} />
           </button>
        </div>

        {/* Info */}
        <h2 className="text-2xl font-bold text-[#050505] dark:text-[#E4E6EB] mb-1">{currentUser.name}</h2>
        <p className="text-[#65676B] dark:text-[#B0B3B8] text-sm mb-6">@{currentUser.id}</p>

        {/* Stats */}
        <div className="flex w-full justify-around border-y border-[#E4E6EB] dark:border-[#3E4042] py-4 mb-6">
           <div className="flex flex-col items-center">
              <span className="font-bold text-[#050505] dark:text-[#E4E6EB]">248</span>
              <span className="text-xs text-[#65676B] dark:text-[#B0B3B8] uppercase">Friends</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="font-bold text-[#050505] dark:text-[#E4E6EB]">12</span>
              <span className="text-xs text-[#65676B] dark:text-[#B0B3B8] uppercase">Photos</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="font-bold text-[#050505] dark:text-[#E4E6EB]">85</span>
              <span className="text-xs text-[#65676B] dark:text-[#B0B3B8] uppercase">Likes</span>
           </div>
        </div>

        {/* Details */}
        <div className="w-full space-y-3 px-2">
           <div className="flex items-center gap-3 text-[#65676B] dark:text-[#B0B3B8]">
              <Mail size={20} />
              <span className="text-sm">kallo@example.com</span>
           </div>
           <div className="flex items-center gap-3 text-[#65676B] dark:text-[#B0B3B8]">
              <MapPin size={20} />
              <span className="text-sm">Ho Chi Minh City, Vietnam</span>
           </div>
           <div className="flex items-center gap-3 text-[#65676B] dark:text-[#B0B3B8]">
              <Calendar size={20} />
              <span className="text-sm">Joined January 2024</span>
           </div>
        </div>
      </div>
    </Modal>
  );
};
