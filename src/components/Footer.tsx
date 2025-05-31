import { Link } from 'react-router-dom';
import { Users, Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { Button, Badge, Separator } from '@/components/ui/base-ui';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-ua-blue to-ua-blue-soft text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-ua-blue" />
              </div>
              <span className="text-xl font-bold">UA Influencer Connect</span>
            </div>
            <p className="text-ua-blue-light mb-6 max-w-md">
              Платформа, що об'єднує українських інфлюенсерів із брендами для створення 
              автентичного та ефективного контенту.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Швидкі посилання</h3>
            <ul className="space-y-2 text-ua-blue-light">
              <li>
                <Link to="/catalog" className="hover:text-white transition-colors">
                  Каталог інфлюенсерів
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  Як це працює
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Тарифи
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Про нас
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-3 text-ua-blue-light">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                hello@uainfluencer.com
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +380 (50) 123-45-67
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Київ, Україна
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-ua-blue-light">
          <p>&copy; 2024 UA Influencer Connect. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
