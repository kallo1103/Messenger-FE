'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["male", "female", "custom"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log('Register data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-[450px] w-full">
        
        <h1 className="text-[#1877F2] text-5xl font-bold tracking-tighter mb-8">messenger</h1>

        <div className="bg-white p-4 rounded-xl shadow-lg w-full">
          <div className="text-center mb-4 border-b border-[#dadde1] pb-4">
            <h2 className="text-[25px] font-bold text-[#1C1E21] leading-8">Create a new account</h2>
            <p className="text-[17px] text-[#606770]">It&apos;s quick and easy.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="First name"
                  className={cn(
                    "w-full px-3 py-2 text-[15px] border rounded-md bg-[#F5F6F7] focus:outline-none focus:border-[#1877F2]",
                    errors.firstName ? "border-red-500" : "border-[#ccd0d5]"
                  )}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div className="flex-1">
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Surname"
                  className={cn(
                    "w-full px-3 py-2 text-[15px] border rounded-md bg-[#F5F6F7] focus:outline-none focus:border-[#1877F2]",
                    errors.lastName ? "border-red-500" : "border-[#ccd0d5]"
                  )}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className={cn(
                  "w-full px-3 py-2 text-[15px] border rounded-md bg-[#F5F6F7] focus:outline-none focus:border-[#1877F2]",
                  errors.email ? "border-red-500" : "border-[#ccd0d5]"
                )}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register('password')}
                type="password"
                placeholder="New password"
                className={cn(
                  "w-full px-3 py-2 text-[15px] border rounded-md bg-[#F5F6F7] focus:outline-none focus:border-[#1877F2]",
                  errors.password ? "border-red-500" : "border-[#ccd0d5]"
                )}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="space-y-1">
               <label className="text-xs text-[#606770] font-semibold">Gender</label>
               <div className="flex gap-3">
                 <label className="flex-1 flex items-center justify-between border border-[#ccd0d5] p-2 rounded-md cursor-pointer hover:bg-gray-50">
                    <span className="text-[15px] text-[#1C1E21]">Female</span>
                    <input type="radio" value="female" {...register('gender')} />
                 </label>
                 <label className="flex-1 flex items-center justify-between border border-[#ccd0d5] p-2 rounded-md cursor-pointer hover:bg-gray-50">
                    <span className="text-[15px] text-[#1C1E21]">Male</span>
                    <input type="radio" value="male" {...register('gender')} />
                 </label>
                 <label className="flex-1 flex items-center justify-between border border-[#ccd0d5] p-2 rounded-md cursor-pointer hover:bg-gray-50">
                    <span className="text-[15px] text-[#1C1E21]">Custom</span>
                    <input type="radio" value="custom" {...register('gender')} />
                 </label>
               </div>
               {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
            </div>

            <p className="text-[11px] text-[#777] mt-2 mb-4">
              People who use our service may have uploaded your contact information to Facebook. <a href="#" className="text-[#385898] hover:underline">Learn more</a>.
              <br /><br />
              By clicking Sign Up, you agree to our <a href="#" className="text-[#385898] hover:underline">Terms</a>, <a href="#" className="text-[#385898] hover:underline">Privacy Policy</a> and <a href="#" className="text-[#385898] hover:underline">Cookies Policy</a>.
            </p>

            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 bg-[#00a400] text-white text-[18px] font-bold py-2 rounded-md hover:bg-[#008f00] transition-colors disabled:opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-[#1877F2] text-sm hover:underline">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
