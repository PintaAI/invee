"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useWeddingData } from "@/lib/hooks/useWeddingData";

interface RSVPProps {
  guestName?: string | null;
}

interface RSVPEntry {
  id: string;
  name: string;
  attendance: "hadir" | "tidak-hadir";
  message: string;
  timestamp: string;
}

export default function RSVP({ guestName }: RSVPProps) {
  const [formData, setFormData] = useState({
    name: guestName || "",
    attendance: "hadir",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRSVPs, setSubmittedRSVPs] = useState<RSVPEntry[]>([]);
  const [isLoadingRSVPs, setIsLoadingRSVPs] = useState(true);

  const { data: weddingData, loading: loadingWeddingData } = useWeddingData();
  const { rsvp } = weddingData;

  const fetchRSVPs = async () => {
    setIsLoadingRSVPs(true);
    
    try {
      const response = await fetch("/api/rsvp");
      const result = await response.json();
      
      if (response.ok) {
        setSubmittedRSVPs(result.data || []);
      }
    } catch (err) {
      console.error("Error fetching RSVPs:", err);
    } finally {
      setIsLoadingRSVPs(false);
    }
  };

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit RSVP");
      }

      setIsSubmitted(true);
      fetchRSVPs(); // Refresh the RSVP list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit RSVP");
      console.error("Error submitting RSVP:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  if (loadingWeddingData) {
    return (
      <section className="w-full py-12 px-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-6 flex flex-col items-center bg-background relative overflow-hidden md:py-20 md:px-8">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        
        {/* Section Title */}
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">RSVP</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
            <p className="text-sm text-muted-foreground md:text-base mt-4">
              Mohon konfirmasi kehadiran Anda sebelum {rsvp.deadline}
            </p>
          </motion.div>
        </div>

        {/* Form / Success Message */}
        <div className="w-full">
          <div className="bg-muted border border-border shadow-lg rounded-xl md:rounded-2xl overflow-hidden relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 md:p-6 lg:p-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-0 bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                        placeholder="Masukkan nama Anda"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-muted-foreground">
                        Konfirmasi Kehadiran
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`cursor-pointer rounded-lg p-3 flex items-center justify-center gap-2 transition-all border font-medium ${formData.attendance === 'hadir' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent'}`}>
                          <input
                            type="radio"
                            name="attendance"
                            value="hadir"
                            checked={formData.attendance === "hadir"}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <span>Hadir</span>
                        </label>
                        <label className={`cursor-pointer rounded-lg p-3 flex items-center justify-center gap-2 transition-all border font-medium ${formData.attendance === 'tidak-hadir' ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-accent'}`}>
                          <input
                            type="radio"
                            name="attendance"
                            value="tidak-hadir"
                            checked={formData.attendance === "tidak-hadir"}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <span>Tidak Hadir</span>
                        </label>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.attendance === "tidak-hadir" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                           <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20 space-y-3 mt-4">
                             <p className="text-sm text-center text-muted-foreground mb-2">
                               Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin mengirimkan tanda kasih, dapat melalui:
                             </p>
                             <div className="space-y-2">
                               {weddingData.bankInfo.accounts.map((account, idx) => (
                                 <div key={idx} className="bg-background/50 p-3 rounded-md border border-border/50 text-center">
                                   <p className="text-xs font-semibold text-primary mb-1">{account.bankName}</p>
                                   <p className="text-lg font-mono tracking-wider mb-1 select-all">{account.accountNumber}</p>
                                   <p className="text-xs text-muted-foreground">a.n {account.accountName}</p>
                                 </div>
                               ))}
                             </div>
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="space-y-3">
                      <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                        Ucapan & Doa
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border-0 bg-card text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none shadow-sm"
                        placeholder="Tuliskan ucapan dan doa untuk kami..."
                      ></textarea>
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground font-semibold py-3.5 px-4 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      <span>{isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}</span>
                      {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5 }}
                  className="p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center text-center h-full min-h-[350px] md:min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-primary animate-pulse" fill="currentColor" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Terima Kasih!</h3>
                  <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
                    Konfirmasi kehadiran Anda telah kami terima. Kami sangat menantikan kehadiran Anda.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm text-primary hover:underline underline-offset-4"
                  >
                    Kirim respons lain
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Contact Person */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-2"
          >
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2 md:text-sm">Contact Person</p>
            <div className="flex flex-row justify-center gap-8">
              <div className="text-center">
                <p className="text-sm text-foreground font-medium md:text-base">{rsvp.contacts.bride}</p>
                <p className="text-xs text-muted-foreground">Mempelai Wanita</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-foreground font-medium md:text-base">{rsvp.contacts.groom}</p>
                <p className="text-xs text-muted-foreground">Mempelai Pria</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Submitted RSVPs Section */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-muted border border-border shadow-lg rounded-xl md:rounded-2xl overflow-hidden"
          >
            <div className="p-4 md:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-foreground">Ucapan & Doa</h3>
                <Badge variant="outline" className="text-xs">
                  {submittedRSVPs.length} Ucapan
                </Badge>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {isLoadingRSVPs ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-2">Loading...</p>
                  </div>
                ) : submittedRSVPs.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Belum ada ucapan</p>
                  </div>
                ) : (
                  submittedRSVPs.map((entry) => (
                    <div key={entry.id} className="border border-border rounded-lg p-3 bg-card">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-foreground">{entry.name}</p>
                          <Badge
                            variant={entry.attendance === "hadir" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {entry.attendance === "hadir" ? "Hadir" : "Tidak Hadir"}
                          </Badge>
                        </div>
                      </div>
                      {entry.message && (
                        <p className="text-sm text-muted-foreground italic mb-2">
                          &ldquo;{entry.message}&rdquo;
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDate(entry.timestamp)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}