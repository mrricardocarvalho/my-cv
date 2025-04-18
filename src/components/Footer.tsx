// Import labels if needed for translation (optional for copyright)
// import { labels } from '../cv-data';

// Props are optional here unless translating footer text
// interface FooterProps {
//   currentLanguage: 'en' | 'pt';
// }

function Footer(/* props: FooterProps */) {
  const currentYear = new Date().getFullYear();
  // const { currentLanguage } = props;

  return (
    // Use a standard HTML footer tag
    // Apply Tailwind classes for padding, background (optional), text alignment, color, and size
    <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 mt-8 text-center text-xs text-gray-500 bg-gray-100 border-t border-gray-200">
      {/* Ensure container wraps content if needed, or use w-full on footer */}
      {/* Centered paragraph for the copyright text */}
      <p>
          Copyright © {currentYear} - Ricardo Filipe Dias Sampaio de Carvalho - All right reserved
          {/* Example if translation needed: */}
          {/* {currentLanguage === 'en' ? `Copyright © ${currentYear} - ...` : `Direitos de Autor © ${currentYear} - ...`} */}
      </p>
      {/* You could add other links or info here if desired */}
    </footer>
  );
}

export default Footer;