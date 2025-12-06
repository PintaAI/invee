"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RSVPManagement from "@/components/admin/rsvp-management";
import EventManagement from "@/components/admin/event-management";
import CoupleManagement from "@/components/admin/couple-management";

interface RSVPData {
  id: string;
  name: string;
  attendance: "hadir" | "tidak-hadir";
  message: string;
  timestamp: string;
}

interface WeddingInfo {
  couple: {
    partner1: { name: string };
    partner2: { name: string };
  };
  brideEvents: {
    akad: { title: string; date: string; time: string };
    resepsi: { title: string; date: string; time: string };
  };
  groomEvents: {
    unduhMantu: { title: string; date: string; time: string };
    pengajian: { title: string; date: string; time: string };
  };
}

export default function AdminPage() {
  const [rsvpData, setRsvpData] = useState<RSVPData[]>([]);
  const [weddingData, setWeddingData] = useState<WeddingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch RSVP data
        const rsvpResponse = await fetch('/api/rsvp');
        const rsvpResult = await rsvpResponse.json();
        if (rsvpResult.success) {
          setRsvpData(rsvpResult.data);
        }

        // Fetch wedding data
        const weddingResponse = await fetch('/api/wedding');
        const weddingResult = await weddingResponse.json();
        if (weddingResult.success && weddingResult.data) {
          setWeddingData(weddingResult.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRSVPs = rsvpData.length;
  const confirmedRSVPs = rsvpData.filter(r => r.attendance === 'hadir').length;
  const declinedRSVPs = rsvpData.filter(r => r.attendance === 'tidak-hadir').length;
  const totalEvents = weddingData ? 4 : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const upcomingEvents = weddingData ? [
    { ...weddingData.brideEvents.akad, type: 'bride' },
    { ...weddingData.brideEvents.resepsi, type: 'bride' },
    { ...weddingData.groomEvents.unduhMantu, type: 'groom' },
    { ...weddingData.groomEvents.pengajian, type: 'groom' }
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 2) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">Admin Dashboard</h1>
        
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="dashboard" className="text-xs py-2 px-1">Dash</TabsTrigger>
            <TabsTrigger value="rsvp" className="text-xs py-2 px-1">RSVP</TabsTrigger>
            <TabsTrigger value="events" className="text-xs py-2 px-1">Events</TabsTrigger>
            <TabsTrigger value="couple" className="text-xs py-2 px-1">Couple</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalRSVPs}</div>
                  <p className="text-xs text-muted-foreground mt-1">Total RSVPs</p>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{confirmedRSVPs}</div>
                  <p className="text-xs text-muted-foreground mt-1">Confirmed</p>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{declinedRSVPs}</div>
                  <p className="text-xs text-muted-foreground mt-1">Declined</p>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{totalEvents}</div>
                  <p className="text-xs text-muted-foreground mt-1">Events</p>
                </div>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription className="text-sm">Your wedding events schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(event.date)} - {event.time}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">Upcoming</Badge>
                    </div>
                  )) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No events scheduled
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rsvp">
            <RSVPManagement />
          </TabsContent>
          
          <TabsContent value="events">
            <EventManagement />
          </TabsContent>

          <TabsContent value="couple">
            <CoupleManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}