"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { weddingData, WeddingInfo, Couple } from "@/lib/data/wedding";
import { RefreshCw, Save, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CoupleManagement() {
  const [currentWeddingData, setCurrentWeddingData] = useState<WeddingInfo>(weddingData);
  const [partner1, setPartner1] = useState<Couple>(weddingData.couple.partner1);
  const [partner2, setPartner2] = useState<Couple>(weddingData.couple.partner2);
  const [bankAccounts, setBankAccounts] = useState(weddingData.bankInfo.accounts);
  const [contacts, setContacts] = useState(weddingData.rsvp.contacts);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchWeddingData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/wedding");
      const result = await response.json();
      
      if (result.success && result.data) {
        setCurrentWeddingData(result.data);
        setPartner1(result.data.couple.partner1);
        setPartner2(result.data.couple.partner2);
        setBankAccounts(result.data.bankInfo.accounts);
        setContacts(result.data.rsvp.contacts);
      }
    } catch (err) {
      console.error("Error fetching wedding data:", err);
      setError("Gagal mengambil data pernikahan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeddingData();
  }, []);

  const saveToBlob = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // Create updated wedding data object
      const updatedWeddingData = {
        ...currentWeddingData,
        couple: {
          partner1,
          partner2
        },
        bankInfo: {
          ...currentWeddingData.bankInfo,
          accounts: bankAccounts
        },
        rsvp: {
          ...currentWeddingData.rsvp,
          contacts: contacts
        }
      };

      const response = await fetch("/api/wedding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWeddingData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Gagal menyimpan data");
      }
      
      setCurrentWeddingData(updatedWeddingData);
      setSuccessMessage("Informasi pasangan berhasil disimpan!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error saving wedding data:", err);
      setError(err instanceof Error ? err.message : "Gagal menyimpan data");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePartner1Change = (field: keyof Couple, value: string) => {
    setPartner1(prev => ({ ...prev, [field]: value }));
  };

  const handlePartner1ParentChange = (parent: 'father' | 'mother', value: string) => {
    setPartner1(prev => ({ 
      ...prev, 
      parents: { ...prev.parents, [parent]: value } 
    }));
  };

  const handlePartner2Change = (field: keyof Couple, value: string) => {
    setPartner2(prev => ({ ...prev, [field]: value }));
  };

  const handlePartner2ParentChange = (parent: 'father' | 'mother', value: string) => {
    setPartner2(prev => ({ 
      ...prev, 
      parents: { ...prev.parents, [parent]: value } 
    }));
  };

  const handleContactChange = (field: 'bride' | 'groom', value: string) => {
    setContacts(prev => ({ ...prev, [field]: value }));
  };

  const handleBankAccountChange = (index: number, field: string, value: string) => {
    const updatedAccounts = [...bankAccounts];
    updatedAccounts[index] = { ...updatedAccounts[index], [field]: value };
    setBankAccounts(updatedAccounts);
  };

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { bankName: "", accountNumber: "", accountName: "" }]);
  };

  const removeBankAccount = (index: number) => {
    const updatedAccounts = [...bankAccounts];
    updatedAccounts.splice(index, 1);
    setBankAccounts(updatedAccounts);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Informasi Pasangan</h2>
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
        <Button onClick={saveToBlob} disabled={isSaving || isLoading}>
          {isSaving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </>
          )}
        </Button>
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

      <Tabs defaultValue="partner1" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="partner1" className="text-xs py-2 px-1">Mempelai Wanita</TabsTrigger>
          <TabsTrigger value="partner2" className="text-xs py-2 px-1">Mempelai Pria</TabsTrigger>
          <TabsTrigger value="bank" className="text-xs py-2 px-1">Bank</TabsTrigger>
          <TabsTrigger value="contacts" className="text-xs py-2 px-1">Kontak</TabsTrigger>
        </TabsList>
        
        <TabsContent value="partner1">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Mempelai Wanita</CardTitle>
              <CardDescription>Ubah detail mempelai wanita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama</label>
                <Input 
                  value={partner1.name} 
                  onChange={(e) => handlePartner1Change('name', e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Gelar</label>
                <Input 
                  value={partner1.title} 
                  onChange={(e) => handlePartner1Change('title', e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea 
                  value={partner1.bio} 
                  onChange={(e) => handlePartner1Change('bio', e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Lokasi</label>
                <Input 
                  value={partner1.location} 
                  onChange={(e) => handlePartner1Change('location', e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Ayah</label>
                  <Input 
                    value={partner1.parents.father} 
                    onChange={(e) => handlePartner1ParentChange('father', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Ibu</label>
                  <Input 
                    value={partner1.parents.mother} 
                    onChange={(e) => handlePartner1ParentChange('mother', e.target.value)} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="partner2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Mempelai Pria</CardTitle>
              <CardDescription>Ubah detail mempelai pria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama</label>
                <Input 
                  value={partner2.name} 
                  onChange={(e) => handlePartner2Change('name', e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Gelar</label>
                <Input 
                  value={partner2.title} 
                  onChange={(e) => handlePartner2Change('title', e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea 
                  value={partner2.bio} 
                  onChange={(e) => handlePartner2Change('bio', e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Lokasi</label>
                <Input 
                  value={partner2.location} 
                  onChange={(e) => handlePartner2Change('location', e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Ayah</label>
                  <Input 
                    value={partner2.parents.father} 
                    onChange={(e) => handlePartner2ParentChange('father', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama Ibu</label>
                  <Input 
                    value={partner2.parents.mother} 
                    onChange={(e) => handlePartner2ParentChange('mother', e.target.value)} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Rekening Bank</CardTitle>
                <CardDescription>Kelola rekening bank untuk hadiah digital</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addBankAccount}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Rekening
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {bankAccounts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Belum ada rekening bank yang ditambahkan</p>
              ) : (
                bankAccounts.map((account, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end border p-4 rounded-lg">
                    <div className="md:col-span-3 space-y-2">
                      <label className="text-sm font-medium">Nama Bank</label>
                      <Input
                        value={account.bankName}
                        onChange={(e) => handleBankAccountChange(index, 'bankName', e.target.value)}
                        placeholder="contoh: BCA"
                      />
                    </div>
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-sm font-medium">Nomor Rekening</label>
                      <Input
                        value={account.accountNumber}
                        onChange={(e) => handleBankAccountChange(index, 'accountNumber', e.target.value)}
                        placeholder="1234567890"
                      />
                    </div>
                    <div className="md:col-span-4 space-y-2">
                      <label className="text-sm font-medium">Nama Pemilik</label>
                      <Input
                        value={account.accountName}
                        onChange={(e) => handleBankAccountChange(index, 'accountName', e.target.value)}
                        placeholder="Nama Pemilik Rekening"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeBankAccount(index)}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Kontak</CardTitle>
              <CardDescription>Kelola nomor kontak untuk konfirmasi kehadiran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kontak Mempelai Wanita</label>
                  <Input
                    value={contacts.bride}
                    onChange={(e) => handleContactChange('bride', e.target.value)}
                    placeholder="+62 812-3456-7890"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kontak Mempelai Pria</label>
                  <Input
                    value={contacts.groom}
                    onChange={(e) => handleContactChange('groom', e.target.value)}
                    placeholder="+62 813-9876-5432"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}