import React, { useState, useEffect, useRef } from 'react';


const getFirstImage = (images, fallback = 'https://placehold.co/400x300/1f2937/FFFFFF?text=No+Image') => {
    if (!images || !Array.isArray(images) || images.length === 0) {
        return fallback;
    }
    return images[0] || fallback;
};

const safeGet = (obj, path, fallback = 'Data not available') => {
    return obj?.[path] ?? fallback;
};

// ---------- FullscreenViewer ----------
export const FullscreenViewer = ({ gallery, startIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0); // For tracking swipe movement in real-time

    const handleNext = React.useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % gallery.length);
    }, [gallery.length]);

    const handlePrev = React.useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + gallery.length) % gallery.length);
    }, [gallery.length]);

    // Handle touch events for mobile swipe
    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchDeltaX.current = 0;
    };

    const handleTouchMove = (e) => {
        touchDeltaX.current = e.targetTouches[0].clientX - touchStartX.current;
    };

    const handleTouchEnd = () => {
        // Check if the swipe distance is significant
        if (Math.abs(touchDeltaX.current) > 50) {
            if (touchDeltaX.current > 0) { // Swipe right
                handlePrev();
            } else { // Swipe left
                handleNext();
            }
        }
        touchDeltaX.current = 0; // Reset for the next touch
    };

    useEffect(() => {
        setCurrentIndex(startIndex);
    }, [startIndex, gallery]);

    if (!gallery || gallery.length === 0) return null;

    return (
        <div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center overflow-hidden"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                className="fullscreen-nav-btn absolute top-4 right-4 text-3xl z-20"
                onClick={onClose}
            >
                &times;
            </button>

            {/* Previous Button - hidden on mobile (screens smaller than md) */}
            <button
                className="fullscreen-nav-btn left-4 text-4xl hidden md:flex z-20"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
                &#x2039;
            </button>

            {/* Filmstrip container for swipe animation */}
            <div
                className="flex items-center h-full w-full transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {gallery.map((src, index) => (
                    <div key={`${src}-${index}`} className="flex-shrink-0 w-full h-full flex items-center justify-center p-4">
                        <img
                            src={src}
                            alt={`Fullscreen view ${index + 1}`}
                            className="max-w-full max-h-full object-contain pointer-events-none"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                ))}
            </div>

            {/* Next Button - hidden on mobile */}
            <button
                className="fullscreen-nav-btn right-4 text-4xl hidden md:flex z-20"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
                &#x203A;
            </button>

            {/* Image Indicator */}
            <div className="absolute bottom-4 text-white text-sm font-mono bg-black/50 px-3 py-1 rounded-full z-20">
                {currentIndex + 1} / {gallery.length}
            </div>
        </div>
    );
};

// ---------- GalleryScroller ----------
const GalleryScroller = ({ images, title, onImageClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const safeImages = images && Array.isArray(images) && images.length > 0 ? images : [getFirstImage(null)];

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [images]);

    const showNextImage = () => setCurrentImageIndex(p => (p + 1) % safeImages.length);
    const showPrevImage = () => setCurrentImageIndex(p => (p - 1 + safeImages.length) % safeImages.length);

    return (
        <div className="modal-gallery-container">
            <div
                className="modal-gallery-filmstrip"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
                {safeImages.map((img, index) =>
                    <div className="modal-gallery-slide" key={`${img}-${index}`}>
                        <img
                            src={img}
                            alt={`${title || 'Gallery'} image ${index + 1}`}
                            className="modal-gallery-image"
                            onClick={() => onImageClick(img, safeImages, index)}
                        />
                    </div>
                )}
            </div>

            {safeImages.length > 1 && (
                <>
                    <button onClick={showPrevImage} className="modal-gallery-nav modal-gallery-prev">‹</button>
                    <button onClick={showNextImage} className="modal-gallery-nav modal-gallery-next">›</button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-mono px-2 py-1 rounded-full">
                        {currentImageIndex + 1} / {safeImages.length}
                    </div>
                </>
            )}
        </div>
    );
};

