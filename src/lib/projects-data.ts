export type Project = {
  name: string;
  imageId: string;
  slug: string;
  description: string;
  videoUrl?: string;
};

export const projects: Project[] = [
  { name: "White Rabbit", imageId: "ai-workflow", slug: "white-rabbit", description: "An AI-powered workflow automation tool." },
  { name: "Nero Espresso", imageId: "graphic-design", slug: "nero-espresso", description: "Graphic design and branding for Nero Espresso." },
  { name: "#CUOREDINAPOLI", imageId: "city-installation", slug: "cuoredinapoli", description: "A phygital art installation for the city of Naples." },
  { name: "Noi Umani", imageId: "science-art", slug: "noi-umani", description: "A project blending science and art to tell human stories.", videoUrl: "https://firebasestorage.googleapis.com/v0/b/ai-showcase-ce715.appspot.com/o/rabbit-compressed.mp4?alt=media&token=e11405e3-4613-433b-8255-08183183594b" },
  { name: "Procida", imageId: "3d-scanning", slug: "procida", description: "3D scanning and digital preservation of cultural heritage in Procida." },
];
