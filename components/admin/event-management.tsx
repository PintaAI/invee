"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { weddingData, Event, WeddingInfo } from "@/lib/data/wedding";
import { RefreshCw, } from "lucide-react";

export default function EventManagement() {
  const [currentWeddingData, setCurrentWeddingData] = useState<WeddingInfo>(weddingData);
  const [events, setEvents] = useState<Event[]>([
    weddingData.brideEvents.akad,
    weddingData.brideEvents.resepsi,
    weddingData.groomEvents.unduhMantu,
    weddingData.groomEvents.pengajian
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({});

  const fetchWeddingData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/wedding");
      const result = await response.json();
      
      if (result.success && result.data) {
        setCurrentWeddingData(result.data);
        setEvents([
          result.data.brideEvents.akad,
          result.data.brideEvents.resepsi,
          result.data.groomEvents.unduhMantu,
          result.data.groomEvents.pengajian
        ]);
      }
    } catch (err) {
      console.error("Error fetching wedding data:", err);
      setError("Failed to fetch wedding data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeddingData();
  }, []);

  const saveToBlob = async (updatedData: WeddingInfo) => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await fetch("/api/wedding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to save data");
      }
      
      setSuccessMessage("Changes saved successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error saving wedding data:", err);
      setError(err instanceof Error ? err.message : "Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event.id);
    setFormData(event);
  };

  const handleSave = () => {
    if (editingEvent && formData) {
      const updatedEvents = events.map(event =>
        event.id === editingEvent
          ? { ...event, ...formData } as Event
          : event
      );
      
      setEvents(updatedEvents);
      
      // Update the main wedding data object
      const updatedWeddingData = { ...currentWeddingData };
      
      // Map updated events back to specific event keys
      updatedEvents.forEach(event => {
        if (event.id === "akad") updatedWeddingData.brideEvents.akad = event;
        if (event.id === "resepsi-bride") updatedWeddingData.brideEvents.resepsi = event;
        if (event.id === "unduh-mantu") updatedWeddingData.groomEvents.unduhMantu = event;
        if (event.id === "pengajian") updatedWeddingData.groomEvents.pengajian = event;
      });
      
      setCurrentWeddingData(updatedWeddingData);
      saveToBlob(updatedWeddingData);
      
      setEditingEvent(null);
      setFormData({});
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof Event, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Event Management</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchWeddingData}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        {isSaving && <span className="text-xs text-muted-foreground">Saving...</span>}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="text-xs">ID: {event.id}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  {editingEvent === event.id ? (
                    <>
                      <Button size="sm" onClick={handleSave} className="h-7 px-2 text-xs">Save</Button>
                      <Button variant="outline" size="sm" onClick={handleCancel} className="h-7 px-2 text-xs">Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(event)} className="h-7 px-2 text-xs">Edit</Button>
                      <Button variant="destructive" size="sm" className="h-7 px-2 text-xs">Delete</Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingEvent === event.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Date</label>
                      <input
                        type="date"
                        value={formData.date || ""}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Time</label>
                      <input
                        type="text"
                        value={formData.time || ""}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Address</label>
                    <input
                      type="text"
                      value={formData.address || ""}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Description</label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={2}
                      className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Dress Code</label>
                      <input
                        type="text"
                        value={formData.dressCode || ""}
                        onChange={(e) => handleInputChange("dressCode", e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Map Link</label>
                      <input
                        type="url"
                        value={formData.mapLink || ""}
                        onChange={(e) => handleInputChange("mapLink", e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date & Time:</span>
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Address: </span>
                    <span>{event.address}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Description: </span>
                    <span>{event.description}</span>
                  </div>
                  {event.dressCode && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Dress Code:</span>
                      <span>{event.dressCode}</span>
                    </div>
                  )}
                  {event.mapLink && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Map: </span>
                      <a
                        href={event.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs"
                      >
                        View on Map
                      </a>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}