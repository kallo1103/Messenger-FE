
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterValues } from '@/lib/schemas';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Loader2, ArrowLeft } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useChatStore } from '@/store/useChatStore';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setCurrentUser } = useChatStore();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      const user = userCredential.user;
      
      setCurrentUser({
         id: user.uid,
         name: data.name,
         avatar: `https://i.pravatar.cc/150?u=${data.email}`
      });
      
      router.push('/');
    } catch (err: any) {
       console.error(err);
       setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5] dark:bg-[#18191A] p-4">
      <div className="bg-white dark:bg-[#242526] p-8 rounded-xl shadow-lg w-full max-w-md">
        <Link href="/login" className="inline-flex items-center text-[#65676B] dark:text-[#B0B3B8] hover:text-[#050505] dark:hover:text-[#E4E6EB] mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
        </Link>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-[#1877F2] rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#050505] dark:text-[#E4E6EB]">Create Account</h1>
          <p className="text-[#65676B] dark:text-[#B0B3B8]">Join Messenger today</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#050505] dark:text-[#E4E6EB] mb-1">Full Name</label>
            <input 
              {...register('name')}
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-[#F0F2F5] dark:bg-[#3A3B3C] border-none focus:ring-2 focus:ring-[#1877F2] outline-none text-[#050505] dark:text-[#E4E6EB]"
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#050505] dark:text-[#E4E6EB] mb-1">Email</label>
            <input 
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#F0F2F5] dark:bg-[#3A3B3C] border-none focus:ring-2 focus:ring-[#1877F2] outline-none text-[#050505] dark:text-[#E4E6EB]"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#050505] dark:text-[#E4E6EB] mb-1">Password</label>
            <input 
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#F0F2F5] dark:bg-[#3A3B3C] border-none focus:ring-2 focus:ring-[#1877F2] outline-none text-[#050505] dark:text-[#E4E6EB]"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#050505] dark:text-[#E4E6EB] mb-1">Confirm Password</label>
            <input 
              {...register('confirmPassword')}
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-[#F0F2F5] dark:bg-[#3A3B3C] border-none focus:ring-2 focus:ring-[#1877F2] outline-none text-[#050505] dark:text-[#E4E6EB]"
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#65676B] dark:text-[#B0B3B8] text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-[#1877F2] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
