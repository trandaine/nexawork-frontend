import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react'
import React from 'react'

export default function BlankPage() {
    const bannerImage = "https://plus.unsplash.com/premium_photo-1733864827286-d43afe9a1ae7?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const avatarImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop";
    return (
        <div className="flex flex-1 flex-col items-center py-8 px-4 w-full bg-background min-h-screen">
            <h1 className="text-2xl font-bold tracking-tight mb-6">Blank Page</h1>
            <p>This is a blank page. You can start building your content here.</p>



            {/* <div className="min-h-screen bg-[#f4f2ee] flex items-center justify-center p-4 font-sans"> */}
            {/* Card Container */}
            <div className="w-full relative max-w-85 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                {/* Top 50%: Banner Section */}
                <div className="h-25 w-full bg-gray-200 relative">
                    <img
                        src={bannerImage}
                        alt="Profile Banner"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute top-13 left-4  z-10 h-26 w-26">
                    <Avatar className="inset-0.75 w-24.5 h-24.5 rounded-full object-cover z-10">
                        <AvatarImage src={avatarImage} alt="Trần Quang Đại" />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                </div>


                {/* Bottom 50%: Profile Info Section */}
                <div className="px-5 pb-5 relative bg-[#faf9f6]">
                    <div className="mt-16"></div>
                    <h1 className="text-xl font-bold text-gray-900 leading-tight">
                        Trần Quang Đại
                    </h1>
                    <p className="text-[15px] text-gray-800 mt-1 leading-snug">
                        Full-Stack Developer (.NET Core / React) | @Greenwich Vietnam
                    </p>
                    <p className="text-[13px] text-gray-500 mt-1.5">
                        Ho Chi Minh City
                    </p>

                    {/* Add Experience Button */}
                    {/* <button
                            className="mt-4 w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#f8f9fa] border-[1.5px] border-dashed border-[#8d9ab0] rounded-lg text-[#4a5e7b] font-semibold hover:bg-gray-100 transition-colors duration-200"
                        >
                            <Plus strokeWidth={2.5} className="w-4.5 h-4.5" />
                            Experience
                        </button> */}
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}