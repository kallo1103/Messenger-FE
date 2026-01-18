'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils'; // Assuming you have a utils file
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate login
    console.log('Login data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Here you would redirect to the main app
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-[980px] w-full gap-8 md:gap-16">
        
        {/* Branding Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-[#1877F2] text-6xl font-bold tracking-tighter mb-4">messenger</h1>
          <p className="text-[24px] leading-[28px] md:text-[28px] md:leading-[32px] font-normal text-[#1C1E21] max-w-[500px]">
            Connect with friends and the world around you on Messenger.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-[396px]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email or phone number"
                className={cn(
                  "w-full px-4 py-3.5 text-[17px] border rounded-md focus:outline-none focus:border-[#1877F2] focus:shadow-[0_0_0_2px_#E7F3FF]",
                  errors.email ? "border-red-500" : "border-[#dddfe2]"
                )}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 text-left">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className={cn(
                  "w-full px-4 py-3.5 text-[17px] border rounded-md focus:outline-none focus:border-[#1877F2] focus:shadow-[0_0_0_2px_#E7F3FF]",
                  errors.password ? "border-red-500" : "border-[#dddfe2]"
                )}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 text-left">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1877F2] text-white text-[20px] font-bold py-2.5 rounded-md hover:bg-[#166FE5] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <div className="mt-4 text-center border-b border-[#dadde1] pb-4">
            <a href="#" className="text-[#1877F2] text-sm hover:underline">Forgot password?</a>
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/register"
              className="inline-block bg-[#42b72a] text-white text-[17px] font-bold px-4 py-3 rounded-md hover:bg-[#36a420] transition-colors"
            >
              Create new account
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center text-xs text-[#737373]">
        <p>Messenger Clone © 2026</p>
      </div>
    </div>
  );
}