// ---------- Icon ----------
const Icon = ({ name }) => {
    const icons = {
        github: (
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 
             2.865 8.165 6.839 9.489.5.092.682-.218.682-.482 
             0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343
             -3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908
             -.62.069-.608.069-.608 1.003.07 1.531 1.032 
             1.531 1.032.892 1.53 2.341 1.088 2.91.832.092
             -.647.35-1.088.636-1.338-2.22-.253-4.555-1.113
             -4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103
             -.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 
             1.026A9.564 9.564 0 0112 6.844c.85.004 
             1.705.115 2.504.337 1.909-1.296 2.747-1.027 
             2.747-1.027.546 1.379.203 2.398.1 
             2.651.64.7 1.03 1.595 1.03 2.688 0 
             3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 
             1.855 0 1.338-.012 2.419-.012 2.747 
             0 .268.18.58.688.482A10.001 10.001 0 
             0022 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                />
            </svg>
        ),

        linkedin: (
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 
                5v14c0 2.761 2.239 5 5 5h14c2.762 
                0 5-2.239 5-5v-14c0-2.761-2.238
                -5-5-5zm-11 19h-3v-11h3v11zm-1.5
                -12.268c-.966 0-1.75-.79-1.75
                -1.764s.784-1.764 1.75-1.764 
                1.75.79 1.75 1.764-.783 
                1.764-1.75 1.764zm13.5 
                12.268h-3v-5.604c0-3.368-4
                -3.113-4 0v5.604h-3v-11h3v1.765
                c1.396-2.586 7-2.777 7 
                2.476v6.759z" />
            </svg>
        ),

        twitter: (
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 
                 1.53A4.48 4.48 0 0022.4.36a9 
                 9 0 01-2.84 1.08 4.52 4.52 0 
                 00-7.71 4.13A12.9 12.9 0 
                 013 2.1a4.52 4.52 0 001.4 
                 6.04A4.48 4.48 0 012.8 
                 7.7v.05a4.51 4.51 0 
                 003.63 4.43 4.52 4.52 0 
                 01-2.03.08 4.52 4.52 0 
                 004.22 3.14A9.05 9.05 0 
                 012 19.54a12.8 12.8 0 
                 006.95 2.04c8.34 
                 0 12.9-6.92 12.9-12.93 
                 0-.2 0-.42-.02-.63A9.18 
                 9.18 0 0023 3z" />
            </svg>
        ),

        instagram: (
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.243 2 2 4.243 2 
                 7v10c0 2.757 2.243 5 5 
                 5h10c2.757 0 5-2.243 5-5V7c0
                 -2.757-2.243-5-5-5H7zm10 
                 2c1.654 0 3 1.346 3 
                 3v10c0 1.654-1.346 3-3 
                 3H7c-1.654 0-3-1.346-3
                 -3V7c0-1.654 1.346-3 
                 3-3h10zm-5 3a5 
                 5 0 100 10 5 5 0 
                 000-10zm0 2a3 
                 3 0 110 6 3 3 0 
                 010-6zm4.5-2a1.5 
                 1.5 0 100 3 1.5 1.5 0 
                 000-3z" />
            </svg>
        ),
        users: (<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>),
        target: (<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>),
        award: (<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>),
        globe: (<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293a1 1 0 010 1.414L5.414 8l2.293 2.293a1 1 0 11-1.414 1.414L4 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L2.586 8 1.293 6.707a1 1 0 011.414-1.414L5 6.586l2.293-2.293a1 1 0 011.414 0z"></path></svg>),
    };

    return icons[name] || null;
};

// ---------- Scroller ----------
const Scroller = ({ children }) => {
    const scrollerRef = useRef(null);
    const intervalRef = useRef(null);
    const [totalItems, setTotalItems] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Count the number of direct children
        const items = scroller.children;
        setTotalItems(items.length);
    }, [children]);

    const scrollToItem = (index) => {
        const scroller = scrollerRef.current;
        if (scroller && scroller.children[index]) {
            const item = scroller.children[index];
            // On mobile, scroll to show the item from the left edge
            // On desktop, center the item
            const isMobile = window.innerWidth <= 768;

            if (isMobile) {
                // For mobile: scroll so the item starts from the left with some padding
                const scrollPosition = item.offsetLeft - 20; // 20px padding from left
                scroller.scrollTo({
                    left: Math.max(0, scrollPosition), // Don't scroll before 0
                    behavior: 'smooth'
                });
            } else {
                // For desktop: center the item
                const scrollPosition = item.offsetLeft - (scroller.offsetWidth - item.offsetWidth) / 2;
                scroller.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    const startAutoScroll = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % totalItems);
        }, 1000);
    };

    const stopAutoScroll = () => {
        clearInterval(intervalRef.current);
    };

    // Effect to handle the actual scrolling when currentIndex changes
    useEffect(() => {
        if (totalItems > 0) {
            scrollToItem(currentIndex);
        }
    }, [currentIndex, totalItems]);

    // Effect to manage the auto-scroll timer
    useEffect(() => {
        if (totalItems > 0) {
            startAutoScroll();
        }
        return () => stopAutoScroll(); // Cleanup on unmount
    }, [totalItems]);

    const handlePrevClick = () => {
        const newIndex = (currentIndex - 1 + totalItems) % totalItems;
        setCurrentIndex(newIndex);
        stopAutoScroll(); // Stop auto-play when user interacts
    };

    const handleNextClick = () => {
        const newIndex = (currentIndex + 1) % totalItems;
        setCurrentIndex(newIndex);
        stopAutoScroll(); // Stop auto-play when user interacts
    };

    return (
        <div
            className="scroll-section-container relative"
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
        >
            <button onClick={handlePrevClick} className="scroll-nav-btn left-0">&lt;</button>
            <div className="scroll-wrapper" ref={scrollerRef}>
                {children}
            </div>
            <button onClick={handleNextClick} className="scroll-nav-btn right-0">&gt;</button>
            {totalItems > 0 && (
                <div className="scroll-indicator">
                    {currentIndex + 1} / {totalItems}
                </div>
            )}
        </div>
    );
};
// ---------- Component: LoadingScreen ----------
export const LoadingScreen = ({ isLoading }) => {
    const screenClasses = `
    fixed inset-0 bg-gray-900 flex items-center justify-center z-50
    transition-opacity duration-500 ease-in-out
    ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}
  `;

    return (
        <div id="loading-screen" className={screenClasses}>
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4" />
                <h2 className="text-xl font-semibold">Loading IUCEE Experience...</h2>
            </div>
        </div>
    );
};

