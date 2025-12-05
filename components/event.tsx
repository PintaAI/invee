import { weddingData } from "@/lib/data/wedding";

export default function Event() {
  const { brideEvents, groomEvents } = weddingData;

  return (
    <div className="flex flex-col p-6 bg-card">
      <h2 className="text-xl font-bold text-center mb-6 text-foreground">
        Acara Pernikahan
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary text-center">
            Acara Mempelai Wanita
          </h3>
          
          <div className="space-y-4">
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-medium text-foreground">{brideEvents.akad.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {brideEvents.akad.date} | {brideEvents.akad.time}
              </p>
              <p className="text-sm text-muted-foreground">
                {brideEvents.akad.location}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {brideEvents.akad.address}
              </p>
              {brideEvents.akad.mapLink && (
                <a
                  href={brideEvents.akad.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary mt-2 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Lihat di Peta
                </a>
              )}
              {brideEvents.akad.dressCode && (
                <p className="text-xs text-primary mt-2">
                  Dress Code: {brideEvents.akad.dressCode}
                </p>
              )}
            </div>
            
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-medium text-foreground">{brideEvents.resepsi.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {brideEvents.resepsi.date} | {brideEvents.resepsi.time}
              </p>
              <p className="text-sm text-muted-foreground">
                {brideEvents.resepsi.location}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {brideEvents.resepsi.address}
              </p>
              {brideEvents.resepsi.mapLink && (
                <a
                  href={brideEvents.resepsi.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary mt-2 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Lihat di Peta
                </a>
              )}
              {brideEvents.resepsi.dressCode && (
                <p className="text-xs text-primary mt-2">
                  Dress Code: {brideEvents.resepsi.dressCode}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary text-center">
            Acara Mempelai Pria
          </h3>
          
          <div className="space-y-4">
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-medium text-foreground">{groomEvents.unduhMantu.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {groomEvents.unduhMantu.date} | {groomEvents.unduhMantu.time}
              </p>
              <p className="text-sm text-muted-foreground">
                {groomEvents.unduhMantu.location}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {groomEvents.unduhMantu.address}
              </p>
              {groomEvents.unduhMantu.mapLink && (
                <a
                  href={groomEvents.unduhMantu.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary mt-2 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Lihat di Peta
                </a>
              )}
              {groomEvents.unduhMantu.dressCode && (
                <p className="text-xs text-primary mt-2">
                  Dress Code: {groomEvents.unduhMantu.dressCode}
                </p>
              )}
            </div>
            
            <div className="bg-accent p-4 rounded-lg">
              <h4 className="font-medium text-foreground">{groomEvents.pengajian.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {groomEvents.pengajian.date} | {groomEvents.pengajian.time}
              </p>
              <p className="text-sm text-muted-foreground">
                {groomEvents.pengajian.location}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {groomEvents.pengajian.address}
              </p>
              {groomEvents.pengajian.mapLink && (
                <a
                  href={groomEvents.pengajian.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary mt-2 hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Lihat di Peta
                </a>
              )}
              {groomEvents.pengajian.dressCode && (
                <p className="text-xs text-primary mt-2">
                  Dress Code: {groomEvents.pengajian.dressCode}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}