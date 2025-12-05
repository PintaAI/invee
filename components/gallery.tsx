import Image from "next/image";
import { weddingData } from "@/lib/data/wedding";

export default function Gallery() {
  const { gallery } = weddingData;

  return (
    <div className="flex flex-col p-6 bg-card">
      <h2 className="text-xl font-bold text-center mb-6 text-foreground">
        {gallery.title}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {gallery.photos.map((photo, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg">
            <Image
              src={photo.url}
              alt={photo.caption}
              width={300}
              height={160}
              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-xs text-center">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          "Dua jiwa yang bertemu, satu cinta yang abadi"
        </p>
      </div>
    </div>
  );
}