// ---------- Component: Navbar ----------
export const Navbar = ({ isScrolled }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        { href: '#hero', title: 'Join' },
        { href: '#vision', title: 'Vision' },
        { href: '#achievements', title: 'Achievements' },
        { href: '#sdg', title: 'UN SDGs' },
        { href: '#projects', title: 'Projects' },
        { href: '#events', title: 'Events' },
        { href: '#timeline', title: 'Timeline' },
        { href: '#team', title: 'Team' },
        { href: '#alumni', title: 'Alumni' },
        { href: '#partners', title: 'Partners' },
        { href: '#gallery', title: 'Gallery' },
    ];

    const closeMenu = () => setIsMenuOpen(false);
    return (
        <>
            <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'scrolled' : ''} bg-gray-900/90 backdrop-blur-md`}>
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <a href="https://ritindia.edu/ritwebsite/website/">
                            <img src="/logos/rit.jpg" alt="RIT Logo" className="h-10 w-20" />
                        </a>
                        <a href="https://iucee.org/">
                            <img src="/logos/iucee.jpg" alt="IUCEE Logo" className="h-10 w-20" />
                        </a>
                        <h1 className="text-2xl font-bold text-primary">IUCEE-RIT</h1>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className="text-white hover:text-primary transition-colors">{link.title}</a>
                        ))}
                    </div>
                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-4 6h16" /></svg>
                    </button>
                </div>
            </nav>
            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-gray-900/95 backdrop-blur-md z-30 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={closeMenu} className="text-2xl hover:text-primary transition-colors">{link.title}</a>
                    ))}
                </div>
            </div>
        </>
    );
};

// ---------- Component: HeroSection ----------
export const HeroSection = ({ onJoinClick, isEnrollmentOpen }) => (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden" id="hero">
        <div className="container mx-auto px-6 relative z-10 hero-content">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                IUCEE-RIT
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
                Fostering Innovation and Excellence in Engineering Education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#projects" className="btn-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                    Explore Projects
                </a>
                <button
                    onClick={onJoinClick}
                    disabled={!isEnrollmentOpen}
                    className="btn-secondary px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:border-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isEnrollmentOpen === null
                        ? 'Loading...'
                        : isEnrollmentOpen
                            ? 'Join Our Mission'
                            : 'Applications Closed'}
                </button>
            </div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
            <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-60"></div>
            <div className="floating-element absolute top-40 right-20 w-6 h-6 bg-accent rounded-full opacity-40"></div>
            <div className="floating-element absolute bottom-32 left-1/4 w-3 h-3 bg-primary rounded-full opacity-50"></div>
        </div>
    </section>
);
// ---------- Component: VisionSection ----------
export const VisionSection = () => {
    return (
        <section className="py-20" id="vision" >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-6 text-primary">Our Vision</h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-12">
                    To cultivate an environment of engineering excellence, empowering students to tackle real-world challenges through hands-on projects, industry collaboration, and a focus on sustainable development.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="vision-card  bg-gray-800/50 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-accent mb-3">Innovation</h3>
                        <p className="text-gray-400">Driving progress through creative solutions and cutting-edge technology.</p>
                    </div>
                    <div className="vision-card  bg-gray-800/50 p-6 rounded-lg" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-2xl font-bold text-accent mb-3">Collaboration</h3>
                        <p className="text-gray-400">Building strong partnerships between students, faculty, and industry leaders.</p>
                    </div>
                    <div className="vision-card  bg-gray-800/50 p-6 rounded-lg" style={{ animationDelay: '0.4s' }}>
                        <h3 className="text-2xl font-bold text-accent mb-3">Excellence</h3>
                        <p className="text-gray-400">Upholding the highest standards in education, research, and project execution.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ---------- Component: TimelineSection ----------
export const TimelineSection = ({ timelineEvents }) => {

    const TimelineItem = ({ event, index }) => {
        const isLeft = index % 2 === 0;
        return (
            <div className="timeline-item relative" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className={`flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="timeline-content bg-gray-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-700 w-full md:w-5/12">
                        <span className="text-sm font-semibold text-primary">{event.year}</span>
                        <h3 className="text-xl font-bold text-white mt-1 mb-2">{event.title}</h3>
                        <p className="text-gray-400">{event.description}</p>
                    </div>
                    <div className="timeline-dot-container flex justify-center w-full md:w-2/12">
                        <div className="timeline-dot w-4 h-4 bg-primary rounded-full border-4 border-gray-900 relative z-10"></div>
                    </div>
                    <div className="hidden md:block md:w-5/12"></div>
                </div>
            </div>
        );
    };

    return (
        <section className="py-20 relative" id="timeline" >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">Our Journey</h2>
                <div className="relative">
                    <div className="timeline-line absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary to-accent h-full transform -translate-x-1/2 hidden md:block"></div>
                    {timelineEvents && timelineEvents.map((event, index) =>
                        <TimelineItem key={index} event={event} index={index} />
                    )}
                </div>
            </div>
        </section>
    );
};

