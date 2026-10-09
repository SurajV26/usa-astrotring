import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Phone, MessageCircle, User } from "lucide-react"
import { HiMiniCheckBadge } from "react-icons/hi2";


const AstrologerCard = ({ call_price, chat_price, daily_available_hours, languages, experience, id, is_online, name, profile_image, rating, rating_count, expertise, total_call_duration_sec, total_chat_duration_sec, username }) => {
  return (
    <Card className="w-full max-w-md rounded-tl-4xl rounded-br-4xl rounded-bl-0 rounded-tr-0  border">
      <CardContent className="p-4 space-y-4">

        {/* Top Section */}
        <div className="flex items-start gap-4">
          <div className="relative">
            {
              profile_image ?
                <img
                  src={profile_image}
                  alt={name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                :
                <User className="w-12 h-12 rounded-full object-cover bg-muted p-2" />
            }
            <span
              className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white ${is_online ? "bg-green-500" : "bg-gray-400"
                }`}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-secondary">{name}</h4>
              <HiMiniCheckBadge size={25} color="green" />
            </div>

            {/* <span className="text-xs! block text-muted-foreground">{languages}</span> */}
            <span className="text-xs! block text-muted-foreground">{experience}</span>
            <span className="text-xs! block text-muted-foreground truncate">
              {expertise?.map((exp, index) => (
                <span key={index}>
                  {exp}{index < expertise.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>

            <div className="flex items-center gap-1 mt-1 text-xs">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">
                | {rating_count} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-end ">
            <span className="text-sm font-semibold text-green-600">
              ${call_price}/Min for Call
            </span>
            <span className="text-sm font-semibold text-green-600">
              ${chat_price}/Min for Chat
            </span>

          </div>

          <div className="flex  ms-auto gap-2">
            <Button
              size="sm"
              disabled={!is_online}
              className="gap-1 text-xs! bg-orange-500 text-white"
            >
              <MessageCircle className="w-4 h-4" />
              {is_online ? "Chat" : "Offline"}
            </Button>

            <Button
              size="sm"

              disabled={!is_online}
              className="gap-1 text-xs! bg-green-500 text-white"
            >
              <Phone className="w-4 h-4" />
              {is_online ? "Call" : "Offline"}
            </Button>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default AstrologerCard
