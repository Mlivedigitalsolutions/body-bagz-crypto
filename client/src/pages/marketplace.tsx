import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  Image as ImageIcon, 
  AlertTriangle,
  ExternalLink,
  Flag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Listing } from "@shared/schema";

const CATEGORIES = [
  "art",
  "music", 
  "merch",
  "services",
  "events",
  "other"
];

interface ListingWithSeller extends Listing {
  seller: {
    username: string;
  };
}

export default function Marketplace() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [showComposer, setShowComposer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportingListingId, setReportingListingId] = useState<string>('');
  const [reportReason, setReportReason] = useState('');
  const [categoryFilter, setCategoryFilter] = useState("");
  const [hasImagesFilter, setHasImagesFilter] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Listing creation form state
  const [newListing, setNewListing] = useState({
    title: "",
    category: "other" as string,
    description: "",
    priceText: "",
    contact: "",
    images: [] as string[]
  });

  // Redirect to login if not authenticated when trying to view protected content
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required", 
        description: "Please log in to post listings to the marketplace.",
        variant: "default",
      });
    }
  }, [isAuthenticated, authLoading, toast]);

  // Fetch listings
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["/api/market/listings", { 
      q: searchQuery, 
      category: categoryFilter, 
      hasImages: hasImagesFilter,
      sort: sortBy 
    }],
    enabled: true,
  });

  // Create listing mutation
  const createListingMutation = useMutation({
    mutationFn: async (listingData: typeof newListing) => {
      return apiRequest("POST", "/api/market/listings", listingData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/market/listings"] });
      setShowComposer(false);
      setNewListing({
        title: "",
        category: "other",
        description: "",
        priceText: "",
        contact: "",
        images: []
      });
      toast({
        title: "Listing Created!",
        description: "Your listing is now live on the marketplace.",
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
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Report listing mutation
  const reportListingMutation = useMutation({
    mutationFn: async ({ listingId, reason }: { listingId: string; reason: string }) => {
      return apiRequest("POST", "/api/report", {
        type: "listing",
        refId: listingId,
        reason
      });
    },
    onSuccess: () => {
      toast({
        title: "Report Submitted",
        description: "Thank you for helping keep our marketplace safe.",
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
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateListing = () => {
    if (!newListing.title || !newListing.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createListingMutation.mutate(newListing);
  };

  const handleReportListing = (listingId: string) => {
    setReportingListingId(listingId);
    setReportModalOpen(true);
  };

  const submitReport = () => {
    if (reportReason.trim()) {
      reportListingMutation.mutate({ 
        listingId: reportingListingId, 
        reason: reportReason.trim() 
      });
      setReportModalOpen(false);
      setReportReason('');
      setReportingListingId('');
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      art: "bg-glitch-purple/20 text-glitch-purple",
      music: "bg-toxic-green/20 text-toxic-green", 
      merch: "bg-blood-red/20 text-blood-red",
      services: "bg-yellow-400/20 text-yellow-400",
      events: "bg-blue-400/20 text-blue-400",
      other: "bg-dim-gray/20 text-ash-white"
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <div className="bg-black text-ash-white font-body overflow-x-hidden min-h-screen">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4" data-testid="marketplace-navigation">
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
            <h1 className="font-brand text-4xl md:text-6xl text-glitch-purple mb-4" data-testid="marketplace-title">
              VILLAIN MARKETPLACE
            </h1>
            <p className="text-ash-white/90 text-lg font-medium mb-8">
              Peer-to-peer trading for the villain community. Art, music, services, and more.
            </p>
            
            {/* Warning Banner */}
            <div className="neon-card p-4 rounded-lg bg-yellow-400/10 border border-yellow-400/30 mb-8">
              <div className="flex items-center justify-center text-yellow-400">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">
                  Peer-to-peer trading at your own risk. No escrow. Verify before meeting or trading.
                </span>
              </div>
            </div>
            
            {isAuthenticated && (
              <Button 
                onClick={() => setShowComposer(!showComposer)}
                className="bg-gradient-to-r from-glitch-purple to-purple-600 hover:shadow-purple-glow transition-all duration-200"
                data-testid="create-listing-button"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Listing
              </Button>
            )}
          </div>

          {/* Listing Composer */}
          {showComposer && isAuthenticated && (
            <div className="neon-card p-6 md:p-8 rounded-xl mb-12">
              <h3 className="font-tech text-xl text-glitch-purple mb-6">Create New Listing</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-ash-white font-semibold mb-2">Title *</label>
                  <Input
                    placeholder="Villain Era Digital Art Collection"
                    value={newListing.title}
                    onChange={(e) => setNewListing(prev => ({ ...prev, title: e.target.value }))}
                    maxLength={100}
                    data-testid="listing-title-input"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ash-white font-semibold mb-2">Category *</label>
                    <Select value={newListing.category} onValueChange={(value) => setNewListing(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger data-testid="listing-category-select">
                        <SelectValue placeholder="Select category..." />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-ash-white font-semibold mb-2">Price (Optional)</label>
                    <Input
                      placeholder="0.1 SOL or $50 or Free"
                      value={newListing.priceText}
                      onChange={(e) => setNewListing(prev => ({ ...prev, priceText: e.target.value }))}
                      data-testid="listing-price-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-ash-white font-semibold mb-2">Description *</label>
                  <Textarea
                    placeholder="Detailed description of what you're offering. Include any terms, conditions, or special requirements..."
                    value={newListing.description}
                    onChange={(e) => setNewListing(prev => ({ ...prev, description: e.target.value }))}
                    maxLength={2000}
                    rows={5}
                    data-testid="listing-description-input"
                  />
                </div>
                
                <div>
                  <label className="block text-ash-white font-semibold mb-2">Contact Info</label>
                  <Input
                    placeholder="@yourtwitter or @yourtelegram"
                    value={newListing.contact}
                    onChange={(e) => setNewListing(prev => ({ ...prev, contact: e.target.value }))}
                    data-testid="listing-contact-input"
                  />
                  <p className="text-dim-enhanced text-xs mt-1">
                    Leave blank to use your profile contact info
                  </p>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowComposer(false)}
                    data-testid="cancel-listing-button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateListing}
                    disabled={createListingMutation.isPending}
                    className="bg-gradient-to-r from-glitch-purple to-purple-600 hover:shadow-purple-glow"
                    data-testid="submit-listing-button"
                  >
                    {createListingMutation.isPending ? "Creating..." : "Create Listing"}
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
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="search-listings-input"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger data-testid="category-filter-select">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasImages"
                  checked={hasImagesFilter}
                  onChange={(e) => setHasImagesFilter(e.target.checked)}
                  className="rounded"
                  data-testid="images-filter-checkbox"
                />
                <label htmlFor="hasImages" className="text-sm text-ash-white">Has Images</label>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger data-testid="sort-filter-select">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Listings Feed */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-glitch-purple border-t-transparent rounded-full mx-auto"></div>
                <p className="text-dim-enhanced mt-4">Loading listings...</p>
              </div>
            ) : (listings as ListingWithSeller[]).length === 0 ? (
              <div className="col-span-full text-center py-12">
                <ShoppingBag className="w-16 h-16 text-dim-gray mx-auto mb-4" />
                <h3 className="text-xl text-ash-white mb-2">No listings found</h3>
                <p className="text-dim-enhanced">
                  {isAuthenticated 
                    ? "Be the first to create a listing!" 
                    : "Log in to create listings and trade with the community."
                  }
                </p>
              </div>
            ) : (
              (listings as ListingWithSeller[]).map((listing: ListingWithSeller) => (
                <div key={listing.id} className="neon-card p-6 rounded-xl" data-testid={`listing-card-${listing.id}`}>
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={getCategoryColor(listing.category)}>
                        {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
                      </Badge>
                      {isAuthenticated && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReportListing(listing.id)}
                          className="text-dim-gray hover:text-blood-red p-1"
                          data-testid={`report-button-${listing.id}`}
                        >
                          <Flag className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <h3 className="font-tech text-lg text-ash-white mb-2">{listing.title}</h3>
                    
                    {listing.priceText && (
                      <p className="text-toxic-green font-semibold mb-3">{listing.priceText}</p>
                    )}
                    
                    <p className="text-dim-enhanced text-sm leading-relaxed mb-4 line-clamp-3">
                      {listing.description}
                    </p>
                    
                    {listing.images && listing.images.length > 0 && (
                      <div className="flex items-center text-glitch-purple text-sm mb-4">
                        <ImageIcon className="w-4 h-4 mr-1" />
                        {listing.images.length} image{listing.images.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-dim-enhanced">
                      by @{listing.seller.username}
                    </span>
                    
                    <div className="flex space-x-2">
                      {/* Pay with $BAGZ placeholder */}
                      <Button 
                        size="sm" 
                        variant="outline"
                        disabled
                        className="text-xs"
                        data-testid={`pay-bagz-button-${listing.id}`}
                      >
                        Pay with $BAGZ
                        <span className="text-dim-gray ml-1">(Soon)</span>
                      </Button>
                      
                      {listing.contact && (
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-toxic-green to-emerald-600 hover:shadow-green-glow text-xs"
                          onClick={() => {
                            if (listing.contact?.startsWith('@')) {
                              // Open Twitter or Telegram
                              if (listing.contact.includes('t.me') || listing.contact.includes('telegram')) {
                                window.open(`https://t.me/${listing.contact.replace('@', '')}`, '_blank');
                              } else {
                                window.open(`https://twitter.com/${listing.contact.replace('@', '')}`, '_blank');
                              }
                            }
                          }}
                          data-testid={`contact-button-${listing.id}`}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Contact
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>

      {/* Report Modal */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="bg-onyx border-blood-red">
          <DialogHeader>
            <DialogTitle className="text-blood-red font-brand">Report Listing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-reason" className="text-ash-white">
                Why are you reporting this listing?
              </Label>
              <Textarea
                id="report-reason"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Please describe the issue with this listing..."
                className="bg-jet-black border-dim-gray text-ash-white mt-2"
                rows={4}
                data-testid="report-reason-textarea"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setReportModalOpen(false);
                setReportReason('');
              }}
              className="border-dim-gray text-dim-gray hover:bg-dim-gray hover:text-jet-black"
              data-testid="report-cancel-button"
            >
              Cancel
            </Button>
            <Button
              onClick={submitReport}
              disabled={!reportReason.trim()}
              className="bg-blood-red hover:bg-red-600 text-white"
              data-testid="report-submit-button"
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-dim-gray/30">
        <div className="max-w-6xl mx-auto text-center px-4">
          <p className="text-dim-enhanced mb-4">
            Trade safely. Build community. Embrace the chaos.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="/" className="text-blood-red hover:text-ash-white transition-colors">
              Back to Main Site
            </a>
            <a href="/mission" className="text-toxic-green hover:text-ash-white transition-colors">
              Our Mission
            </a>
            <a href="/meetups" className="text-blood-red hover:text-ash-white transition-colors">
              Meetups
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}