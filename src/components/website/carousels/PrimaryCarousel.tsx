'use client';
import { PrimaryCarouselCard } from "@/types/primaryCarouselCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";

export default function PrimaryCarousel({ locale, cards }: { locale: string, cards: PrimaryCarouselCard[] }) {
  const isLocaleEnglish = locale === "en";
  const isRTL = !isLocaleEnglish;
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Helper function to get the correct index with wrapping
  const getCardIndex = (offset: number) => {
    const index = currentCard + offset;
    if (index < 0) return cards.length + index;
    if (index >= cards.length) return index - cards.length;
    return index;
  };

  // Get previous, current, and next cards
  const previousIndex = getCardIndex(-1);
  const nextIndex = getCardIndex(1);
  const currentIndex = currentCard;

  // Get card position for smooth animations
  const getCardPosition = (cardIndex: number) => {
    if (cardIndex === currentIndex) return 'current';
    if (cardIndex === previousIndex) return 'previous';
    if (cardIndex === nextIndex) return 'next';
    return 'hidden';
  };

  const previousCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCard(previousIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const nextCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCard(nextIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToCard = (index: number) => {
    if (index < 0 || index >= cards.length || isTransitioning || index === currentCard) return;
    setIsTransitioning(true);
    setCurrentCard(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const autoPlay = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentCard(nextIndex);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  useEffect(() => {
    if (!cards || cards.length === 0) return;
    const interval = setInterval(autoPlay, 5000);
    return () => clearInterval(interval);
  }, [currentCard, cards, isTransitioning]);

  if (!cards || cards.length === 0) {
    return <div className="w-full h-screen bg-gray-200 flex items-center justify-center">No cards available</div>;
  }

  const currentCardData = cards[currentIndex];

  // Create array of all cards with their positions for smooth animations
  const visibleCards = cards.map((card, index) => ({
    data: card,
    position: getCardPosition(index),
    index: index
  })).filter(card => card.position !== 'hidden');

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden `}
      id="primary-carousel"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* Background image with smooth transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ 
          backgroundImage: `url(${currentCardData.imageUrl})`,
          transitionProperty: 'background-image, transform',
        }}
      />
      
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-700" />
      
      {/* Content container */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between p-4 md:p-8 lg:p-12">
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl px-4 md:px-8">
          <div className="space-y-4 md:space-y-6">
            <h1 
              key={`title-${currentCard}`}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight transition-all duration-700 ease-in-out transform"
              style={{
                animation: `fadeInUp 700ms ease-in-out`,
                animationFillMode: 'both'
              }}
            >
              {isLocaleEnglish ? currentCardData.titleEn : currentCardData.titleAr}
            </h1>
            
            <p 
              key={`description-${currentCard}`}
              className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl transition-all duration-700 ease-in-out transform"
              style={{
                animation: `fadeInUp 700ms ease-in-out 150ms`,
                animationFillMode: 'both'
              }}
            >
              {isLocaleEnglish ? currentCardData.descriptionEn : currentCardData.descriptionAr}
            </p>
            
            <p 
              key={`location-${currentCard}`}
              className="text-sm md:text-base text-white/80 flex items-center gap-2 transition-all duration-700 ease-in-out transform"
              style={{
                animation: `fadeInUp 700ms ease-in-out 300ms`,
                animationFillMode: 'both'
              }}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              {isLocaleEnglish ? currentCardData.locationEn : currentCardData.locationAr}
            </p>
            
            <Link 
              key={`link-${currentCard}`}
              href={isLocaleEnglish ? currentCardData.linkUrlEn : currentCardData.linkUrlAr} 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-all duration-300 text-sm md:text-base font-medium transform hover:scale-105"
              style={{
                animation: `fadeInUp 700ms ease-in-out 450ms`,
                animationFillMode: 'both'
              }}
            >
              {isLocaleEnglish ? currentCardData.linkTextEn : currentCardData.linkTextAr}
              {isRTL ? <LucideArrowLeft className="w-4 h-4" /> : <LucideArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>

        {/* Card thumbnails and controls */}
        <div className="flex flex-col items-center md:items-end gap-6 md:gap-8">
          
          {/* Card thumbnails */}
          <div className="relative flex items-center justify-center h-40 md:h-52 lg:h-60 w-72 md:w-80 lg:w-96 overflow-visible">
            {visibleCards.map((card, idx) => {
              const isActive = card.position === 'current';
              const isPrevious = card.position === 'previous';
              const isNext = card.position === 'next';
              
              // Calculate position and scale based on card position
              let transformClasses = '';
              let sizeClasses = '';
              let zIndexClasses = '';
              let opacityClasses = '';
              
              if (isActive) {
                transformClasses = 'translate-x-0 scale-110';
                sizeClasses = 'w-20 h-28 md:w-32 md:h-40 lg:w-40 lg:h-52';
                zIndexClasses = 'z-30';
                opacityClasses = 'opacity-100';
              } else if (isPrevious) {
                transformClasses = '-translate-x-16 md:-translate-x-20 lg:-translate-x-24 scale-85';
                sizeClasses = 'w-16 h-24 md:w-24 md:h-32 lg:w-28 lg:h-36';
                zIndexClasses = 'z-20';
                opacityClasses = 'opacity-60 md:opacity-75';
              } else if (isNext) {
                transformClasses = 'translate-x-16 md:translate-x-20 lg:translate-x-24 scale-85';
                sizeClasses = 'w-16 h-24 md:w-24 md:h-32 lg:w-28 lg:h-36';
                zIndexClasses = 'z-20';
                opacityClasses = 'opacity-60 md:opacity-75';
              }

              return (
                <div
                  key={card.index}
                  className={`absolute cursor-pointer transition-all duration-700 ease-in-out rounded-lg overflow-hidden border-2 transform ${transformClasses} ${sizeClasses} ${zIndexClasses} ${opacityClasses} ${
                    isActive 
                      ? 'border-white shadow-2xl' 
                      : 'border-white/50 hover:border-white/80 hover:scale-95'
                  } ${isTransitioning ? 'pointer-events-none' : ''}`}
                  onClick={() => goToCard(card.index)}
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center transition-all duration-700"
                    style={{ backgroundImage: `url(${card.data.imageUrl})` }}
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-700" />
                  )}
                  
                  {/* Card position indicator */}
                  <div className={`absolute top-2 left-2 w-2 h-2 rounded-full transition-all duration-700 ${
                    isActive ? 'bg-white' : 'bg-white/50'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-4">
            {/* Previous button */}
            <button
              onClick={previousCard}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 group"
              aria-label="Previous card"
            >
              {isRTL ? (
                <LucideArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <LucideArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>

            {/* Progress indicator */}
            <div className="relative w-16 md:w-20 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${((currentCard + 1) / cards.length) * 100}%` }}
              />
            </div>

            {/* Card counter */}
            <span className="text-white font-bold text-sm md:text-base min-w-[3rem] text-center">
              {String(currentCard + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
            </span>

            {/* Next button */}
            <button
              onClick={nextCard}
              className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 group"
              aria-label="Next card"
            >
              {isRTL ? (
                <LucideArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <LucideArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}