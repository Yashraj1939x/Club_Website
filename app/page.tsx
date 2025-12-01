"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

import {
  LoadingScreen, Navbar, HeroSection, VisionSection, TimelineSection,
  ProjectsSection, EventsSection, AchievementsSection, TeamSection, AlumniSection,
  GalleryComponent, Footer, ApplicationModal, DetailsModal, SdgSection, PartnersSection,
  FullscreenViewer
} from '../components/main';

import {
  socialMedia, sdgData,
  // Import new static data
  timelineEvents, achievements, alumni, galleryData, projectsData, teamData, partnersData, pastEvents
} from '../lib/data';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // We initialize the state with the Static Data immediately
  const [appData, setAppData] = useState({
    timelineEvents,
    achievements,
    alumni,
    galleryData,
    projectsData,
    teamData,
    partnersData,
    eventsData: {
      upcoming: [], // This will be fetched
      past: pastEvents // This is static
    }
  });

  const canvasRef = useRef(null);
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, type: '', data: null });
  const [isApplyModalOpen, setApplicationModalOpen] = useState(false);

  const [fullscreenViewer, setFullscreenViewer] = useState({
    isOpen: false,
    gallery: [],
    startIndex: 0,
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState<boolean | null>(null);

  const openFullscreenViewer = (gallery, startIndex = 0) => {
    setFullscreenViewer({
      isOpen: true,
      gallery: gallery.map(img => typeof img === 'string' ? img : img.src),
      startIndex,
    });
  };

  // 1. & 2. Fetch ALL Dynamic Data (Events & Button Status) in parallel
  useEffect(() => {
    const loadAllData = async () => {
      try {
        // Fetch Content (Heavy) and Button (Light) in parallel
        const [contentResponse, buttonResponse] = await Promise.all([
          fetch('/api/content'),       // <--- The new consolidated API
          fetch('/api/button-status')  // <--- Kept separate as requested
        ]);

        // A. Handle Consolidated Content (Events + Gallery)
        if (contentResponse.ok) {
          const data = await contentResponse.json();

          setAppData(prev => ({
            ...prev,
            galleryData: data.gallery || [],
            eventsData: {
              upcoming: data.events?.upcoming || [],
              past: data.events?.past || []
            }
          }));
        } else {
          console.error("Failed to load content");
        }

        // B. Handle Button Status
        if (buttonResponse.ok) {
          const buttonData = await buttonResponse.json();
          setIsEnrollmentOpen(buttonData.enabled);
        } else {
          setIsEnrollmentOpen(false);
        }

      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        // Remove loading screen when both are done
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    loadAllData();
  }, []);

  // 3. Three.js Background Animation
  useEffect(() => {
    if (!canvasRef.current || !THREE) return;

    const isMobile = window.innerWidth <= 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const particleCount = isMobile ? 50 : 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
      colors[i] = 0.02; colors[i + 1] = 0.59; colors[i + 2] = 0.41;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.02 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []); // Removed appData dependency since particles don't depend on data

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShowDetails = (type, data) => setDetailsModal({ isOpen: true, type, data });
  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <div className="App text-white">
      <canvas ref={canvasRef} id="bg-canvas" className="fixed top-0 left-0 w-full h-full -z-10" />
      <LoadingScreen isLoading={isLoading} />

      {/* Render immediately since we have static data, just wait for ThreeJS/hydration */}
      <Navbar isScrolled={isScrolled} />
      <main>
        <HeroSection onJoinClick={() => setApplicationModalOpen(true)} isEnrollmentOpen={isEnrollmentOpen} />
        <VisionSection />
        <AchievementsSection achievements={appData.achievements} />
        <SdgSection sdgs={sdgData} />
        <ProjectsSection projects={appData.projectsData} onShowDetails={handleShowDetails} />
        <EventsSection events={appData.eventsData} onShowDetails={handleShowDetails} />
        <TimelineSection timelineEvents={appData.timelineEvents} />
        <TeamSection teamMembers={appData.teamData} onShowDetails={handleShowDetails} />
        <AlumniSection alumni={appData.alumni} onShowDetails={handleShowDetails} />
        <PartnersSection partners={appData.partnersData} />
        <GalleryComponent galleryItems={appData.galleryData} onImageClick={(img, gallery, index) => openFullscreenViewer(gallery, index)} />
      </main>

      <Footer socialLinks={socialMedia} />
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-primary rounded-full shadow-lg z-50 transition-all duration-300 hover:bg-green-700 focus:outline-none ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      <ApplicationModal isOpen={isApplyModalOpen} onClose={() => setApplicationModalOpen(false)} />

      <DetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, type: '', data: null })}
        type={detailsModal.type}
        data={detailsModal.data}
        onImageClick={(img, gallery, index) => openFullscreenViewer(gallery, index)}
      />
      {fullscreenViewer.isOpen && (
        <FullscreenViewer
          gallery={fullscreenViewer.gallery}
          startIndex={fullscreenViewer.startIndex}
          onClose={() => setFullscreenViewer({ isOpen: false, gallery: [], startIndex: 0 })}
        />
      )}
    </div>
  );
}