import { projects, Project } from '@/lib/projects-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Linkedin, Instagram } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { redirect } from 'next/navigation';

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15.3 9.4c-2.3 0-2.3 3.1-2.3 3.1s0 3.1 2.3 3.1c1.2 0 2.3-1.4 2.3-3.1.1-1.7-1-3.1-2.3-3.1z" />
    <path d="M8.4 12.5h2.8" />
    <path d="M21 12c0-5-4-9-9-9S3 7 3 12c0 4.1 2.7 7.5 6.4 8.6" />
    <path d="M8.4 15.6h2.8" />
    <path d="M3.5 9h5.6" />
  </svg>
);


export async function generateStaticParams() {
  return projects.filter(p => p.slug !== 'white-rabbit').map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'white-rabbit') {
    redirect('/project/white-rabbit');
  }

  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === project.imageId);

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans">
      <header className="fixed top-0 left-0 w-full p-4 z-10 bg-[#050505]/80 backdrop-blur-sm">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </header>

      <main className="container mx-auto pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12 md:mb-16">
            <h1 className="font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter leading-tight font-headline mb-4">
              {project.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              {project.description}
            </p>
          </section>

          {project.videoUrl && (
             <section className="mb-12 md:mb-16">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-border">
                <video
                    src={project.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
              </div>
            </section>
          )}

          {!project.videoUrl && image && project.slug !== 'nero-espresso' && (
            <section className="mb-12 md:mb-16">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-border">
                <Image
                  src={image.imageUrl}
                  alt={project.name}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                  data-ai-hint={image.imageHint}
                />
              </div>
            </section>
          )}

          <section>
            <h2 className="text-3xl font-bold mb-8 tracking-tighter">Project Details</h2>
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
              <p>
                This is where the detailed description of the project will go. You can add more sections, images, videos, and any other content you need to showcase your work effectively.
              </p>
              <p>
                For example, you could discuss the technologies used, the challenges you faced, and the solutions you implemented.
              </p>
              <Badge variant="outline" className="text-md py-1 px-3">React</Badge>
              <Badge variant="outline" className="text-md py-1 px-3 ml-2">GSAP</Badge>
              <Badge variant="outline" className="text-md py-1 px-3 ml-2">Web Audio API</Badge>
            </div>
          </section>

          {project.slug === 'nero-espresso' && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold mb-8 tracking-tighter">Prototipazione, idee campagne ecc</h2>
              <div className="space-y-8">
                <div className="rounded-lg overflow-hidden border border-border">
                  <Image
                    src={`/prototipo-neroespresso-1.png?v=2`}
                    alt="Prototipo gadget e campagne per Nero Espresso"
                    width={1280}
                    height={714}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-border">
                  <Image
                    src={`/prototipo-neroespresso-2.png?v=2`}
                    alt="Prototipo gadget e campagne per Nero Espresso 2"
                    width={1280}
                    height={714}
                    className="w-full h-full object-cover"
                  />
                </div>
                 <div className="rounded-lg overflow-hidden border border-border">
                  <Image
                    src={`/prototipo-neroespresso-3.png?v=2`}
                    alt="Prototipo gadget e campagne per Nero Espresso 3"
                    width={1280}
                    height={714}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-border">
                  <Image
                    src={`/prototipo-neroespresso-4.png?v=2`}
                    alt="Prototipo gadget e campagne per Nero Espresso 4"
                    width={1280}
                    height={714}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

       <footer className="text-center p-12 md:p-20 mt-20 border-t border-border">
          <div className="flex justify-center items-center gap-6 text-muted-foreground">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="hover:text-primary transition-colors">
              <BehanceIcon className="w-6 h-6" />
            </a>
          </div>
          <a href="mailto:russoangelol5@gmail.com" className="block mt-6 hover:text-primary transition-colors text-muted-foreground">
            russoangelol5@gmail.com
          </a>
           <p className="text-xs text-muted-foreground/50 mt-8">
            © {new Date().getFullYear()} Angelo Russo. All rights reserved.
          </p>
      </footer>
    </div>
  );
}
