export interface Couple {
  name: string;
  title: string;
  bio: string;
  photo: string;
  location: string;
  parents: {
    father: string;
    mother: string;
  };
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  dressCode?: string;
  mapLink?: string;
}

export interface WeddingInfo {
  couple: {
    partner1: Couple;
    partner2: Couple;
  };
  weddingDate: string;
  brideEvents: {
    akad: Event;
    resepsi: Event;
  };
  groomEvents: {
    unduhMantu: Event;
    pengajian: Event;
  };
  bankInfo: {
    title: string;
    accounts: {
      bankName: string;
      accountNumber: string;
      accountName: string;
    }[];
  };
  rsvp: {
    deadline: string;
    contacts: {
      bride: string;
      groom: string;
    };
  };
  gallery: {
    title: string;
    photos: {
      url: string;
      caption: string;
    }[];
  };
}

export const weddingData: WeddingInfo = {
  couple: {
    partner1: {
      name: "Siti Nurhaliza",
      title: "Mempelai Wanita",
      bio: "Siti adalah seorang desainer grafis yang bersemangat dengan cinta pada seni dan kreativitas. Ia menikmati melukis, mendaki gunung, dan menghabiskan waktu dengan anjing golden retriever-nya, Max.",
      photo: "/images/bride.jpg",
      location: "Jakarta, Indonesia",
      parents: {
        father: "Bapak Ahmad Wijaya",
        mother: "Ibu Ratna Sari"
      }
    },
    partner2: {
      name: "Rizki Pratama",
      title: "Mempelai Pria",
      bio: "Rizki adalah seorang insinyur perangkat lunak yang mencintai teknologi dan petualangan outdoor. Ketika tidak coding, Anda dapat menemukannya bersepeda atau mencoba resep baru di dapur.",
      photo: "/images/groom.jpg",
      location: "Bandung, Indonesia",
      parents: {
        father: "Bapak Budi Santoso",
        mother: "Ibu Dewi Lestari"
      }
    }
  },
  weddingDate: "2024-06-15",
  brideEvents: {
    akad: {
      id: "akad",
      title: "Akad Nikah",
      date: "2024-06-15",
      time: "09:00",
      location: "Masjid Al-Hikmah",
      address: "Jl. Masjid No. 45, Jakarta Selatan, DKI Jakarta 12345",
      description: "Prosesi sakral akad nikah yang akan disaksikan oleh keluarga dan teman dekat.",
      dressCode: "Batik dan Kebaya",
      mapLink: "https://maps.google.com/?q=Masjid+Al-Hikmah+Jakarta+Selatan"
    },
    resepsi: {
      id: "resepsi-bride",
      title: "Resepsi Pernikahan",
      date: "2024-06-15",
      time: "13:00",
      location: "Taman Sunset",
      address: "Jl. Garden No. 123, Jakarta Selatan, DKI Jakarta 12345",
      description: "Resepsi pernikahan di Jakarta untuk keluarga dan teman dari Siti.",
      dressCode: "Formal (Batik/Kebaya)",
      mapLink: "https://maps.google.com/?q=Taman+Sunset+Jakarta+Selatan"
    }
  },
  groomEvents: {
    unduhMantu: {
      id: "unduh-mantu",
      title: "Unduh Mantu",
      date: "2024-06-16",
      time: "10:00",
      location: "Gedung Sate Ballroom",
      address: "Jl. Diponegoro No. 22, Bandung, Jawa Barat 40115",
      description: "Acara unduh mantu di Bandung untuk keluarga dan teman dari Rizki.",
      dressCode: "Formal (Batik/Kemeja)",
      mapLink: "https://maps.google.com/?q=Gedung+Sate+Ballroom+Bandung"
    },
    pengajian: {
      id: "pengajian",
      title: "Pengajian",
      date: "2024-06-17",
      time: "09:00",
      location: "Musholla Al-Ikhlas",
      address: "Jl. Sukajadi No. 89, Bandung, Jawa Barat 40116",
      description: "Acara pengajian doa selamat untuk keluarga baru.",
      dressCode: "Muslim/Muslimah",
      mapLink: "https://maps.google.com/?q=Musholla+Al-Ikhlas+Bandung"
    }
  },
  bankInfo: {
    title: "Informasi Rekening",
    accounts: [
      {
        bankName: "Bank Central Asia (BCA)",
        accountNumber: "1234567890",
        accountName: "Siti Nurhaliza"
      },
      {
        bankName: "Bank Mandiri",
        accountNumber: "0987654321",
        accountName: "Rizki Pratama"
      },
      {
        bankName: "Bank Rakyat Indonesia (BRI)",
        accountNumber: "5678901234",
        accountName: "Siti Nurhaliza & Rizki Pratama"
      }
    ]
  },
  rsvp: {
    deadline: "2024-05-15",
    contacts: {
      bride: "+62 812-3456-7890",
      groom: "+62 813-9876-5432"
    }
  },
  gallery: {
    title: "Perjalanan Cinta Kami",
    photos: [
      {
        url: "/gallery/IMG_0899.JPG",
        caption: "Momen bahagia bersama"
      },
      {
        url: "/gallery/IMG_0904.JPG",
        caption: "Kehangatan cinta kami"
      },
      {
        url: "/gallery/IMG_0935.JPG",
        caption: "Petualangan bersama"
      },
      {
        url: "/gallery/IMG_0939.JPG",
        caption: "Senyum kebahagiaan"
      },
      {
        url: "/gallery/IMG_0942.JPG",
        caption: "Momen indah bersama"
      },
      {
        url: "/gallery/IMG_0945.JPG",
        caption: "Kisah cinta kami"
      },
      {
        url: "/gallery/IMG_0961.JPG",
        caption: "Kebersamaan yang berarti"
      },
      {
        url: "/gallery/IMG_0972.JPG",
        caption: "Kenangan manis bersama"
      },
      {
        url: "/gallery/IMG_0983.JPG",
        caption: "Cinta yang abadi"
      },
      {
        url: "/gallery/IMG_0987.JPG",
        caption: "Momen spesial kami"
      },
      {
        url: "/gallery/IMG_0991.JPG",
        caption: "Perjalanan cinta kita"
      },
      {
        url: "/gallery/IMG_1006.JPG",
        caption: "Bersama selamanya"
      }
    ]
  }
};