"use client"
import { ArrowDown, CircleQuestionMark, UserStar, Eye, MessageCircle, Target, Shield, FileText, Sparkles, Heart, Users, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    
    // State to control video overlay visibility
    const [showVideoOverlay, setShowVideoOverlay] = useState(true);
    
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
            <motion.div 
                className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-xl dark:hover:shadow-gray-900/30 hover:border-brand-primary/20"
                whileHover={{ y: -2 }}
                layout
            >
                <div
                    className="w-full flex items-center gap-4 p-6 cursor-pointer hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-secondary/5 dark:hover:from-brand-primary/10 dark:hover:to-brand-secondary/10 transition-all duration-300"
                    onClick={() => toggleAccordion(id)}
                >
                    <motion.div 
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isOpen 
                                ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white scale-110 shadow-lg' 
                                : 'bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10 text-brand-primary'
                        }`}
                        animate={isOpen ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {icon}
                    </motion.div>
                    <h3 className="flex-1 text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        {title}
                    </h3>
                    <motion.div 
                        className={`transition-all duration-500 ease-out ${isOpen ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-500'}`}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                    >
                        <ArrowDown className="w-5 h-5" />
                    </motion.div>
                </div>
                
                {/* Smooth accordion content with proper height animation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key={id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 pb-6">
                                {content && (
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 mb-4">
                                        {content}
                                    </p>
                                )}
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    return (
        <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-muted/20 to-background transition-colors duration-300 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-3">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <motion.div 
                    className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 text-brand-primary rounded-full text-sm font-medium">
                                <Sparkles className="w-4 h-4" />
                                {isLocaleEn ? "About Our Foundation" : "عن مؤسستنا"}
                            </div>
                            
                            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight transition-colors duration-300">
                                {isLocaleEn ? "Who We Are" : "من نحن"}
                            </h1>
                            
                            <div className="w-32 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"></div>
                        </div>
                        
                        <p className="text-xl text-muted-foreground leading-relaxed transition-colors duration-300">
                            {isLocaleEn ? bioEn : bioAr}
                        </p>
                        
                        {/* <div className="inline-block px-6 py-3 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 text-brand-primary rounded-xl text-base font-medium transition-colors duration-300 border border-brand-primary/20">
                            {isLocaleEn ? seoAnnouncementEn : seoAnnouncementAr}
                        </div> */}
                    </div>
                    
                    <motion.div 
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
                        <div className="relative z-10 group">
                            <Image
                                src={image}
                                alt="Who We Are"
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-3xl shadow-2xl object-cover transition-all duration-700 group-hover:scale-105 group-hover:shadow-3xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Vision & Mission Grid */}
                <motion.div 
                    className="grid md:grid-cols-3 gap-8 mb-24"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-gray-900/30 transition-all duration-500 group hover:-translate-y-2"
                        whileHover={{ y: -8 }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
                            <Eye className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-4 transition-colors duration-300">
                            {isLocaleEn ? "Our Vision" : "رؤيتنا"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed transition-colors duration-300 text-lg">
                            {isLocaleEn ? visionEn : visionAr}
                        </p>
                    </motion.div>

                    <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-gray-900/30 transition-all duration-500 group hover:-translate-y-2"
                        whileHover={{ y: -8 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 dark:from-brand-secondary/10 dark:to-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
                            <MessageCircle className="w-8 h-8 text-brand-secondary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-4 transition-colors duration-300">
                            {isLocaleEn ? "Our Message" : "رسالتنا"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed transition-colors duration-300 text-lg">
                            {isLocaleEn ? messageEn : messageAr}
                        </p>
                    </motion.div>

                    <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-gray-900/30 transition-all duration-500 group hover:-translate-y-2"
                        whileHover={{ y: -8 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110">
                            <Heart className="w-8 h-8 text-brand-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-4 transition-colors duration-300">
                            {isLocaleEn ? "Our Values" : "قيمنا"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed transition-colors duration-300 text-lg">
                            {isLocaleEn ? valuesEn : valuesAr}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Video and Accordion Section */}
                {(videoUrlEn || videoUrlAr) && (
                    <motion.div 
                        className="mb-24"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Video - 2/3 width on desktop */}
                            <div className="lg:col-span-2">
                                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group">
                                    <iframe
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        frameBorder="0"
                                        src={isLocaleEn ? videoUrlEn : videoUrlAr}
                                        title="YouTube video player"
                                    />
                                    {showVideoOverlay && (
                                        <div 
                                            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer z-10"
                                            onClick={() => setShowVideoOverlay(false)}
                                            title={isLocaleEn ? "Click to watch video" : "انقر لمشاهدة الفيديو"}
                                        ></div>
                                    )}
                                </div>
                            </div>

                            {/* Accordion - 1/3 width on desktop */}
                            <div className="space-y-4">
                                {/* <CollapsibleSection
                                    id="ceo-message"
                                    title={isLocaleEn ? "CEO's Message" : "رسالة الرئيس التنفيذي"}
                                    content={isLocaleEn ? messageEn : messageAr}
                                    icon={<UserStar className="w-5 h-5" />}
                                /> */}

                                <CollapsibleSection
                                    id="goals"
                                    title={isLocaleEn ? "Our Goals" : "أهدافنا"}
                                    icon={<Target className="w-5 h-5" />}
                                >
                                    <ul className="space-y-4">
                                        {(isLocaleEn ? goalsEn : goalsAr).map((goal, index) => (
                                            <motion.li 
                                                key={index} 
                                                className="flex items-start gap-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-colors duration-300"></div>
                                                </div>
                                                <span className="text-muted-foreground transition-colors duration-300">{goal}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CollapsibleSection>

                                <CollapsibleSection
                                    id="policies"
                                    title={isLocaleEn ? "Our Policies" : "سياساتنا"}
                                    icon={<Shield className="w-5 h-5" />}
                                >
                                    <ul className="space-y-4">
                                        {(isLocaleEn ? policesEn : policesAr).map((policy, index) => (
                                            <motion.li 
                                                key={index} 
                                                className="flex items-start gap-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-colors duration-300"></div>
                                                </div>
                                                <span className="text-muted-foreground transition-colors duration-300">{policy}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CollapsibleSection>

                                <CollapsibleSection
                                    id="rules"
                                    title={isLocaleEn ? "Our Rules" : "قوانيننا"}
                                    icon={<FileText className="w-5 h-5" />}
                                >
                                    <ul className="space-y-4">
                                        {(isLocaleEn ? rulesEn : rulesAr).map((rule, index) => (
                                            <motion.li 
                                                key={index} 
                                                className="flex items-start gap-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-colors duration-300"></div>
                                                </div>
                                                <span className="text-muted-foreground transition-colors duration-300">{rule}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CollapsibleSection>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Cards Section - Single Row */}
                <motion.div 
                    className="mb-20"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            {isLocaleEn ? "Explore Our Work" : "اكتشف عملنا"}
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            {isLocaleEn 
                                ? "Discover the various areas where we make a difference in communities around the world."
                                : "اكتشف المجالات المختلفة التي نحدث فيها فرقاً في المجتمعات حول العالم."
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                <Link
                                    href={isLocaleEn ? card.linkEn : card.linkAr}
                                    className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-gray-900/30 transition-all duration-500 group h-full"
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/10 dark:to-brand-secondary/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-primary/30 group-hover:to-brand-secondary/30">
                                        {renderIcon(card.lucideIconName, "w-10 h-10 text-brand-primary group-hover:text-white transition-colors duration-300")}
                                    </div>
                                    <span className="text-foreground font-bold text-center group-hover:text-brand-primary transition-colors duration-300 text-lg">
                                        {isLocaleEn ? card.titleEn : card.titleAr}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}