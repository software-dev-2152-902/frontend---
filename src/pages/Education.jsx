import React, { useState } from 'react';
import { BookOpenIcon, DocumentTextIcon, AcademicCapIcon, NewspaperIcon } from '@heroicons/react/24/outline';

const resources = {
    research: [
        {
            title: "Carbon Sequestration in Agroforestry Systems",
            authors: "Smith, J., et al.",
            journal: "Journal of Environmental Management",
            year: 2024,
            link: "https://www.sciencedirect.com/science/article/abs/pii/S0065211310080053",
            description: "Comprehensive analysis of carbon sequestration potential in various agroforestry systems worldwide."
        },
        {
            title: "Economic Benefits of Mixed Farming Practices",
            authors: "Johnson, M., Williams, R.",
            journal: "Agricultural Economics Review",
            year: 2024,
            link: "https://www.sciencedirect.com/science/article/pii/S1751731112000675",
            description: "Study on the financial advantages of implementing mixed farming and agroforestry practices."
        },
        {
            title: "Biodiversity Impact of Sustainable Farming",
            authors: "Anderson, K., et al.",
            journal: "Ecological Studies",
            year: 2023,
            link: "https://www.cbd.int/article/biodiversityforfood-2",
            description: "Analysis of biodiversity improvements in sustainable farming systems."
        }
    ],
    guides: [
        {
            title: "Getting Started with Agroforestry",
            type: "Beginner Guide",
            author: "Sustainable Farming Institute",
            link: "https://trees.org/our-work/?ace_campaign=google_search&.source=google&.medium=ppc&.campaign={campaign}&.term=agroforestry%20methods&.content=723373117604&.device=c&.campaign_id=21958515299&.adgroup_id=173954656249&.target_id=kwd-2379098325771&.matchtype=p&.network=g&.loc_physical=9189466&.loc_interest=&.feeditemid=&.target=&.placement=&gad_source=1&gclid=CjwKCAiAnKi8BhB0EiwA58DA4eHhW_mw6z48Wx7UFLrBe7sAa1aWn3lhi3m3Y7iHYY_GU1ZW0_KVzBoCABYQAvD_BwE",
            description: "Step-by-step guide for farmers transitioning to agroforestry systems."
        },
        {
            title: "Carbon Credit Markets: A Practical Guide",
            type: "Technical Guide",
            author: "Global Carbon Initiative",
            link: "https://www.zeigo.com/2024/10/01/free-guide-to-mastering-decarbonization/?utm_source=google&utm_medium=cpc&utm_purpose=marketo&utm_campaign=2024_july_us_ess_sustainability_google_consideration_sem_global-bu_zeigolitethoughtleadership&utm_term=What%20Are%20Carbon%20Credits&campaign_objective=consideration&mcl_name=sustainability&gad_source=1&gclid=CjwKCAiAnKi8BhB0EiwA58DA4eAhOyLRcqzE18TBRXC9vYDRqGRMlb-m1RwlaldQebcoKRfsD1QzLhoCvTkQAvD_BwE",
            description: "Understanding carbon credit markets and maximizing returns."
        },
        {
            title: "Soil Health in Mixed Farming Systems",
            type: "Technical Guide",
            author: "Agricultural Research Center",
            link: "https://www.cfeonline.org.uk/media/bbnpmso1/soil-health-initiative_managing-soils-mixed.pdf",
            description: "Best practices for maintaining soil health in mixed farming."
        }
    ],
    blogs: [
        {
            title: "The Future of Sustainable Farming",
            author: "EcoFarm Blog",
            date: "2024-01-15",
            link: "https://social-innovation.hitachi/en-us/think-ahead/manufacturing/sustainable-farming-through-technology/?utm_campaign=FY24US&utm_source=SEM&utm_medium=TLSF_Search&gad_source=1",
            description: "Exploring emerging trends in sustainable agriculture and agroforestry."
        },
        {
            title: "Success Stories: Small Farms Going Green",
            author: "Green Agriculture Today",
            date: "2024-01-10",
            link: "https://www.cbf.org/blogs/save-the-bay/farmer-success-stories.html",
            description: "Case studies of successful transitions to sustainable farming."
        },
        {
            title: "Technology in Modern Agroforestry",
            author: "AgTech Weekly",
            date: "2024-01-05",
            link: "https://news.mongabay.com/2019/07/agroforestry-an-ancient-indigenous-technology-with-wide-modern-appeal-commentary/",
            description: "How technology is revolutionizing agroforestry practices."
        }
    ]
};

export default function Education() {
    const [activeTab, setActiveTab] = useState('research');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-green-600 to-green-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white">Education Center</h1>
                        <p className="mt-3 max-w-2xl mx-auto text-green-100 sm:text-lg">
                            Read more about research papers, guides, and blogs that explore agroforestry and sustainable farming! Learn more as you dive deep into the environment all while being environmentally conscious!
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            onClick={() => setActiveTab('research')}
                            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'research'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <DocumentTextIcon className="h-5 w-5 mr-2" />
                            Research Papers
                        </button>
                        <button
                            onClick={() => setActiveTab('guides')}
                            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'guides'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <BookOpenIcon className="h-5 w-5 mr-2" />
                            Guides
                        </button>
                        <button
                            onClick={() => setActiveTab('blogs')}
                            className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'blogs'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <NewspaperIcon className="h-5 w-5 mr-2" />
                            Blog Posts
                        </button>
                    </div>

                    {activeTab === 'research' && (
                        <div className="space-y-6">
                            {resources.research.map((paper, index) => (
                                <div key={index} className="bg-white shadow rounded-lg p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                <a href={paper.link} className="hover:text-green-600">
                                                    {paper.title}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {paper.authors} • {paper.journal} • {paper.year}
                                            </p>
                                            <p className="mt-2 text-gray-700">{paper.description}</p>
                                        </div>
                                        <AcademicCapIcon className="h-6 w-6 text-green-600 ml-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'guides' && (
                        <div className="space-y-6">
                            {resources.guides.map((guide, index) => (
                                <div key={index} className="bg-white shadow rounded-lg p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    <a href={guide.link} className="hover:text-green-600">
                                                        {guide.title}
                                                    </a>
                                                </h3>
                                                <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                                    {guide.type}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">By {guide.author}</p>
                                            <p className="mt-2 text-gray-700">{guide.description}</p>
                                        </div>
                                        <BookOpenIcon className="h-6 w-6 text-green-600 ml-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'blogs' && (
                        <div className="space-y-6">
                            {resources.blogs.map((blog, index) => (
                                <div key={index} className="bg-white shadow rounded-lg p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                <a href={blog.link} className="hover:text-green-600">
                                                    {blog.title}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {blog.author} • {new Date(blog.date).toLocaleDateString()}
                                            </p>
                                            <p className="mt-2 text-gray-700">{blog.description}</p>
                                        </div>
                                        <NewspaperIcon className="h-6 w-6 text-green-600 ml-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}