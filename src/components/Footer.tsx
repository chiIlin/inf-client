import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const updateRole = () => {
      const userRole = localStorage.getItem('role');
      setRole(userRole);
    };

    updateRole();
    window.addEventListener('authStateChanged', updateRole);

    return () => {
      window.removeEventListener('authStateChanged', updateRole);
    };
  }, []);

  return (
    <footer className="bg-gradient-to-r from-ua-blue to-ua-pink text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">UA Influencer Connect</h3>
            <p className="text-blue-100 mb-4">
              Платформа, що об'єднує українських інфлюенсерів із брендами для створення 
              автентичного та ефективного контенту.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/sodd7m/" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/DwayneJohnson/" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Навігація</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-100 hover:text-white transition-colors">Головна</Link></li>
              <li><Link to="/catalog" className="text-blue-100 hover:text-white transition-colors">Каталог</Link></li>
              <li><Link to="/how-it-works" className="text-blue-100 hover:text-white transition-colors">Як це працює</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white transition-colors">Про нас</Link></li>
              {/* Показуємо кнопку "Біржа проектів" тільки для інфлюенсерів */}
              {role === 'influencer' && (
                <li>
                  <Link 
                    to="/project-board" 
                    className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors font-medium"
                  >
                    <Briefcase className="h-4 w-4" />
                    Біржа проектів
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Для користувачів</h4>
            <ul className="space-y-2">
              <li><Link to="/register-influencer" className="text-blue-100 hover:text-white transition-colors">Стати інфлюенсером</Link></li>
              <li><Link to="/register-brand" className="text-blue-100 hover:text-white transition-colors">Для брендів</Link></li>
              <li><Link to="/login" className="text-blue-100 hover:text-white transition-colors">Увійти</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакти</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-blue-100">info@uainfluencer.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-blue-100">+380 (50) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-blue-100">Київ, Україна</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-blue-100">
            © 2024 UA Influencer Connect. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
