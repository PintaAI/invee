import { weddingData } from "@/lib/data/wedding";

export default function Home() {
  const { couple, weddingDate } = weddingData;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card">
      <h1 className="text-2xl font-bold text-center mb-4 text-foreground">
        {couple.partner1.name} & {couple.partner2.name}
      </h1>
      
      <div className="text-center mb-6">
        <p className="text-lg text-muted-foreground mb-2">Kami Mengundang Anda</p>
        <p className="text-sm text-muted-foreground">Untuk hadir di hari pernikahan kami</p>
      </div>
      
      <div className="bg-secondary p-4 rounded-lg shadow-md w-full mb-6">
        <p className="text-center text-foreground font-medium mb-2">Tanggal Pernikahan</p>
        <p className="text-center text-2xl font-bold text-primary">{weddingDate}</p>
      </div>
      
      <div className="flex flex-col space-y-4 w-full">
        <div className="bg-accent p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-1">{couple.partner1.title}</p>
          <p className="text-lg font-semibold text-foreground">{couple.partner1.name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {couple.partner1.parents.father} & {couple.partner1.parents.mother}
          </p>
        </div>
        
        <div className="text-center text-primary font-bold text-xl mb-2 mt-2">DAN</div>
        
        <div className="bg-accent p-4 rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-1">{couple.partner2.title}</p>
          <p className="text-lg font-semibold text-foreground">{couple.partner2.name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {couple.partner2.parents.father} & {couple.partner2.parents.mother}
          </p>
        </div>
      </div>
    </div>
  );
}