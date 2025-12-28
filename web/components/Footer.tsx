import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#002511] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand/Logo Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-green-400 mb-4">Mahia</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for team news, player profiles, and match
              tickets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/player"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Players
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.59.12 4.694.265 3.954.51c-.806.262-1.49.577-2.174 1.261C.577 2.455.262 3.139 0 3.945.265 4.685.41 5.581.467 6.781c.053 1.206.067 1.606.067 5.217s-.014 4.011-.067 5.217c-.057 1.2-.202 2.096-.447 2.836-.262.806-.577 1.49-1.261 2.174-.684.684-1.368 1-2.174 1.261-.74.245-1.636.39-2.836.447C1.606 23.986 1.206 24 7.817 24s4.011-.014 5.217-.067c1.2-.057 2.096-.202 2.836-.447.806-.262 1.49-.577 2.174-1.261.684-.684 1-1.368 1.261-2.174.245-.74.39-1.636.447-2.836.053-1.206.067-1.606.067-5.217s-.014-4.011-.067-5.217c-.057-1.2-.202-2.096-.447-2.836-.262-.806-.577-1.49-1.261-2.174C20.545.577 19.861.262 19.055 0c-.74-.245-1.636-.39-2.836-.447C16.011.014 15.611 0 12 0zm0 2.163c4.574 0 5.14.018 6.958.104 1.673.078 2.583.358 3.186.598.74.297 1.267.654 1.832 1.219.565.565.922 1.092 1.219 1.832.24.603.52 1.513.598 3.186.086 1.818.104 2.384.104 6.958s-.018 5.14-.104 6.958c-.078 1.673-.358 2.583-.598 3.186-.297.74-.654 1.267-1.219 1.832-.565.565-1.092.922-1.832 1.219-.603.24-1.513.52-3.186.598-1.818.086-2.384.104-6.958.104s-5.14-.018-6.958-.104c-1.673-.078-2.583-.358-3.186-.598-.74-.297-1.267-.654-1.832-1.219C2.455 20.545 2.12 19.861 1.854 19.055c-.24-.603-.52-1.513-.598-3.186C1.172 14.051 1.154 13.485 1.154 9.911s.018-5.14.104-6.958c.078-1.673.358-2.583.598-3.186.297-.74.654-1.267 1.219-1.832.565-.565.922-1.092 1.832-1.219.603-.24 1.513-.52 3.186-.598C6.86 2.181 7.426 2.163 12 2.163zm0 3.781c-4.937 0-8.944 4.007-8.944 8.944S7.063 23.832 12 23.832s8.944-4.007 8.944-8.944S16.937 5.944 12 5.944zm0 14.694c-3.187 0-5.769-2.582-5.769-5.769s2.582-5.769 5.769-5.769 5.769 2.582 5.769 5.769-2.582 5.769-5.769 5.769zm8.483-15.482c-1.155 0-2.091-.936-2.091-2.091s.936-2.091 2.091-2.091 2.091.936 2.091 2.091-.936 2.091-2.091 2.091z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Mahia. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Made with ❤️ for the fans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
