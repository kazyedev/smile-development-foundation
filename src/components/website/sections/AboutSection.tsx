'use client';

import { LucideArrowLeft, LucideEye, LucideHeartHandshake, LucideRocket, LucideSchool, LucideUsers } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface AboutSectionProps {
    locale?: string;
}

export default function AboutSection({ locale = 'en' }: AboutSectionProps) {
    const isLocaleEnglish = locale === 'en';
    
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const scaleOnHover = {
        whileHover: { 
            scale: 1.05,
            transition: { duration: 0.2 }
        }
    };

    const content = {
        title: {
            en: "A Yemeni Non-Profit Charitable Organization",
            ar: "منظمة خيرية يمنية غير ربحية"
        },
        description: {
            en: "A Yemeni non-profit charitable organization established to contribute to alleviating the suffering of many Yemenis due to economic and social deterioration. We have chosen to strive earnestly and effectively to build and nurture the Yemeni people in health and educational fields. We have committed ourselves to creating sustainable positive change in our communities through innovative programs and dedicated service.",
            ar: "منظمة خيرية يمنية غير ربحية تأسست لغرض المساهمة في التخفيف من معاناة الكثير من اليمنيين بسبب التدهور الاقتصادي والاجتماعي. لقد اخترنا أن نسعى جاهدين وفعالين لبناء ورعاية الإنسان اليمني في المجالات الصحية والتعليمية. لقد التزمنا بأنفسنا بخلق تغيير إيجابي مستدام في مجتمعاتنا من خلال برامج مبتكرة وخدمة مخلصة."
        },
        readMore: {
            en: "Read More",
            ar: "اقرأ المزيد"
        },
        vision: {
            title: {
                en: "Our Vision",
                ar: "رؤيتنا"
            },
            content: {
                en: "Leadership in social responsibility and sustainable community development",
                ar: "الريادة في المسؤولية الاجتماعية والتنمية المجتمعية المستدامة"
            }
        },
        mission: {
            title: {
                en: "Our Mission", 
                ar: "رسالتنا"
            },
            content: {
                en: "Contributing to alleviating the suffering of many Yemenis due to economic and social deterioration through innovative health and educational programs",
                ar: "المساهمة في التخفيف من معاناة الكثير من اليمنيين بسبب التدهور الاقتصادي والاجتماعي من خلال برامج صحية وتعليمية مبتكرة"
            }
        },
        programs: [
            {
                href: `/${locale}/programs/medical-assistance`,
                icon: LucideHeartHandshake,
                title: {
                    en: "Hayat Medical Assistance Program",
                    ar: "برنامج حياة للمساعدات الطبية"
                },
                bgColor: "bg-[var(--brand-primary)]"
            },
            {
                href: `/${locale}/programs/scholarships`,
                icon: LucideSchool,
                title: {
                    en: "Badr Scholarship Program",
                    ar: "برنامج بدر للمنح الدراسية"
                },
                bgColor: "bg-[var(--brand-secondary)]"
            },
            {
                href: `/${locale}/programs/development-center`,
                icon: LucideUsers,
                title: {
                    en: "Al-Rashid Development Center",
                    ar: "مركز الراشد للتنمية"
                },
                bgColor: "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]"
            }
        ]
    };

    return (
        <div className="bg-muted/50 ">
            <div className="container mx-auto px-4 py-16">
                {/* Main Content Section */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerChildren}
                >
                    <motion.div 
                        className="relative"
                        variants={fadeInUp}
                    >
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                            variants={fadeInUp}
                        >
                            {isLocaleEnglish ? content.title.en : content.title.ar}
                        </motion.h2>
                        <motion.p 
                            className="text-muted-foreground leading-relaxed text-lg"
                            variants={fadeInUp}
                        >
                            {isLocaleEnglish ? content.description.en : content.description.ar}
                            {" "}
                            <motion.a 
                                className="text-[var(--brand-primary)] hover:text-[var(--brand-secondary)] transition-colors inline-flex items-center gap-1 font-medium"
                                href={`/${locale}/about-us`}
                                whileHover={{ x: isLocaleEnglish ? 5 : -5 }}
                            >
                                {isLocaleEnglish && <span>{content.readMore.en}</span>}
                                <LucideArrowLeft className={`inline w-4 h-4 ${isLocaleEnglish ? 'rotate-180' : ''}`} />
                                {!isLocaleEnglish && <span>{content.readMore.ar}</span>}
                            </motion.a>
                        </motion.p>
                        
                        {/* Decorative elements */}
                        <motion.div 
                            className="absolute -bottom-8 right-1/2 w-3 h-3 bg-[var(--brand-secondary)] rounded-full"
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div 
                            className="absolute top-1/2 -left-12 w-2 h-2 bg-[var(--brand-primary)] rounded-full"
                            animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{ 
                                duration: 3, 
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        />
                        <motion.div 
                            className="absolute -top-4 right-1/4 w-2 h-2 bg-[var(--brand-secondary)] rounded-full"
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                duration: 2.5, 
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        />
                        <motion.div 
                            className="absolute bottom-1/4 -right-8 w-2 h-2 bg-[var(--brand-primary)] rounded-full"
                            animate={{ 
                                scale: [1, 1.4, 1],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{ 
                                duration: 1.8, 
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1.5
                            }}
                        />
                    </motion.div>
                    
                    <motion.div 
                        className="rounded-lg overflow-hidden shadow-xl border-4 border-[var(--brand-primary)]"
                        variants={fadeInUp}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <iframe 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-64 md:h-80" 
                            frameBorder="0" 
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            title="YouTube video player"
                        />
                    </motion.div>
                </motion.div>

                {/* Vision and Mission Cards */}
                <motion.div 
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerChildren}
                >
                    <motion.div 
                        className="bg-card p-8 rounded-xl border-l-4 border-[var(--brand-primary)] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                        variants={fadeInUp}
                        whileHover={{ 
                            y: -8,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div>
                            <motion.div 
                                className="flex items-center justify-center w-16 h-16 bg-[var(--brand-secondary)]/20 rounded-full mb-6 group-hover:bg-[var(--brand-secondary)]/30 transition-colors"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <LucideEye className="text-[var(--brand-primary)] text-4xl" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-3 text-foreground">
                                {isLocaleEnglish ? content.vision.title.en : content.vision.title.ar}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {isLocaleEnglish ? content.vision.content.en : content.vision.content.ar}
                            </p>
                        </div>
                        <motion.div 
                            className="h-1 w-20 bg-[var(--brand-primary)] mt-6 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: 80 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        />
                    </motion.div>

                    <motion.div 
                        className="bg-card p-8 rounded-xl border-l-4 border-[var(--brand-secondary)] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                        variants={fadeInUp}
                        whileHover={{ 
                            y: -8,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div>
                            <motion.div 
                                className="flex items-center justify-center w-16 h-16 bg-[var(--brand-primary)]/20 rounded-full mb-6 group-hover:bg-[var(--brand-primary)]/30 transition-colors"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <LucideRocket className="text-[var(--brand-secondary)] text-4xl" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-3 text-foreground">
                                {isLocaleEnglish ? content.mission.title.en : content.mission.title.ar}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {isLocaleEnglish ? content.mission.content.en : content.mission.content.ar}
                            </p>
                        </div>
                        <motion.div 
                            className="h-1 w-20 bg-[var(--brand-secondary)] mt-6 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: 80 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        />
                    </motion.div>

                    <motion.div 
                        className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        variants={fadeInUp}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <img 
                            alt="Two men signing documents at a table" 
                            className="w-full h-full object-cover min-h-[280px]" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBskb6Ogd0_kl1FuSKB4DiVJQj1JFNKkGTzUSdzgyS8zbp8K6U1S6Cl2xbx7Ilt-gZlO56TlHAdSFfWDzGTETBAYIBujOBQTohHzzwNsiUhXG4u_mOOEaZnmxSSp7jhrQ7SafDVGNIXatEs6sjqIAf_7auP9F9NjniyzdhuC7AdkcqvU0G6Pfw-EWtfExIUm_hJ6KwVSUCWN7e6F1RPrkFHZDfqKE2AlebeTmK8AdyJz4wS7QXrGZhB83Z9BMn8cMkr2OVJQk-4rfw" 
                        />
                    </motion.div>
                </motion.div>

                {/* Program Cards as Links */}
                <motion.div 
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerChildren}
                >
                    {content.programs.map((program, index) => {
                        const IconComponent = program.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                            >
                                <Link href={program.href}>
                                    <motion.div 
                                        className={`${program.bgColor} p-8 rounded-xl flex items-center gap-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group text-white overflow-hidden relative`}
                                        whileHover={{ 
                                            y: -5,
                                            scale: 1.02
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Background gradient overlay on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={false}
                                        />
                                        
                                        <motion.div 
                                            className="bg-white p-4 rounded-full shadow-md group-hover:shadow-lg transition-shadow duration-300 relative z-10"
                                            whileHover={{ 
                                                rotate: [0, -10, 10, 0],
                                                scale: 1.1
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <IconComponent className={`${index === 0 ? 'text-[var(--brand-primary)]' : index === 1 ? 'text-[var(--brand-secondary)]' : 'text-[var(--brand-primary)]'} text-3xl`} />
                                        </motion.div>
                                        
                                        <motion.span 
                                            className="font-bold text-lg leading-tight relative z-10 group-hover:text-white/95 transition-colors"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: isLocaleEnglish ? 5 : -5 }}
                                        >
                                            {isLocaleEnglish ? program.title.en : program.title.ar}
                                        </motion.span>

                                        {/* Arrow indicator */}
                                        <motion.div
                                            className={`absolute ${isLocaleEnglish ? 'right-6' : 'left-6'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                            initial={{ x: isLocaleEnglish ? -10 : 10 }}
                                            whileHover={{ x: 0 }}
                                        >
                                            <LucideArrowLeft className={`w-5 h-5 text-white ${isLocaleEnglish ? 'rotate-180' : ''}`} />
                                        </motion.div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}