import { weddingData } from "@/lib/data/wedding";

export default function Story() {
  const { couple } = weddingData;

  return (
    <div className="flex flex-col p-6 bg-card">
      <h2 className="text-xl font-bold text-center mb-6 text-foreground">
        Kisah Cinta Kami
      </h2>
      
      <div className="space-y-6">
        <div className="bg-accent p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-primary text-center mb-3">
            {couple.partner1.name}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-3">
            {couple.partner1.bio}
          </p>
          <div className="flex items-center justify-center mt-3">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-muted-foreground" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="h-px bg-primary flex-grow"></div>
            <span className="px-3 text-primary font-medium">&</span>
            <div className="h-px bg-primary flex-grow"></div>
          </div>
        </div>
        
        <div className="bg-accent p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-primary text-center mb-3">
            {couple.partner2.name}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-3">
            {couple.partner2.bio}
          </p>
          <div className="flex items-center justify-center mt-3">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-muted-foreground" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground italic">
          "Cinta bukan tentang menemukan orang yang sempurna, 
          tapi tentang melihat ketidaksempurnaan orang dengan sempurna."
        </p>
      </div>
    </div>
  );
}