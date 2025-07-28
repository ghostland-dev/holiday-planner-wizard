import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Plane, Menu, User, Heart, Settings, Leaf, Home, MapPin, Info, Bell } from 'lucide-react';
import NotificationCenter, { Notification } from './NotificationCenter';

interface NavbarProps {
  onNavigate: (section: string) => void;
  currentSection?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentSection = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'invitation',
      title: 'Nouvelle invitation voyage',
      message: 'Marie vous a invité à planifier un voyage en Norvège',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'consensus',
      title: 'Consensus atteint',
      message: 'Votre groupe s\'accorde sur le budget pour Costa Rica',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'message',
      title: 'Nouveau message',
      message: 'Paul a ajouté un commentaire sur votre voyage',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: true,
      priority: 'low'
    }
  ]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  const handleNavigation = (section: string) => {
    onNavigate(section);
    closeMobileMenu();
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const isActive = (section: string) => currentSection === section;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container-mobile">
        <div className="flex items-center justify-between h-16">
          {/* Logo éco-responsable */}
          <div className="flex items-center gap-3 cursor-pointer touch-target" onClick={() => handleNavigation('home')}>
            <div className="w-10 h-10 bg-gradient-to-r from-forest-primary to-emerald rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold gradient-text hidden xs:block">
              EcoVoyage
            </span>
          </div>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => handleNavigation('home')}
              className={`flex items-center gap-2 transition-colors font-medium touch-target ${
                isActive('home') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
              }`}
            >
              <Home className="h-4 w-4" />
              Accueil
            </button>
            <button 
              onClick={() => handleNavigation('planner')}
              className={`flex items-center gap-2 transition-colors font-medium touch-target ${
                isActive('planner') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
              }`}
            >
              <Plane className="h-4 w-4" />
              Planificateur
            </button>
            <button 
              onClick={() => handleNavigation('destinations')}
              className={`flex items-center gap-2 transition-colors font-medium touch-target ${
                isActive('destinations') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
              }`}
            >
              <MapPin className="h-4 w-4" />
              Destinations
            </button>
            <button 
              onClick={() => handleNavigation('about')}
              className={`flex items-center gap-2 transition-colors font-medium touch-target ${
                isActive('about') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
              }`}
            >
              <Info className="h-4 w-4" />
              À propos
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Centre de notifications */}
            <div className="hidden md:block">
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDeleteNotification={handleDeleteNotification}
              />
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleNavigation('favorites')}
              className="hidden md:flex touch-target"
            >
              <Heart className="h-4 w-4 mr-2" />
              Favoris
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleNavigation('profile')}
              className="hidden md:flex touch-target"
            >
              <User className="h-4 w-4 mr-2" />
              Connexion
            </Button>

            <Button 
              size="sm" 
              onClick={() => handleNavigation('planner')}
              className="button-nature hidden sm:flex touch-target"
            >
              <Plane className="h-4 w-4 mr-2" />
              Planifier
            </Button>

            {/* Menu mobile amélioré */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden touch-target">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <div className="flex flex-col h-full">
                  {/* Header du menu mobile */}
                  <div className="flex items-center gap-3 pb-6 border-b border-border">
                    <div className="w-10 h-10 bg-gradient-to-r from-forest-primary to-emerald rounded-xl flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">EcoVoyage</span>
                  </div>

                  {/* Navigation mobile */}
                  <nav className="flex-1 py-6 space-y-2">
                    <button
                      onClick={() => handleNavigation('home')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors touch-target ${
                        isActive('home') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <Home className="h-5 w-5" />
                      <span className="font-medium">Accueil</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation('planner')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors touch-target ${
                        isActive('planner') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <Plane className="h-5 w-5" />
                      <span className="font-medium">Planificateur</span>
                    </button>
                    
                    <button 
                      onClick={() => handleNavigation('destinations')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors touch-target ${
                        isActive('destinations') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">Destinations</span>
                    </button>
                    
                    <button 
                      onClick={() => handleNavigation('favorites')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors touch-target ${
                        isActive('favorites') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <Heart className="h-5 w-5" />
                      <span className="font-medium">Favoris</span>
                    </button>
                    
                    <button 
                      onClick={() => handleNavigation('about')}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors touch-target ${
                        isActive('about') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <Info className="h-5 w-5" />
                      <span className="font-medium">À propos</span>
                    </button>

                    {/* Notifications mobiles */}
                    <div className="pt-4 border-t border-border">
                      <div className="px-4 py-2">
                        <span className="text-sm font-medium text-muted-foreground">Notifications</span>
                        {notifications.filter(n => !n.isRead).length > 0 && (
                          <Badge variant="destructive" className="ml-2 h-5 w-5 text-xs p-0 flex items-center justify-center">
                            {notifications.filter(n => !n.isRead).length}
                          </Badge>
                        )}
                      </div>
                      <NotificationCenter
                        notifications={notifications}
                        onMarkAsRead={handleMarkAsRead}
                        onMarkAllAsRead={handleMarkAllAsRead}
                        onDeleteNotification={handleDeleteNotification}
                      />
                    </div>
                  </nav>

                  {/* Actions du menu mobile */}
                  <div className="space-y-3 pt-6 border-t border-border">
                    <Button 
                      variant="outline" 
                      className="w-full touch-target"
                      onClick={() => handleNavigation('profile')}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Connexion
                    </Button>
                    
                    <Button 
                      onClick={() => handleNavigation('planner')}
                      className="w-full button-nature touch-target"
                    >
                      <Plane className="h-4 w-4 mr-2" />
                      Commencer la planification
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;