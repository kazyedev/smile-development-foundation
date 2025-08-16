"use client"
import { ArrowDown, CircleQuestionMark, UserStar, Eye, MessageCircle, Target, Shield, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface WhoWeAreSectionProps {
    bioEn: string;
    bioAr: string;
    image: string;
    videoUrlEn: string;
    videoUrlAr: string;
    visionEn: string;
    visionAr: string;
    messageEn: string;
    messageAr: string;
    valuesEn: string;
    valuesAr: string;
    goalsEn: string[];
    goalsAr: string[];
    policesEn: string[];
    policesAr: string[];
    rulesEn: string[];
    rulesAr: string[];
    seoAnnouncementEn: string;
    seoAnnouncementAr: string;
    locale: string;
    cards: {
        titleEn: string;
        titleAr: string;
        lucideIconName: string;
        linkEn: string;
        linkAr: string;
    }[];
}

export default function WhoWeAreSection({ locale, bioEn, bioAr, image, videoUrlEn, videoUrlAr, visionEn, visionAr, messageEn, messageAr, valuesEn, valuesAr, goalsEn, goalsAr, policesEn, policesAr, rulesEn, rulesAr, seoAnnouncementEn, seoAnnouncementAr, cards }: WhoWeAreSectionProps) {
    const isLocaleEn = locale === 'en';
    
    // Single state to manage which accordion is open (only one at a time)
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    
    // Toggle function that ensures only one accordion is open
    const toggleAccordion = (accordionId: string) => {
        setOpenAccordion(prev => prev === accordionId ? null : accordionId);
    };

    // Helper function to render Lucide icons dynamically
    const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
        try {
            const cleanIconName = iconName.startsWith('Lucide')
                ? iconName.replace(/^Lucide/, '')
                : iconName;
            // @ts-ignore
            const LucideIcon = require('lucide-react')[cleanIconName];
            if (LucideIcon) {
                return <LucideIcon className={className} />;
            }
        } catch (e) {
            console.error(e);
            return <CircleQuestionMark className={className} />;
        }
        return <CircleQuestionMark className={className} />;
    };

    // Enhanced collapsible section component with smooth animations
    const CollapsibleSection = ({
        id,
        title,
        content,
        icon,
        children
    }: {
        id: string;
        title: string;
        content?: string;
        icon: React.ReactNode;
        children?: React.ReactNode;
    }) => {
        const isOpen = openAccordion === id;
        
    return (
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-900/20">
                <div
                    className="w-full flex items-center gap-4 p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                    onClick={() => toggleAccordion(id)}
                >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen 
                            ? 'bg-[var(--brand-secondary)]/30 dark:bg-[var(--brand-secondary)]/20 text-[var(--brand-primary)] scale-110' 
                            : 'bg-[var(--brand-secondary)]/20 dark:bg-gray-700 text-[var(--brand-primary)]'
                    }`}>
                        {icon}
                    </div>
                    <h3 className="flex-1 text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        {title}
                    </h3>
                    <div className={`transition-all duration-500 ease-out ${isOpen ? 'rotate-180 text-[var(--brand-primary)]' : 'text-gray-400 dark:text-gray-500'}`}>
                        <ArrowDown className="w-5 h-5" />
                    </div>
                </div>
                
                {/* Smooth accordion content with proper height animation */}
                <div 
                    className={`transition-all duration-700 overflow-hidden ${
                        isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'
                    }`}
                    style={{
                        transitionProperty: 'max-height, opacity, padding',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div className={`px-6 transition-all duration-700 ${isOpen ? 'pb-6 pt-0' : 'pb-0 pt-0'}`}>
                        {content && (
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                                {content}
                            </p>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
                                        <div className="space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight transition-colors duration-300">
                                {isLocaleEn ? "Who We Are" : "من نحن"}
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-full"></div>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                            {isLocaleEn ? bioEn : bioAr}
                        </p>
                        <div className="inline-block px-4 py-2 bg-[var(--brand-secondary)]/20 dark:bg-[var(--brand-secondary)]/10 text-[var(--brand-primary)] rounded-lg text-sm font-medium transition-colors duration-300">
                            {isLocaleEn ? seoAnnouncementEn : seoAnnouncementAr}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-2xl blur-2xl opacity-20 transform rotate-6"></div>
                        <Image
                            src={image}
                            alt="Who We Are"
                            width={600}
                            height={400}
                            className="relative z-10 w-full h-auto rounded-2xl shadow-xl object-cover"
                        />
                    </div>
                </div>

                                {/* Vision & Mission Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-[var(--brand-secondary)]/20 dark:bg-[var(--brand-secondary)]/10 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                            <Eye className="w-6 h-6 text-[var(--brand-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
                            {isLocaleEn ? "Our Vision" : "رؤيتنا"}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                            {isLocaleEn ? visionEn : visionAr}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-[var(--brand-secondary)]/20 dark:bg-[var(--brand-secondary)]/10 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                            <MessageCircle className="w-6 h-6 text-[var(--brand-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
                            {isLocaleEn ? "Our Message" : "رسالتنا"}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                            {isLocaleEn ? messageEn : messageAr}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-[var(--brand-secondary)]/20 dark:bg-[var(--brand-secondary)]/10 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                            <Target className="w-6 h-6 text-[var(--brand-primary)]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
                            {isLocaleEn ? "Our Values" : "قيمنا"}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                            {isLocaleEn ? valuesEn : valuesAr}
                        </p>
                    </div>
                </div>

                                {/* Video and Accordion Section */}
                {(videoUrlEn || videoUrlAr) && (
                    <div className="mb-20">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Video - 2/3 width on desktop */}
                            <div className="lg:col-span-2">
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                    <iframe
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                        frameBorder="0"
                                        src={isLocaleEn ? videoUrlEn : videoUrlAr}
                                        title="YouTube video player"
                                    />
                                </div>
                            </div>

                            {/* Accordion - 1/3 width on desktop */}
                            <div className="space-y-4">

                                                        <CollapsibleSection
                                    id="ceo-message"
                                    title={isLocaleEn ? "CEO's Message" : "رسالة الرئيس التنفيذي"}
                                    content={isLocaleEn ? messageEn : messageAr}
                                    icon={<UserStar className="w-5 h-5" />}
                                />

                                <CollapsibleSection
                                    id="goals"
                                    title={isLocaleEn ? "Our Goals" : "أهدافنا"}
                                    icon={<Target className="w-5 h-5" />}
                                    
                                >
                                    <ul className="space-y-3">
                                        {(isLocaleEn ? goalsEn : goalsAr).map((goal, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-[var(--brand-secondary)]/20 dark:bg-[var(--brand-secondary)]/10 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300">
                                                    <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full transition-colors duration-300"></div>
                                                </div>
                                                <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{goal}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CollapsibleSection>

                                <CollapsibleSection
                                    id="policies"
                                    title={isLocaleEn ? "Our Policies" : "سياساتنا"}
                                    icon={<Shield className="w-5 h-5" />}
                                >
                                    <ul className="space-y-3">
                                        {(isLocaleEn ? policesEn : policesAr).map((policy, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-[var(--brand-secondary)]/20 dark:bg-[var(--brand-secondary)]/10 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300">
                                                    <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full transition-colors duration-300"></div>
                                                </div>
                                                <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{policy}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CollapsibleSection>

                                <CollapsibleSection
                                    id="rules"
                                    title={isLocaleEn ? "Our Rules" : "قوانيننا"}
                                    icon={<FileText className="w-5 h-5" />}
                                >
                                    <ul className="space-y-3">
                                        {(isLocaleEn ? rulesEn : rulesAr).map((rule, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 bg-[var(--brand-secondary)]/20 dark:bg-[var(--brand-secondary)]/10 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300">
                                                    <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full transition-colors duration-300"></div>
                                                </div>
                                                <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{rule}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CollapsibleSection>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cards Section - Single Row */}
                <div className="mb-20">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.map((card, index) => (
                            <Link
                                href={isLocaleEn ? card.linkEn : card.linkAr}
                                key={index}
                                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-[var(--brand-secondary)]/20 to-[var(--brand-primary)]/10 dark:from-[var(--brand-secondary)]/10 dark:to-[var(--brand-primary)]/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                                    {renderIcon(card.lucideIconName, "w-8 h-8 text-[var(--brand-primary)]")}
                                </div>
                                <span className="text-gray-900 dark:text-gray-100 font-semibold text-center group-hover:text-[var(--brand-primary)] transition-colors duration-300">
                                    {isLocaleEn ? card.titleEn : card.titleAr}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}