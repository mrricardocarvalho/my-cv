// src/components/MainContent.tsx
import { useState } from 'react'; // Import useState
// We keep section imports here for now, but they won't be conditionally rendered by this component anymore after routing is added
import SummarySection from './SummarySection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import CompetenciesSection from './CompetenciesSection';
import ProjectsSection from './ProjectsSection.i18n';
import BlogSection from './BlogSection.i18n';
// Import nav data and labels
import { mainNavItems } from '../data/nav'; // Adjust import if data is defined locally

interface MainContentProps {
    currentLanguage: 'en' | 'pt';
    // We remove activeSection and onNavClick props for now, manage locally
}

function MainContent(props: MainContentProps) {
    const { currentLanguage } = props;
    // --- START: Local state for active section (TEMPORARY - will be replaced by routing) ---
    const [activeSection, setActiveSection] = useState('resume');

    const handleNavClick = (sectionId: string) => {
        setActiveSection(sectionId);
        console.log("Navigating to (local state):", sectionId);
    };
    // --- END: Local state ---

    return (
        // Main content container styling: White background, padding (REMOVED default p-6), rounded, shadow.
        // Added 'relative' for positioning context if needed.
        <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
            {/* --- START: Sticky Navigation Bar --- */}
            {/* Sticky positioning relative to nearest scroll ancestor. */}
            {/* Background, border for separation, padding for the outer sticky container */}
            <div className="sticky top-0 z-40 bg-white px-4 sm:px-6 py-3 border-b border-gray-200">
                 {/* Inner container for rounded corners and background for the buttons */}
                 <nav className="flex items-center justify-around bg-gray-100 rounded-lg p-1">
                    {mainNavItems.map(item => (
                        <button // Using buttons as routing isn't implemented here yet
                            key={item.id}
                            onClick={() => handleNavClick(item.id)} // Use local handler
                            // Styling for active/inactive states
                            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium text-center transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
                                ${activeSection === item.id
                                    ? 'bg-white text-gray-900 shadow-sm font-semibold' // Active style
                                    : 'text-gray-500 hover:text-gray-800' // Inactive style
                                }`
                            }
                            aria-current={activeSection === item.id ? 'page' : undefined}
                        >
                            {item.label[currentLanguage]}
                        </button>
                    ))}
                </nav>
            </div>
            {/* --- END: Sticky Navigation Bar --- */}


            {/* --- START: Content Area Below Nav --- */}
            {/* Add padding here for the content itself */}
            <div className="p-2 sm:p-4 md:p-6">
                <SummarySection />
                <ExperienceSection />
                <EducationSection />
                <CompetenciesSection />
                <ProjectsSection />
                <BlogSection />
                {/* Add dummy content if needed */}
                {/* <div className="h-screen bg-red-100">Scroll Test Space 1</div> */}
                {/* <div className="h-screen bg-blue-100">Scroll Test Space 2</div> */}

            </div>
             {/* --- END: Content Area Below Nav --- */}

        </div> // End of main content container
    );
}

export default MainContent;