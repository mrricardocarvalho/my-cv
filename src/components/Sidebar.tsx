import {
    contactInfo,
    labels,
    summaryText,
    keyTechnicalSkills,
} from '../cv-data';

// Define props for language and toggle handler
interface SidebarProps {
    currentLanguage: 'en' | 'pt';
    onToggleLanguage: () => void;
    activePath: string;
}

// Pre-defined titles (can be moved to cv-data if preferred)
const titles = {
    en: "Senior D365 BC Developer",
    pt: "Developer Sénior D365 BC"
};

// Access the base path Vite is configured with
const BASE_URL = import.meta.env.BASE_URL;

function Sidebar(props: SidebarProps) {
    const { currentLanguage, onToggleLanguage } = props;

    return (
        // Main Sidebar container: Rounded corners, shadow, white background
        <aside className="bg-white rounded-lg shadow-lg sticky top-8 overflow-hidden">

            {/* --- START: Profile Header Section --- */}
            {/* Container for background image */}
            <div className="relative"> {/* Removed mb-6, spacing handled by padding below */}
                {/* Background Image */}
                <img
                    src={`${BASE_URL}background.jpg`}
                    alt="Header background"
                    className="w-full h-32 object-cover" // Height of the banner
                />
                {/* Profile Image Overlay */}
                <div className="absolute bottom-0 left-4 transform translate-y-1/2">
                     {/* Simple white border directly on image */}
                    <img
                        src={`${BASE_URL}profile.png`}
                        alt="Ricardo Carvalho"
                        // Adjusted size slightly, added explicit white border matching demo
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                </div>
            </div>

            {/* Text Content Below Images */}
            {/* Increased top padding to pt-14 (half of w-24/h-24 = 3rem = 12 + extra space) */}
            <div className="pt-14 px-6 pb-4"> {/* Reduced bottom padding */}
                 {/* Name and Status Indicator */}
                <div className="flex items-center mb-1">
                    <h1 className="text-xl font-bold text-gray-900 mr-2">Ricardo Carvalho</h1> {/* Darker text */}
                    <span className="flex h-2.5 w-2.5 relative" title="Actively looking / Available"> {/* Slightly smaller dot */}
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                </div>
                {/* Profession and Location */}
                <div className="text-sm text-gray-500 font-medium">
                    <span>{titles[currentLanguage]}</span>
                    <span className="mx-1.5">·</span>
                    <span>{contactInfo.location}</span>
                </div>
            </div>
            {/* --- END: Profile Header Section --- */}


             {/* --- START: Inner "Card" for Summary & Skills --- */}
             {/* Added border-t, padding is internal */}
             <div className="border-t border-gray-100 px-6 py-4"> {/* Lighter border, less vertical padding */}

                 {/* Professional Summary Text (No Heading) */}
                 <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {summaryText[currentLanguage]}
                </p>

                 {/* Key Technical Skills Badges (No Heading) */}
                 <div className="flex flex-wrap gap-2">
                    {keyTechnicalSkills.map(skill => (
                        // Styling matches demo: light gray bg, dark text, small padding/rounding
                        <span key={skill} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{skill}</span>
                    ))}
                </div>
             </div>
             {/* --- END: Inner "Card" --- */}


            {/* Contact Icons Section */}
            {/* Consistent padding and border */}
            <div className="text-center border-t border-gray-100 py-4 px-6"> {/* Lighter border, adjusted padding */}
                <ul className="flex justify-center space-x-5">
                   {/* Email */}
                    <li title={contactInfo.email}>
                        <a href={`mailto:${contactInfo.email}`} className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label="Send Email">
                            <i className="fas fa-envelope fa-lg"></i>
                        </a>
                    </li>
                    {/* LinkedIn */}
                    <li title={labels.linkedinLinkText[currentLanguage]}>
                        <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label={labels.linkedinLinkText[currentLanguage]}>
                            <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                    </li>
                    {/* GitHub */}
                    {contactInfo.githubUrl && (
                        <li title={labels.githubLinkText?.[currentLanguage] ?? 'GitHub Profile'}>
                            <a href={contactInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label={labels.githubLinkText?.[currentLanguage] ?? 'GitHub Profile'}>
                                <i className="fab fa-github fa-lg"></i>
                            </a>
                        </li>
                    )}
                </ul>
            </div>

            {/* Languages Section */}
            {/* Consistent padding and border */}
{/*              <div className="border-t border-gray-100 py-4 px-6">
                 <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 tracking-wider">
                     {labels.languages[currentLanguage]}
                 </h3>
                 <ul className="text-sm text-gray-700 space-y-1">
                    {languages.map((lang: LanguageType) => (
                        <li key={lang.id}>
                            <span className='font-medium text-gray-800'>{lang.name[currentLanguage]}:</span> {lang.level[currentLanguage]}
                        </li>
                     ))}
                 </ul>
            </div> */}

             {/* Language Toggle */}
             {/* Consistent padding and border */}
             <div className="border-t border-gray-100 py-4 px-6 text-center"> {/* Lighter border, adjusted padding */}
                 <div className="inline-flex items-center space-x-2">
                     <span className="text-xs font-medium text-gray-500">EN</span>
                     <input
                         type="checkbox"
                         className="toggle toggle-sm toggle-primary align-middle"
                         checked={currentLanguage === 'pt'}
                         onChange={onToggleLanguage}
                         aria-label="Toggle Language"
                     />
                     <span className="text-xs font-medium text-gray-500">PT</span>
                 </div>
            </div>

        </aside>
    );
}

export default Sidebar;