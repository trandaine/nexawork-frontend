import { InstagramPost } from "@/features/home/components/instagram-post"

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center py-8 px-4 w-full bg-background min-h-screen">
      
      <div className="w-full space-y-8">
        {/* <h1 className="text-2xl font-bold tracking-tight mx-2 mb-1">Your Feed</h1> */}
        <InstagramPost />
        {/* We could add more posts here to show a scrolling feed */}
        <div className="pt-8">
          <InstagramPost />
        </div>
      </div>
    </div>
  )
}
