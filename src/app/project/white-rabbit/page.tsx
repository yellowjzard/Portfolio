"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Linkedin, Instagram } from 'lucide-react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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

const AiSimulator = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const rawImageRef = useRef<HTMLDivElement>(null);
  const finalImageRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (isProcessing || isDone) return;

    setIsProcessing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsProcessing(false);
        setIsDone(true);
      },
    });

    tl.to(scanlineRef.current, {
        duration: 1.5,
        height: '100%',
        ease: 'power2.inOut',
      })
      .to(rawImageRef.current, { duration: 1, opacity: 0 }, "-=1.2")
      .to(finalImageRef.current, { duration: 1, opacity: 1 }, "-=1.2")
      .to(scanlineRef.current, { duration: 0.3, opacity: 0 });
  };

  const buttonText = isDone ? "DONE" : isProcessing ? "PROCESSING..." : "GENERATE";

  return (
    <div className="bg-black/50 border border-gray-800 rounded-lg p-4 md:p-6 w-full font-mono">
      <div ref={containerRef} className="relative aspect-video w-full rounded-md overflow-hidden bg-black border border-gray-700">
        
        <div ref={rawImageRef} className="absolute inset-0 z-10 opacity-100">
            <Image
                src="/Edgar-lq.JPG"
                alt="Raw Input"
                fill
                className="object-contain"
            />
        </div>

        <div ref={finalImageRef} className="absolute inset-0 z-20 opacity-0">
             <Image
                src="/Edgar.png"
                alt="Generated Output"
                fill
                className="object-contain"
            />
        </div>

        <div 
          ref={scanlineRef} 
          className="absolute top-0 left-0 w-full h-0 bg-green-400/20 z-30 pointer-events-none"
        >
          <div className="w-full h-0.5 bg-green-400 shadow-[0_0_10px_2px_#34d399]"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex-grow bg-gray-900/50 border border-gray-700 rounded-md px-3 py-2 text-xs md:text-sm text-gray-400 overflow-x-auto">
          /imagine prompt: cinematic product shot, 8k render, volumetric lighting --v 6.0
        </div>
        <div className="relative">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || isDone}
            className={cn(
              "relative px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300",
              "bg-gray-800 text-green-400 border border-green-500/50",
              "hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)]",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-800 disabled:hover:shadow-none"
            )}
          >
            {buttonText}
          </button>
          {isDone && (
            <div className="absolute -bottom-5 right-0 text-xs text-green-400 whitespace-nowrap">Render time: 0.8s</div>
          )}
        </div>
      </div>
    </div>
  );
};


const carouselItems = [
  { type: 'video', src: 'https://firebasestorage.googleapis.com/v0/b/ai-showcase-ce715.appspot.com/o/WR-RP-Endurance_withsubtitle.mp4?alt=media&token=a3e3b3d1-4a4a-4e2a-9e1e-7f7f7f7f7f7f' },
  { type: 'image', src: 'https://picsum.photos/seed/carousel-1/1600/900' },
  { type: 'image', src: 'https://picsum.photos/seed/carousel-2/1600/900' },
  { type: 'image', src: 'https://picsum.photos/seed/carousel-3/1600/900' },
  { type: 'image', src: 'https://picsum.photos/seed/carousel-4/1600/900' },
  { type: 'image', src: 'https://picsum.photos/seed/carousel-5/1600/900' },
];

export default function WhiteRabbitPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <header className="fixed top-0 left-0 w-full p-4 z-50 bg-black/80 backdrop-blur-sm">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </header>
      
      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 lg:gap-16">
          <div className="md:col-span-4 flex flex-col justify-center min-h-[60vh] md:min-h-0">
             <div className="space-y-8 md:sticky md:top-24">
              <div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter font-headline">Generative AI Strategy & Visual Production</h2>
                <h3 className="text-lg md:text-xl text-green-400 font-mono mt-2">Creative Designer & AI Specialist @ White Rabbit Agency (Bruxelles)</h3>
                <p className="text-muted-foreground mt-4 italic">"Redefining Agency Workflows for the European Market."</p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">The Challenge:</h4>
                <p className="text-muted-foreground max-w-prose">
                  L'obiettivo strategico era posizionare White Rabbit come pioniere nell'adozione dell'AI nel mercato creativo europeo. Operativamente, la sfida quotidiana consisteva nel gestire campagne social e progetti di branding con tempistiche estremamente ridotte e risorse limitate. Spesso ci trovavamo a dover creare contenuti di alto profilo partendo da materiale grezzo (foto di bassa qualità, vecchi asset web) o dovendo visualizzare idee complesse per i clienti senza avere budget per shooting fotografici dedicati.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">The Solution:</h4>
                <p className="text-muted-foreground max-w-prose">
                  Ho implementato un flusso di lavoro End-to-End Generative Production. Invece di fermarmi al design statico, ho utilizzato l'AI come acceleratore creativo. Partendo da semplici sketch o canovacci, ho generato asset visivi con Midjourney, li ho animati tramite Higgsfield e curato il sound design. Questo processo ha trasformato l'assenza di materiale in libertà creativa, permettendo di presentare ai clienti non semplici moodboard, ma video e contenuti finiti in tempi record.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-6 relative">
            <div className="md:sticky md:top-24 space-y-8">
              <AiSimulator />
              <section className="bg-black/50 border border-gray-800 rounded-lg p-4 w-full">
                <h4 className="text-center font-mono text-sm text-green-400 mb-4">FINAL OUTPUT EXAMPLE</h4>
                <div className="max-w-xs mx-auto">
                    <div className="aspect-[9/16] rounded-lg overflow-hidden border border-gray-700 bg-black">
                        <video
                            src="/WR_EDGAR_COLOR_edit2.mp4"
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter mb-4">THE ENDURANCE</h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-12">
            The endurance è stato uno dei primi lavori e die più stimolanti perchè ha conbinato Ai , after effect, premiere sound design, rendendo anche partecipi i clienti nel video inserendo i loro volti nel video promozionale per la loro azienda commissionato
          </p>
        </div>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-1">
            {carouselItems.map((item, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                      {item.type === 'video' ? (
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <Image
                          src={item.src}
                          alt={`Carousel item ${index + 1}`}
                          width={1600}
                          height={900}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12 md:ml-16" />
          <CarouselNext className="mr-12 md:mr-16"/>
        </Carousel>
      </section>

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
