"use client";

import { useState } from "react";
import { weddingData } from "@/lib/data/wedding";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { rsvp, bankInfo } = weddingData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-card">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-primary-foreground" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Terima Kasih!</h3>
          <p className="text-muted-foreground">Konfirmasi kehadiran Anda telah kami terima.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 bg-card">
      <h2 className="text-xl font-bold text-center mb-6 text-foreground">
        Konfirmasi Kehadiran
      </h2>
      
      <p className="text-sm text-muted-foreground text-center mb-6">
        Mohon konfirmasi kehadiran Anda sebelum {rsvp.deadline}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Masukkan nama lengkap"
          />
        </div>
        
        <div>
          <label htmlFor="attendance" className="block text-sm font-medium text-foreground mb-1">
            Konfirmasi Kehadiran
          </label>
          <select
            id="attendance"
            name="attendance"
            value={formData.attendance}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Pilih opsi</option>
            <option value="hadir">Saya akan hadir</option>
            <option value="tidak-hadir">Maaf, saya tidak bisa hadir</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
            Ucapan & Doa (Opsional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Tulis ucapan dan doa untuk pengantin"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
        >
          Kirim Konfirmasi
        </button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          {bankInfo.title}
        </h3>
        
        <div className="space-y-3">
          {bankInfo.accounts.map((account, index) => (
            <div key={index} className="bg-accent p-3 rounded-lg">
              <p className="text-sm font-medium text-foreground">{account.bankName}</p>
              <p className="text-xs text-muted-foreground">{account.accountNumber}</p>
              <p className="text-xs text-muted-foreground">a.n. {account.accountName}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Hubungi: {rsvp.contacts.bride} (Mempelai Wanita)
          </p>
          <p className="text-xs text-muted-foreground">
            Hubungi: {rsvp.contacts.groom} (Mempelai Pria)
          </p>
        </div>
      </div>
    </div>
  );
}