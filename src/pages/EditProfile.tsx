
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Camera, MapPin } from "lucide-react";
import { toast } from "sonner";

const EditProfile = () => {
  const [fullName, setFullName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [location, setLocation] = useState("Tel Aviv, Israel");
  const [bio, setBio] = useState("Hi there! I love outdoor activities and sharing my gear with others.");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would update the user profile in a real app
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-[420px] mx-auto bg-white min-h-screen pb-16">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Edit Profile</h1>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-xl">JD</span>
            </div>
            <div className="absolute bottom-0 right-0 bg-[rgba(83,177,117,1)] rounded-full p-2">
              <Camera className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <Label htmlFor="fullName" className="block mb-2 font-medium">Full Name</Label>
            <Input 
              id="fullName" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="block mb-2 font-medium">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="block mb-2 font-medium">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="location" className="block mb-2 font-medium">Location</Label>
            <div className="relative">
              <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                id="location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bio" className="block mb-2 font-medium">Bio</Label>
            <Textarea 
              id="bio" 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-24"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setFullName("Jane Doe");
                setEmail("jane.doe@example.com");
                setPhone("(555) 123-4567");
                setLocation("Tel Aviv, Israel");
                setBio("Hi there! I love outdoor activities and sharing my gear with others.");
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-[rgba(83,177,117,1)] hover:bg-[rgba(83,177,117,0.8)]"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
