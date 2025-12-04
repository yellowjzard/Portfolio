"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Linkedin, Instagram } from 'lucide-react';
import { projects } from '@/lib/projects-data';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ContactForm from './contact-form';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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


const projectColors: { [key: string]: string } = {
  "White Rabbit": "#FFA500", // Orange
  "Nero Espresso": "#A71C1C", // Elegant Red
  "#CUOREDINAPOLI": "#E74C3C", // Red
  "Noi Umani": "#3498DB", // Blue
  "Procida": "#E85D9A", // Pink
};

const defaultColor = "#050505";

// A simple vector class
class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector) {
    this.x += other.x;
    this.y += other.y;
  }
}

// Blob class
class Blob {
  pos: Vector;
  vel: Vector;
  radius: number;
  color: string;
  canvasWidth: number;
  canvasHeight: number;

  constructor(color: string, canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.pos = new Vector(Math.random() * canvasWidth, Math.random() * canvasHeight);
    this.vel = new Vector((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
    this.radius = Math.random() * 100 + 150;
    this.color = color;
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x < 0 || this.pos.x > this.canvasWidth) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > this.canvasHeight) {
      this.vel.y *= -1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}


const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let blobs: Blob[] = [];

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const colors = ["#FFA500", "#A71C1C", "#3498DB", "#E85D9A"];
      blobs = colors.map(color => new Blob(color, canvas.width, canvas.height));
    }
    
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = 'blur(100px)';

      blobs.forEach(blob => {
          blob.update();
          blob.draw(ctx);
      });
      requestAnimationFrame(animate);
    }
    
    const handleResize = () => {
        setup();
    }

    setup();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
}


export default function InteractivePortfolio() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mainRef.current) {
        mainRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        mainRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { y: 70, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.2 });
      const sections = gsap.utils.toArray('section.container');
      sections.forEach((section: any) => {
        gsap.from(section, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' } });
      });
    }, mainRef);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={mainRef} 
      className="bg-[#050505] text-white font-sans min-h-screen relative overflow-x-hidden group"
      style={{
        // @ts-ignore
        '--mouse-x': '50vw',
        '--mouse-y': '50vh',
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        maskImage: 'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle 300px at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)',
      }}>
        <InteractiveBackground />
      </div>
      
      <div className="relative z-10">
        <section className="h-screen flex flex-col justify-center items-center text-center p-4 relative">
          <h1 className="font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-tight font-headline">
            <div className="hero-line">ANGELO RUSSO</div>
          </h1>
          <p className="hero-line text-lg md:text-xl mt-4 text-muted-foreground tracking-tight font-body">
            Creative Designer & AI Specialist
          </p>
          <p className="hero-line text-lg md:text-2xl mt-8 font-bold text-primary tracking-tight leading-tight font-body max-w-sm md:max-w-none">
            Non guardare i miei progetti. Provali.
          </p>
        </section>

        <section className="container mx-auto py-20 lg:py-32 px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tighter">SELECTED WORKS</h2>
          <div className="border-t border-border">
            {projects.map((project) => (
              <div 
                key={project.name} 
                className="work-item group border-b border-border transition-colors duration-300"
                style={{ backgroundColor: defaultColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = projectColors[project.name] || defaultColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = defaultColor;
                }}
              >
                <Link href={`/project/${project.slug}`} className="flex justify-between items-center py-8 px-4">
                  <span className="text-3xl md:text-6xl font-bold tracking-tighter">{project.name}</span>
                  <ArrowRight className="w-8 h-8 md:w-12 md:h-12 transform transition-transform group-hover:translate-x-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto py-20 lg:py-32 px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tighter text-center">CONTACT ME</h2>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>

        <footer className="text-center p-12 md:p-20 border-t border-border relative">
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
    </div>
  );
}
