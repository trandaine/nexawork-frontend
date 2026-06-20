import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"


export function InstagramPost() {
  return (
    <Card className="max-w-5/6 mx-auto border-none shadow-none md:border md:shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 ring-1 ring-border">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">johndoe</span>
            <span className="text-xs text-muted-foreground">Location, World</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative aspect-square w-full bg-muted overflow-hidden">
          {/* We're using a plain img tag or generic div to simulate an image since next/image needs domain config usually, but a placeholder works best here */}
          <img 
            src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000&auto=format&fit=crop" 
            alt="Post image"
            className="object-cover w-full h-full"
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start p-4 space-y-3">
        <div className="flex justify-between w-full items-center">
          <div className="flex space-x-4">
            <button className="hover:text-muted-foreground transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="hover:text-muted-foreground transition-colors">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="hover:text-muted-foreground transition-colors">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button className="hover:text-muted-foreground transition-colors">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>
        
        <div className="text-sm font-semibold">
          1,234 likes
        </div>
        
        <div className="text-sm">
          <span className="font-semibold mr-2">johndoe</span>
          Exploring the beauty of nature today! #adventure #nature
        </div>
        
        <div className="text-sm text-muted-foreground cursor-pointer">
          View all 89 comments
        </div>
        
        <div className="text-xs text-muted-foreground uppercase">
          2 hours ago
        </div>
      </CardFooter>
      <Separator />
      <div className="p-4 flex items-center space-x-3">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <Button variant="ghost" className="text-blue-500 font-semibold hover:text-blue-600 hover:bg-transparent px-0">
          Post
        </Button>
      </div>
    </Card>
  )
}
