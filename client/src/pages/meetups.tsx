import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Plus, Filter, Search, Clock, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Meetup } from "@shared/schema";

const AVAILABLE_TAGS = [
  "shill-raid",
  "IRL-sticker-run", 
  "launch-party",
  "community-meetup",
  "trading-session",
  "meme-contest",
  "villain-gathering"
];

interface MeetupWithRsvps extends Meetup {
  rsvpCount: number;
  userHasRsvped: boolean;
  creator: {
    username: string;
  };
}

export default function Meetups() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [showComposer, setShowComposer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Meetup creation form state
  const [newMeetup, setNewMeetup] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    eventAt: "",
    tags: [] as string[],
    images: [] as string[]
  });

  // Redirect to login if not authenticated when trying to view protected content
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to post meetups and RSVP to events.",
        variant: "default",
      });
    }
  }, [isAuthenticated, authLoading, toast]);

  // Fetch meetups
  const { data: meetups = [], isLoading } = useQuery({
    queryKey: ["/api/meetups", { q: searchQuery, city: cityFilter, tags: tagFilter, sort: sortBy }],
    enabled: true,
  });

  // Create meetup mutation
  const createMeetupMutation = useMutation({
    mutationFn: async (meetupData: typeof newMeetup) => {
      return apiRequest("POST", "/api/meetups", meetupData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meetups"] });
      setShowComposer(false);
      setNewMeetup({
        title: "",
        description: "",
        city: "",
        country: "",
        eventAt: "",
        tags: [],
        images: []
      });
      toast({
        title: "Meetup Created!",
        description: "Your meetup has been posted to the community.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create meetup. Please try again.",
        variant: "destructive",
      });
    },
  });

  // RSVP mutation
  const rsvpMutation = useMutation({
    mutationFn: async ({ meetupId, action }: { meetupId: string; action: 'rsvp' | 'unrsvp' }) => {
      if (action === 'rsvp') {
        return apiRequest("POST", `/api/meetups/${meetupId}/rsvp`);
      } else {
        return apiRequest("DELETE", `/api/meetups/${meetupId}/rsvp`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/meetups"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized", 
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update RSVP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateMeetup = () => {
    if (!newMeetup.title || !newMeetup.description || !newMeetup.city || !newMeetup.eventAt) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createMeetupMutation.mutate(newMeetup);
  };

  const toggleTag = (tag: string) => {
    setNewMeetup(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-black text-ash-white font-body overflow-x-hidden min-h-screen">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4" data-testid="meetups-navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center space-x-4">
            <span className="font-brand text-xl tracking-tight text-blood-red">BODY BAGZ</span>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-ash-white hover:text-toxic-green transition-colors font-semibold">Back to Home</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-brand text-4xl md:text-6xl text-blood-red mb-4" data-testid="meetups-title">
              VILLAIN MEETUPS
            </h1>
            <p className="text-ash-white/90 text-lg font-medium mb-8">
              Connect with fellow villains in the real world. Coordinate chaos, build culture.
            </p>
            
            {isAuthenticated && (
              <Button 
                onClick={() => setShowComposer(!showComposer)}
                className="bg-gradient-to-r from-blood-red to-red-600 hover:shadow-red-glow transition-all duration-200"
                data-testid="create-meetup-button"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Meetup
              </Button>
            )}
          </div>

          {/* Meetup Composer */}
          {showComposer && isAuthenticated && (
            <div className="neon-card p-6 md:p-8 rounded-xl mb-12">
              <h3 className="font-tech text-xl text-toxic-green mb-6">Create New Meetup</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-ash-white font-semibold mb-2">Title *</label>
                  <Input
                    placeholder="Villain Era Miami Meetup"
                    value={newMeetup.title}
                    onChange={(e) => setNewMeetup(prev => ({ ...prev, title: e.target.value }))}
                    maxLength={80}
                    data-testid="meetup-title-input"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ash-white font-semibold mb-2">City *</label>
                    <Input
                      placeholder="Miami"
                      value={newMeetup.city}
                      onChange={(e) => setNewMeetup(prev => ({ ...prev, city: e.target.value }))}
                      data-testid="meetup-city-input"
                    />
                  </div>
                  <div>
                    <label className="block text-ash-white font-semibold mb-2">Country *</label>
                    <Input
                      placeholder="USA"
                      value={newMeetup.country}
                      onChange={(e) => setNewMeetup(prev => ({ ...prev, country: e.target.value }))}
                      data-testid="meetup-country-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-ash-white font-semibold mb-2">Date & Time *</label>
                  <Input
                    type="datetime-local"
                    value={newMeetup.eventAt}
                    onChange={(e) => setNewMeetup(prev => ({ ...prev, eventAt: e.target.value }))}
                    data-testid="meetup-datetime-input"
                  />
                </div>
                
                <div>
                  <label className="block text-ash-white font-semibold mb-2">Description *</label>
                  <Textarea
                    placeholder="Join us for a villain era meetup in Miami. We'll be coordinating some chaos, sharing memes, and building our local community..."
                    value={newMeetup.description}
                    onChange={(e) => setNewMeetup(prev => ({ ...prev, description: e.target.value }))}
                    maxLength={1000}
                    rows={4}
                    data-testid="meetup-description-input"
                  />
                </div>
                
                <div>
                  <label className="block text-ash-white font-semibold mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_TAGS.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          newMeetup.tags.includes(tag)
                            ? "bg-toxic-green text-black"
                            : "bg-dim-gray/30 text-ash-white hover:bg-dim-gray/50"
                        }`}
                        data-testid={`tag-${tag}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowComposer(false)}
                    data-testid="cancel-meetup-button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateMeetup}
                    disabled={createMeetupMutation.isPending}
                    className="bg-gradient-to-r from-toxic-green to-emerald-600 hover:shadow-green-glow"
                    data-testid="submit-meetup-button"
                  >
                    {createMeetupMutation.isPending ? "Creating..." : "Create Meetup"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Filters & Search */}
          <div className="neon-card p-6 rounded-xl mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-dim-gray" />
                <Input
                  placeholder="Search meetups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="search-meetups-input"
                />
              </div>
              
              <Input
                placeholder="Filter by city..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                data-testid="city-filter-input"
              />
              
              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger data-testid="tag-filter-select">
                  <SelectValue placeholder="Filter by tag..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Tags</SelectItem>
                  {AVAILABLE_TAGS.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="sort-filter-select">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="event-date">Event Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Meetups Feed */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-toxic-green border-t-transparent rounded-full mx-auto"></div>
                <p className="text-dim-enhanced mt-4">Loading meetups...</p>
              </div>
            ) : (meetups as MeetupWithRsvps[]).length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-dim-gray mx-auto mb-4" />
                <h3 className="text-xl text-ash-white mb-2">No meetups found</h3>
                <p className="text-dim-enhanced">
                  {isAuthenticated 
                    ? "Be the first to create a meetup in your area!" 
                    : "Log in to create and RSVP to meetups."
                  }
                </p>
              </div>
            ) : (
              (meetups as MeetupWithRsvps[]).map((meetup: MeetupWithRsvps) => (
                <div key={meetup.id} className="neon-card p-6 rounded-xl" data-testid={`meetup-card-${meetup.id}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-tech text-xl text-blood-red mb-2">{meetup.title}</h3>
                      <div className="flex items-center text-dim-enhanced text-sm space-x-4 mb-3">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {meetup.city}, {meetup.country}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(meetup.eventAt.toString())}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {meetup.rsvpCount} attending
                        </span>
                      </div>
                      
                      {meetup.tags && meetup.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {meetup.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-1 bg-toxic-green/20 text-toxic-green rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-ash-white leading-relaxed mb-4">{meetup.description}</p>
                      
                      <p className="text-dim-enhanced text-sm">
                        Created by @{meetup.creator.username}
                      </p>
                    </div>
                    
                    {isAuthenticated && (
                      <Button 
                        onClick={() => rsvpMutation.mutate({ 
                          meetupId: meetup.id, 
                          action: meetup.userHasRsvped ? 'unrsvp' : 'rsvp' 
                        })}
                        disabled={rsvpMutation.isPending}
                        className={`ml-4 ${
                          meetup.userHasRsvped 
                            ? "bg-gradient-to-r from-dim-gray to-gray-600" 
                            : "bg-gradient-to-r from-toxic-green to-emerald-600 hover:shadow-green-glow"
                        } transition-all duration-200`}
                        data-testid={`rsvp-button-${meetup.id}`}
                      >
                        {meetup.userHasRsvped ? "Cancel RSVP" : "RSVP"}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Community Rules Sidebar */}
          <div className="neon-card p-6 rounded-xl mt-12">
            <h3 className="font-tech text-lg text-yellow-400 mb-4 flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Community Rules
            </h3>
            <ul className="text-ash-white space-y-2 text-sm">
              <li>• No doxxing or sharing personal information</li>
              <li>• Keep activities legal and safe</li>
              <li>• No hate speech or discrimination</li>
              <li>• Respect local laws and regulations</li>
              <li>• Moderators may remove inappropriate content</li>
              <li>• Have fun and embrace the villain culture</li>
            </ul>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-dim-gray/30">
        <div className="max-w-6xl mx-auto text-center px-4">
          <p className="text-dim-enhanced mb-4">
            Building chaos, one meetup at a time.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="/" className="text-blood-red hover:text-ash-white transition-colors">
              Back to Main Site
            </a>
            <a href="/mission" className="text-toxic-green hover:text-ash-white transition-colors">
              Our Mission
            </a>
            <a href="/market" className="text-glitch-purple hover:text-ash-white transition-colors">
              Marketplace
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}