// ---------- Component: ProjectsSection ----------
export const ProjectsSection = ({ projects, onShowDetails }) => {
    return (
        <section className="py-20" id="projects" >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-primary">Featured Projects</h2>
                <Scroller>
                    {projects && projects.map(project => (
                        <div key={project.id} className="project-card" onClick={() => onShowDetails('project', project)}>
                            <img src={getFirstImage(project?.images)}
                                alt={project?.title || 'Project'}
                                loading="lazy" />
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="badge-3d">{safeGet(project, 'category', 'Project')}</span>
                                    <span className="text-sm text-gray-400">{safeGet(project, 'year', 'Year TBA')}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{safeGet(project, 'title', 'Untitled Project')}</h3>
                                <p className="text-gray-300 mb-4 line-clamp-2">{safeGet(project, 'description')}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(project?.technologies && Array.isArray(project.technologies) ? project.technologies : ['Tech stack not specified']).map((tech, idx) =>
                                        <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded">{tech}</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-primary font-semibold">{safeGet(project, 'status', 'Status unknown')}</span>
                                    <div className="text-primary font-semibold hover:underline">
                                        View Details →
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Scroller>
            </div>
        </section>
    );
};
// ---------- Component: AchievementsSection ----------
export const AchievementsSection = ({ achievements }) => {
    return (
        <section className="py-20" id="achievements" >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-center mb-16 text-primary">Our Impact</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {achievements && achievements.map((ach, index) => (
                        <a key={index} href={ach.link} className="achievement-card block bg-gray-800/50 p-6 rounded-lg p-6 flex flex-col items-center">
                            <div className="text-4xl text-primary mb-4"><Icon name={ach.icon} /></div>
                            <h3 className="text-xl font-bold text-white mb-2">{ach.title}</h3>
                            <p className="text-gray-400">{ach.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ---------- Component: TeamSection ----------
export const TeamSection = ({ teamMembers, onShowDetails }) => {
    return (
        <section className="py-20" id="team">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-primary">Our Team</h2>
                {/* Use the upgraded Scroller component */}
                <Scroller>
                    {teamMembers.map((member) => (
                        <div key={member?.name || `member-${index}`} className="team-card transform-gpu cursor-pointer" onClick={() => onShowDetails('team', member)}>
                            <img src={member?.image || 'https://placehold.co/120x120/1f2937/FFFFFF?text=Team'}
                                alt={member?.name || 'Team Member'}
                                loading="lazy" />
                            <h3 className="text-lg font-bold text-white mb-1">{safeGet(member, 'name', 'Team Member')}</h3>
                            <p className="text-primary font-semibold mb-2">{safeGet(member, 'role', 'Role not specified')}</p>
                            <p className="text-sm text-gray-400 mb-3">{safeGet(member, 'department', 'Department not specified')}</p>
                            <p className="text-xs text-gray-300 mb-4 line-clamp-2">{safeGet(member, 'bio')}</p>
                            <div className="text-xs text-primary mt-2">Click to view details →</div>
                        </div>
                    ))}
                </Scroller>
            </div>
        </section>
    );
};
// ---------- Component: AlumniSection ----------
export const AlumniSection = ({ alumni, onShowDetails }) => {
    return (
        <section className="py-20" id="alumni">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-primary">Our Alumni</h2>
                {/* Use the upgraded Scroller component */}
                <Scroller>
                    {alumni.map((person) => (
                        <div key={person.name} className="alumni-card transform-gpu cursor-pointer" onClick={() => onShowDetails('alumni', person)}>
                            <img src={person.image || 'https://placehold.co/100x100/1f2937/FFFFFF?text=Alumni'} alt={person.name} />
                            <h3 className="text-lg font-bold text-white mb-1">{person.name}</h3>
                            <p className="text-sm text-gray-400 mb-4">{person.currentRole}</p>
                            <div className="text-primary font-semibold hover:underline">
                                View Details →
                            </div>
                        </div>
                    ))}
                </Scroller>
            </div>
        </section>
    );
};

// ---------- Component: PartnersSection ----------
export const PartnersSection = ({ partners }) => {
    const duplicatedPartners = [...partners, ...partners];

    return (
        <section className="py-20 bg-gray-900/50" id="partners">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4 text-primary">Our Partners & Collaborators</h2>
                <p className="max-w-2xl mx-auto text-gray-400 mb-12">
                    We are proud to collaborate with leading academic institutions and industry partners to foster engineering excellence.
                </p>
                <div className="partner-scroller">
                    <div className="partner-scroller-inner">
                        {duplicatedPartners.map((partner, index) => (
                            <a
                                key={`${partner.name}-${index}`}
                                href={partner.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="partner-logo"
                                title={partner.name}
                            >
                                <img
                                    src={partner.logoUrl}
                                    alt={`${partner.name} logo`}
                                    className="h-12 sm:h-16 md:h-20 object-contain"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
// ---------- Component: EventsSection ----------
export const EventsSection = ({ events, onShowDetails }) => {
    const [activeTab, setActiveTab] = useState('upcoming');

    const UpcomingEventCard = ({ event, index }) => (
        <div className="event-card transform-gpu cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onShowDetails('upcoming_event', event)}>
            <img src={getFirstImage(event?.images)}
                alt={event?.title || 'Event'}
                loading="lazy"
                className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="badge-3d">{safeGet(event, 'category', 'Event')}</span>
                    <span className="text-sm text-accent">{safeGet(event, 'time', 'Time TBA')}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{safeGet(event, 'title', 'Untitled Event')}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{safeGet(event, 'description')}</p>
                <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                        </svg>
                        {event?.date ? new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : 'Date TBA'}
                    </div>
                </div>
                <div className="pt-4 text-primary font-semibold hover:underline">View Details & Register →</div>
            </div>
        </div>
    );

    const PastEventCard = ({ event, index }) => (
        <div className="event-card past-event transform-gpu cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onShowDetails('past_event', event)}>
            <img src={getFirstImage(event?.images)}
                alt={event?.title || 'Event'}
                loading="lazy"
                className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="badge-3d">{safeGet(event, 'category', 'Event')}</span>
                    <span className="text-sm text-gray-400">
                        {event?.date ? new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : 'Date TBA'}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-white">{safeGet(event, 'title', 'Untitled Event')}</h3>
                <p className="text-gray-300 text-sm">{safeGet(event, 'description')}</p>
                <div className="pt-2">
                    <div className="text-xs text-primary font-semibold mb-2">Highlights:</div>
                    <ul className="text-xs text-gray-400 space-y-1">
                        {(event?.highlights && Array.isArray(event.highlights) ? event.highlights.slice(0, 2) : ['No highlights available']).map((highlight, idx) =>
                            <li key={idx}>• {highlight}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-20 relative" id="events" >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">Events</h2>
                <div className="flex justify-center mb-12">
                    <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-2">
                        <button className={`event-tab-btn px-6 py-3 rounded-md ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
                        <button className={`event-tab-btn px-6 py-3 rounded-md ${activeTab === 'past' ? 'active' : ''}`} onClick={() => setActiveTab('past')}>Past</button>
                    </div>
                </div>
                <div className={`event-tab-content ${activeTab === 'upcoming' ? 'block' : 'hidden'}`}>
                    {events.upcoming?.length > 0 ? <Scroller>{events.upcoming.map((e, i) => <UpcomingEventCard key={i} event={e} index={i} />)}</Scroller> : <p className="text-center text-gray-400">No upcoming events scheduled.</p>}
                </div>
                <div className={`event-tab-content ${activeTab === 'past' ? 'block' : 'hidden'}`}>
                    {events.past?.length > 0 ? <Scroller>{events.past.map((e, i) => <PastEventCard key={i} event={e} index={i} />)}</Scroller> : <p className="text-center text-gray-400">No past events to show.</p>}
                </div>
            </div>
        </section>
    );
};

// ---------- Component: Footer ----------
export const Footer = ({ socialLinks }) => (
    <footer className="bg-gray-800/50 backdrop-blur-md py-12">
        <div className="container mx-auto px-6">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary">Connect With Us</h3>
                <p className="text-gray-400">Follow our journey and get the latest updates. And if there is an problem :)</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {socialLinks && socialLinks.map(social => (
                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                        className="social-card block bg-gray-800/50 backdrop-blur-md p-6 rounded-lg text-center border border-gray-700 hover:border-primary hover:-translate-y-2 transition-all duration-300">
                        <div className="mb-4 flex justify-center" style={{ color: social.color }}><Icon name={social.icon} /></div>
                        <h4 className="text-xl font-bold text-white mb-2">{social.name}</h4>
                        <p className="text-gray-400 text-sm mb-4">{social.description}</p>
                        <span className="font-semibold text-primary group-hover:underline">
                            {social.name === 'LinkedIn' ? 'Connect' : 'Follow'} →
                        </span>
                    </a>
                ))}
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} IUCEE-RIT. All rights reserved.</p>
                <p>Built by the IUCEE-RIT Tech Team.</p>
            </div>
        </div>
    </footer>
);
// ---------- Component: GalleryComponent ----------

export const GalleryComponent = ({ galleryItems, onImageClick }) => {
    const sliderRef = useRef(null);
    const [indicatorText, setIndicatorText] = useState('');

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth * 0.85;
            sliderRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider || !galleryItems || galleryItems.length === 0) return;

        const slides = Array.from(slider.children);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index, 10);
                    setIndicatorText(`${index + 1} / ${galleryItems.length}`);
                }
                entry.target.classList.toggle('is-active', entry.isIntersecting);
            });
        }, {
            root: slider,
            threshold: 0.6
        });

        slides.forEach(slide => observer.observe(slide));

        // Initial check
        if (slides[0]) {
            setIndicatorText(`1 / ${galleryItems.length}`);
        }

        return () => slides.forEach(slide => observer.unobserve(slide));
    }, [galleryItems]);

    return (
        <section id="gallery" className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-primary">Gallery</h2>
                <div className="relative">
                    <button onClick={() => scroll(-1)} className="gallery-nav left-0 hidden md:flex">&lt;</button>
                    <div ref={sliderRef} className="gallery-slider">
                        {galleryItems && galleryItems.map((item, index) => (
                            <div
                                key={index}
                                className="gallery-slide group"
                                data-index={index}
                                onClick={() => onImageClick(item.images[0], item.images, 0)}
                            >
                                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                                <div className="gallery-slide-overlay">
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => scroll(1)} className="gallery-nav right-0 hidden md:flex">&gt;</button>
                    {indicatorText && <div className="scroll-indicator mt-4 relative bottom-auto">{indicatorText}</div>}
                </div>
            </div>
        </section>
    );
};
// ---------- Component: SdgSection ----------
export const SdgSection = ({ sdgs }) => {
    return (
        <section className="py-20 relative z-10" id="sdg" >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-primary relative z-20">UN Sustainable Development Goals</h2>
                <div className="relative z-10">
                    <Scroller>
                        {sdgs && sdgs.map(goal => (
                            <div
                                key={goal.id}
                                // CSS class 'sdg-card' is now controlled by the new CSS added above
                                className="sdg-card cursor-pointer opacity-100 relative z-10 bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-primary transition-colors"
                                onClick={() => window.open(`https://sdgs.un.org/goals/goal${goal.id}`, "_blank", "noopener,noreferrer")}
                            >
                                <div className="text-4xl mb-2">{goal.icon}</div>
                                <h3 className="font-bold text-white">{goal.id}. {goal.title}</h3>
                                <p className="text-sm text-gray-400 mt-2">{goal.description}</p>
                                <div className="text-xs text-primary mt-4">Click to learn more →</div>
                            </div>
                        ))}
                    </Scroller>
                </div>
            </div>
        </section>
    );
};
// =================================================================
// MODAL COMPONENTS
// =================================================================

// ---------- Component: ApplicationModal ----------
export const ApplicationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');

        // Clear previous errors and set loading state
        setErrorMessage('');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json(); // Get the JSON response body

            if (!response.ok) {
                // If the server sent an error, display its message
                setErrorMessage(result.message || 'An unknown server error occurred.');
            } else {
                // On success, show alert and close
                alert("Application submitted successfully! We will contact you soon.");
                onClose();
            }

        } catch (error) {
            console.error('Submission Error:', error);
            setErrorMessage('Failed to connect to the server. Please check your network.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Application';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h3 className="text-2xl font-bold text-primary">Join Our Mission</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"> {/* ... svg ... */} </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <input type="text" name="name" placeholder="Full Name" className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
                            <input type="email" name="email" placeholder="Email Address" className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
                            <input type="tel" name="phone" pattern="\d{10}" placeholder="Contact Number (10 digits only)" className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
                            <input type="text" inputMode="numeric" pattern="\d{7}" name="prn" placeholder="PRN (7 digits only)" className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
                            <select name="branch" className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" required defaultValue="">
                                <option value="" disabled>Branch of Study</option>
                                <option value="Computer Engineering">Computer Engineering</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                                <option value="Civil Engineering">Civil Engineering</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Other">Other</option>
                            </select>
                            <select name="year" className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" required defaultValue="">
                                <option value="" disabled>Year of Study</option>
                                <option value="1">First Year</option>
                                <option value="2">Second Year</option>
                                <option value="3">Third Year</option>
                                <option value="4">Fourth Year</option>
                            </select>
                            <textarea name="motivation" placeholder="Why do you want to join IUCEE-RIT?" rows="3" className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" required></textarea>
                            <textarea name="experience" placeholder="Any previous experience? (Optional)" rows="2" className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none"></textarea>
                            {errorMessage && (<p className="text-red-400 text-sm text-center bg-red-900/50 p-3 rounded-lg">{errorMessage}</p>)}
                            <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold">Submit Application</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// ---------- Component: DetailsModal ----------
export const DetailsModal = ({ isOpen, onClose, type, data, onImageClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => { setCurrentImageIndex(0); }, [data]);

    if (!isOpen || !data) return null;

    const renderContent = () => {
        switch (type) {
            case 'project':
                const project = data;
                return (
                    <div className="flex flex-col gap-6">
                        <GalleryScroller
                            images={project?.images}
                            title={project?.title}
                            onImageClick={onImageClick}
                        />
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <p className="text-gray-300 mb-6">{safeGet(project, 'description')}</p>
                                <h4 className="font-bold text-primary mb-2">Project Team:</h4>
                                <ul className="list-disc list-inside text-gray-400">
                                    {(project?.teamMembers && Array.isArray(project.teamMembers) ? project.teamMembers : ['Team information not available']).map((member, idx) =>
                                        <li key={idx}>{member}</li>
                                    )}
                                </ul>
                            </div>
                            <div className="md:w-1/3 space-y-4">
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <h4 className="font-bold text-primary mb-2">Details</h4>
                                    <div className="text-sm space-y-1">
                                        <p><strong>Year:</strong> {safeGet(project, 'year', 'Not specified')}</p>
                                        <p><strong>Status:</strong> <span className="font-semibold text-accent">{safeGet(project, 'status', 'Unknown')}</span></p>
                                        <p><strong>Category:</strong> {safeGet(project, 'category', 'Not specified')}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg">
                                    <h4 className="font-bold text-primary mb-2">Technologies Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(project?.technologies && Array.isArray(project.technologies) ? project.technologies : ['Not specified']).map((tech, idx) =>
                                            <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded">{tech}</span>
                                        )}
                                    </div>
                                </div>
                                {(project?.links?.github || project?.links?.live) && (
                                    <div className="bg-gray-900/50 p-4 rounded-lg">
                                        <h4 className="font-bold text-primary mb-2">Links</h4>
                                        <div className="flex flex-col space-y-2">
                                            {project?.links?.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2 text-center">View on GitHub</a>}
                                            {project?.links?.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2 text-center">View Live Demo</a>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'upcoming_event':
            case 'past_event':
                const event = data;
                return (
                    <div className="flex flex-col gap-6">
                        <GalleryScroller
                            images={event.images}
                            title={event.title}
                            onImageClick={onImageClick}
                        />
                        <p className="text-gray-300">{event.description}</p>
                        <div className="space-y-2 text-sm text-gray-200 border-t border-gray-700 pt-4 mt-4">
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            {event.time && <p><strong>Time:</strong> {event.time}</p>}
                            <p><strong>Location:</strong> {event.location}</p>
                            {type === 'upcoming_event' && <p><strong>Seats Available:</strong> {event.capacity}</p>}
                        </div>
                        {type === 'upcoming_event' && event.redirect_url && (
                            <button
                                className="btn-primary w-full py-3 rounded-lg font-semibold mt-6"
                                onClick={() => window.open(event.redirect_url, '_blank')}
                            >
                                Register Now
                            </button>
                        )}

                        {type === 'past_event' && event.highlights && (
                            <div className="mt-4">
                                <h4 className="font-bold text-primary mb-2">Highlights:</h4>
                                <ul className="list-disc list-inside text-gray-400 text-sm">
                                    {event.highlights.map(h => <li key={h}>{h}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'team':
                const member = data;
                return (
                    <div className="flex flex-col gap-6 text-left">
                        {/* Header */}
                        <div className="text-center">
                            <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary" />
                            <h4 className="text-2xl font-bold">{member.name}</h4>
                            <p className="text-accent">{member.role}</p>
                            <p className="text-gray-400 text-sm">{member.department}</p>
                        </div>

                        {/* Two-Column Layout */}
                        <div className="flex flex-col md:flex-row gap-6 border-t border-gray-700 pt-6">
                            {/* Left Column: Bio & Info */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h5 className="font-bold text-primary mb-2">About</h5>
                                    <p className="text-gray-300 text-sm">{member.bio}</p>
                                </div>
                                {(member.publications || member.projects) && (
                                    <div>
                                        <h5 className="font-bold text-primary mb-2">Contributions</h5>
                                        <div className="text-sm text-gray-400">
                                            {member.publications && <p>Publications: {member.publications}</p>}
                                            {member.projects && <p>Projects: {member.projects}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Right Column: Skills & Link */}
                            <div className="md:w-1/3 space-y-4">
                                <div>
                                    <h5 className="font-bold text-primary mb-2">Expertise</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {member.expertise.map(skill => <span key={skill} className="text-xs bg-gray-700 text-accent font-medium px-2 py-1 rounded">{skill}</span>)}
                                    </div>
                                </div>
                                {member.link && <a href={member.link} target="_blank" rel="noopener noreferrer" className="btn-primary block text-center w-full py-2 rounded-lg mt-4">View Profile</a>}
                            </div>
                        </div>
                    </div>
                );

            case 'alumni':
                const person = data;
                return (
                    <div className="flex flex-col gap-6 text-left">
                        {/* Header */}
                        <div className="text-center">
                            <img src={person.image} alt={person.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary" />
                            <h4 className="text-2xl font-bold">{person.name}</h4>
                            <p className="text-accent">{person.currentRole}</p>
                            {person.year && <p className="text-gray-400 text-sm">Active Year: {person.year}</p>}
                        </div>

                        {/* Content Area */}
                        <div className="border-t border-gray-700 pt-6">
                            {person.quote && (
                                <blockquote className="text-center text-gray-300 italic border-l-4 border-primary pl-4 mb-6">
                                    "{person.quote}"
                                </blockquote>
                            )}
                            <p className="text-center text-gray-400 mb-6">Our esteemed alumnus, now making an impact in the professional world.</p>
                            <a href={person.link} target="_blank" rel="noopener noreferrer" className="btn-primary block text-center w-full max-w-xs mx-auto py-2 rounded-lg">View LinkedIn Profile</a>
                        </div>
                    </div>
                );
            default:
                return <p className="text-gray-300 mb-4">{data.description || 'Details not available.'}</p>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h3 className="text-2xl font-bold text-primary">{data.title || data.name || 'Details'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="p-6 overflow-y-auto">{renderContent()}</div>
            </div>
        </div>
    );
};
