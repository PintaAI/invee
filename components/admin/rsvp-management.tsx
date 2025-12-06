"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus, Copy, Check, Trash2 } from "lucide-react";

interface RSVPEntry {
  id: string;
  name: string;
  attendance: "hadir" | "tidak-hadir";
  message: string;
  timestamp: string;
}

interface Guest {
  id: string;
  name: string;
  side: "bride" | "groom";
  createdAt: string;
}

export default function RSVPManagement() {
  const [rsvpData, setRsvpData] = useState<RSVPEntry[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGuests, setIsLoadingGuests] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", side: "bride" as "bride" | "groom" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingGuestId, setDeletingGuestId] = useState<string | null>(null);

  const confirmedCount = rsvpData.filter(rsvp => rsvp.attendance === "hadir").length;
  const declinedCount = rsvpData.filter(rsvp => rsvp.attendance === "tidak-hadir").length;

  const fetchGuests = async () => {
    setIsLoadingGuests(true);
    
    try {
      const response = await fetch("/api/guests");
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch guests");
      }
      
      setGuests(result.data || []);
    } catch (err) {
      console.error("Error fetching guests:", err);
    } finally {
      setIsLoadingGuests(false);
    }
  };

  const fetchRSVPs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/rsvp");
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch RSVPs");
      }
      
      setRsvpData(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch RSVPs");
      console.error("Error fetching RSVPs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuest),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add guest");
      }

      setNewGuest({ name: "", side: "bride" });
      setShowAddGuest(false);
      fetchGuests();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add guest");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRSVP = async (id: string) => {
    if (!confirm("Are you sure you want to delete this RSVP?")) return;
    
    setDeletingId(id);
    try {
      const response = await fetch(`/api/rsvp?id=${id}`, {
        method: "DELETE",
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to delete RSVP");
      }
      
      // Update local state
      setRsvpData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting RSVP:", err);
      // Optional: show error toast/message
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteGuest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guest?")) return;
    
    setDeletingGuestId(id);
    try {
      const response = await fetch(`/api/guests?id=${id}`, {
        method: "DELETE",
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to delete guest");
      }
      
      // Update local state
      setGuests(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting guest:", err);
    } finally {
      setDeletingGuestId(null);
    }
  };

  const copyGuestURL = (guest: Guest) => {
    const baseURL = window.location.origin;
    const guestURL = `${baseURL}/?name=${encodeURIComponent(guest.name)}&side=${guest.side}`;
    
    navigator.clipboard.writeText(guestURL).then(() => {
      setCopiedId(guest.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  useEffect(() => {
    fetchRSVPs();
    fetchGuests();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {/* Guest Management Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Guest List</CardTitle>
              <CardDescription className="text-sm">Add guests and generate invitation URLs</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddGuest(!showAddGuest)}
              className="h-8 px-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Guest
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddGuest && (
            <form onSubmit={handleAddGuest} className="mb-4 p-4 border rounded-lg space-y-3">
              <div className="space-y-2">
                <label htmlFor="guestName" className="text-sm font-medium">
                  Guest Name
                </label>
                <input
                  type="text"
                  id="guestName"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm"
                  placeholder="Enter guest name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Side</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`cursor-pointer rounded-lg p-2 flex items-center justify-center transition-all border text-sm ${newGuest.side === 'bride' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border'}`}>
                    <input
                      type="radio"
                      name="side"
                      value="bride"
                      checked={newGuest.side === "bride"}
                      onChange={(e) => setNewGuest({ ...newGuest, side: e.target.value as "bride" | "groom" })}
                      className="hidden"
                    />
                    <span>Bride</span>
                  </label>
                  <label className={`cursor-pointer rounded-lg p-2 flex items-center justify-center transition-all border text-sm ${newGuest.side === 'groom' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border'}`}>
                    <input
                      type="radio"
                      name="side"
                      value="groom"
                      checked={newGuest.side === "groom"}
                      onChange={(e) => setNewGuest({ ...newGuest, side: e.target.value as "bride" | "groom" })}
                      className="hidden"
                    />
                    <span>Groom</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting} size="sm" className="flex-1">
                  {isSubmitting ? "Adding..." : "Add Guest"}
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddGuest(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {isLoadingGuests ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">Loading guests...</p>
              </div>
            ) : guests.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">No guests added yet</p>
              </div>
            ) : (
              guests.map((guest) => (
                <div key={guest.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{guest.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {guest.side === "bride" ? "Bride" : "Groom"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyGuestURL(guest)}
                      className="h-7 px-2"
                      title="Copy Link"
                    >
                      {copiedId === guest.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteGuest(guest.id)}
                      disabled={deletingGuestId === guest.id}
                      className="h-7 px-2 text-muted-foreground hover:text-red-500"
                      title="Delete Guest"
                    >
                      {deletingGuestId === guest.id ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-2">
          <div className="text-center">
            <div className="text-lg font-bold">{rsvpData.length}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </Card>
        
        <Card className="p-2">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{confirmedCount}</div>
            <p className="text-xs text-muted-foreground">Confirmed</p>
          </div>
        </Card>
        
        <Card className="p-2">
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">{declinedCount}</div>
            <p className="text-xs text-muted-foreground">Declined</p>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">RSVP Responses</CardTitle>
              <CardDescription className="text-sm">Manage and view all guest responses</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRSVPs}
              disabled={isLoading}
              className="h-8 px-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground text-sm mt-2">Loading RSVPs...</p>
              </div>
            ) : rsvpData.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground text-sm">No RSVP responses yet</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Guest responses will appear here once they submit the form
                </p>
              </div>
            ) : (
              rsvpData.map((rsvp) => (
                <div key={rsvp.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-sm">{rsvp.name}</h3>
                      <Badge variant={rsvp.attendance === "hadir" ? "default" : "secondary"} className="text-xs">
                        {rsvp.attendance === "hadir" ? "Attending" : "Not Attending"}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRSVP(rsvp.id)}
                      disabled={deletingId === rsvp.id}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-red-500"
                    >
                      {deletingId === rsvp.id ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(rsvp.timestamp)}
                    </span>
                  </div>
                  {rsvp.message && (
                    <p className="text-xs text-muted-foreground italic">
                      &quot;{rsvp.message}&quot;
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}