import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResumeUpload from './components/ResumeUpload';
import JobList from './components/JobList';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [topKeywords, setTopKeywords] = useState([]);
  const [predictedRoles, setPredictedRoles] = useState([]);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);

  const API_BASE_URL = 'http://localhost:8081/api/v1';

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('jobSearchHistory') || '[]');
    setSearchHistory(savedHistory);
  }, []);

  // Load top keywords on component mount
  useEffect(() => {
    const loadTopKeywords = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/search`);
        if (response.ok) {
          const data = await response.json();
          setTopKeywords(data);
        }
      } catch (err) {
        console.error('Error loading top keywords:', err);
      }
    };

    loadTopKeywords();
  }, []);

  // Save search history to localStorage
  const saveSearchHistory = (history) => {
    setSearchHistory(history);
    localStorage.setItem('jobSearchHistory', JSON.stringify(history));
  };

  // Log keyword to backend
  const logKeyword = async (keyword) => {
    try {
      await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });
    } catch (err) {
      console.error('Error logging keyword:', err);
    }
  };

  const searchJobs = async (query) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);

    // Update local search history
    const existingIndex = searchHistory.findIndex(term => term.toLowerCase() === query.toLowerCase());
    let newHistory;
    
    if (existingIndex >= 0) {
      newHistory = [query, ...searchHistory.filter((_, index) => index !== existingIndex)];
    } else {
      newHistory = [query, ...searchHistory.slice(0, 9)];
    }
    saveSearchHistory(newHistory);

    // Log keyword to backend
    await logKeyword(query);

    try {
      const response = await fetch(`${API_BASE_URL}/jobs?search=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'Failed to fetch jobs. Please try again.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeAnalyzed = async (roles, skills) => {
    setIsAnalyzingResume(true);
    setPredictedRoles(roles);
    
    // Automatically search for the first predicted role
    if (roles.length > 0) {
      await searchJobs(roles[0]);
    }
    
    setIsAnalyzingResume(false);
  };

  const clearSearchHistory = () => {
    saveSearchHistory([]);
  };

  // Load initial jobs on component mount
  useEffect(() => {
    const loadInitialJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        if (response.ok) {
          const data = await response.json();
          setJobs(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error loading initial jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Find Your Dream Job
            </h1>
            <p className="text-gray-600 text-lg">
              Upload your resume for AI-powered job matching or search thousands of opportunities
            </p>
          </div>

          {/* Resume Upload Section */}
          <ResumeUpload 
            onResumeAnalyzed={handleResumeAnalyzed}
            isAnalyzing={isAnalyzingResume}
          />

          {/* Search Bar */}
          <SearchBar 
            onSearch={searchJobs}
            searchHistory={searchHistory}
            onClearHistory={clearSearchHistory}
            topKeywords={topKeywords}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <JobList 
          jobs={jobs}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          predictedRoles={predictedRoles}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 Job Board. Find your next opportunity with AI-powered matching.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;