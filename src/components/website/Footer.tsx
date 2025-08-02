import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground">
      {/* CTA Section */}
      <section className="bg-card text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground leading-tight mb-6">
            Make a difference today.
            <br />
            Your impact starts now.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join our mission to create positive change in communities around the world. 
            Every contribution makes a difference.
          </p>
          <Button 
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 py-3 h-auto text-base"
          >
            <a href="/donate">Donate Now →</a>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-border py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="lg:flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Stay connected
            </h3>
            <p className="text-muted-foreground text-base">
              Subscribe to our newsletter for the latest updates on our programs, 
              success stories, and ways to get involved.
            </p>
          </div>
          
          <form className="flex flex-col sm:flex-row gap-3 lg:max-w-md w-full lg:flex-shrink-0">
            <Input 
              type="email"
              name="email"
              placeholder="Your email address" 
              className="bg-input border-border text-foreground placeholder:text-muted-foreground flex-1"
              required
            />
            <Button 
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer Links */}
      <section className="border-t border-border py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">About</h4>
              <nav className="space-y-3">
                <a href="/about-us" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
                <a href="/board-of-directors" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Board of Directors
                </a>
                <a href="/team-members" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Team Members
                </a>
                <a href="/faqs" className="block text-muted-foreground hover:text-foreground transition-colors">
                  FAQs
                </a>
              </nav>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Initiatives</h4>
              <nav className="space-y-3">
                <a href="/programs" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Programs
                </a>
                <a href="/projects" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </a>
                <a href="/activities" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Activities
                </a>
                <a href="/news" className="block text-muted-foreground hover:text-foreground transition-colors">
                  News
                </a>
              </nav>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Media</h4>
              <nav className="space-y-3">
                <a href="/media/images" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Photo Gallery
                </a>
                <a href="/media/videos" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Videos
                </a>
                <a href="/media/publications" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Publications
                </a>
                <a href="/media/success-stories" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Success Stories
                </a>
              </nav>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Get Involved</h4>
              <nav className="space-y-3">
                <a href="/donate" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Donate
                </a>
                <a href="/become-a-volunteer" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Volunteer
                </a>
                <a href="/work-with-us" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Work With Us
                </a>
                <a href="/contact-us" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="border-t border-border py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground text-sm">
            <p>© 2025 Smile Development Foundation. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
              </svg>
            </a>
            
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.748.099.119.112.224.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </footer>
  )
}