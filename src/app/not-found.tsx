'use client';

import { motion } from 'framer-motion';
import { Home, Globe, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #3b82f6 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 404 Display */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-[8rem] md:text-[12rem] font-black leading-none text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                404
              </h1>
              
              <motion.div
                className="flex justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <AlertTriangle className="w-16 h-16 text-amber-500" />
              </motion.div>
            </motion.div>

            {/* Error Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Page Not Found
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Language Selection */}
            <Card className="p-6 mb-8 border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center justify-center gap-2">
                <Globe className="w-5 h-5" />
                Choose Your Language / اختر لغتك
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/en">
                    <span className="text-xl mr-2">🇺🇸</span>
                    English
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Link href="/ar">
                    <span className="text-xl mr-2">🇸🇦</span>
                    العربية
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Foundation Info */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Ebtsama Foundation / مؤسسة ابتسامة التنموية
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Building Better Futures Together
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
