import React, { useState, useCallback } from 'react';
import { Upload, Brain, FileText } from 'lucide-react';

const ResumeUpload = ({ onResumeAnalyzed, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return;
    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    setUploadedFile(file);
    
    try {
      const text = await extractTextFromFile(file);
      const skills = extractSkillsFromText(text);
      const predictedRoles = predictJobRoles(skills, text);
      
      onResumeAnalyzed(predictedRoles, skills);
    } catch (error) {
      console.error('Error processing resume:', error);
      alert('Error processing resume. Please try again.');
    }
  };

  const extractTextFromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target.result;
        resolve(text);
      };
      
      reader.onerror = (e) => reject(e);
      
      reader.readAsText(file);
    });
  };

  const extractSkillsFromText = (text) => {
    const commonSkills = [
      'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript', 'HTML', 'CSS',
      'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git',
      'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Pandas',
      'Angular', 'Vue.js', 'Express.js', 'Spring Boot', 'Django', 'Flask',
      'Redux', 'GraphQL', 'REST API', 'Microservices', 'DevOps', 'CI/CD',
      'Figma', 'Adobe', 'Photoshop', 'Illustrator', 'UI/UX', 'Design',
      'Project Management', 'Agile', 'Scrum', 'JIRA', 'Leadership'
    ];

    const foundSkills = commonSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );

    return foundSkills;
  };

  const predictJobRoles = (skills, text) => {
    const roles = [];
    const lowerText = text.toLowerCase();

    // Frontend roles
    if (skills.some(skill => ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Angular', 'Vue.js'].includes(skill))) {
      roles.push('Frontend Developer');
      roles.push('React Developer');
    }

    // Backend roles
    if (skills.some(skill => ['Node.js', 'Python', 'Java', 'Spring Boot', 'Django', 'Flask', 'Express.js'].includes(skill))) {
      roles.push('Backend Developer');
      roles.push('Full Stack Developer');
    }

    // Data roles
    if (skills.some(skill => ['Python', 'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Pandas', 'SQL'].includes(skill))) {
      roles.push('Data Scientist');
      roles.push('Machine Learning Engineer');
      roles.push('Data Analyst');
    }

    // DevOps roles
    if (skills.some(skill => ['AWS', 'Docker', 'Kubernetes', 'DevOps', 'CI/CD'].includes(skill))) {
      roles.push('DevOps Engineer');
      roles.push('Cloud Engineer');
    }

    // Design roles
    if (skills.some(skill => ['Figma', 'Adobe', 'Photoshop', 'Illustrator', 'UI/UX', 'Design'].includes(skill))) {
      roles.push('UI/UX Designer');
      roles.push('Product Designer');
    }

    // Management roles
    if (skills.some(skill => ['Project Management', 'Agile', 'Scrum', 'Leadership'].includes(skill)) || 
        lowerText.includes('manager') || lowerText.includes('lead')) {
      roles.push('Product Manager');
      roles.push('Project Manager');
    }

    return roles.length > 0 ? roles : ['Software Developer'];
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800"> Job Matching Platform</h3>
        </div>
        
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isAnalyzing}
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              {isAnalyzing ? (
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              ) : (
                <Upload className="h-12 w-12 text-gray-400" />
              )}
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                {isAnalyzing ? 'Analyzing Resume...' : 'Upload Your Resume'}
              </p>
              <p className="text-gray-500">
                {isAnalyzing 
                  ? 'Our AI is extracting skills and predicting job roles'
                  : 'Drag & drop your resume or click to browse (PDF, DOC, DOCX, TXT)'
                }
              </p>
            </div>

            {uploadedFile && !isAnalyzing && (
              <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">{uploadedFile.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;