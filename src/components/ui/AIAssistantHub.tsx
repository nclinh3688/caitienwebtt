'use client';

import React, { useState, useEffect } from 'react';
import { SharedCard, cn, styles } from './SharedUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaRobot,
  FaComments,
  FaLightbulb,
  FaGraduationCap,
  FaChartLine,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaMicrophone,
  FaPlay,
  FaPause,
  FaStop,
  FaVolumeUp,
  FaSync,
  FaPaperPlane,
  FaHistory,
  FaCog,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaStar
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// 🤖 AI ASSISTANT CHAT
export function AIAssistantChat({ 
  context = 'general',
  onSuggestionSelect 
}: {
  context?: 'lesson' | 'test' | 'general' | 'pronunciation';
  onSuggestionSelect?: (suggestion: string) => void;
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hi! I\'m your AI learning assistant. How can I help you today?',
      timestamp: new Date(),
      suggestions: ['Help with grammar', 'Practice pronunciation', 'Study plan', 'Test preparation']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const contextPrompts = {
    lesson: "I can help explain concepts, provide examples, or suggest practice exercises for this lesson.",
    test: "I can help you prepare for tests, explain answers, or suggest study strategies.",
    pronunciation: "I can analyze your pronunciation and provide feedback to improve your accent.",
    general: "I'm here to help with any aspect of your language learning journey!"
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content,
      timestamp: new Date(),
      suggestions: []
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai' as const,
        content: generateAIResponse(content),
        timestamp: new Date(),
        suggestions: generateSuggestions(content)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const responses = {
      grammar: "Great question about grammar! Let me break this down for you with examples and practice exercises.",
      pronunciation: "I'd be happy to help with pronunciation. Try speaking slowly and focus on the mouth position.",
      study: "Here's a personalized study plan based on your current progress and learning goals.",
      test: "For test preparation, I recommend focusing on your weak areas. Let's create a targeted practice session."
    };

    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('grammar')) return responses.grammar;
    if (lowerInput.includes('pronunciation')) return responses.pronunciation;
    if (lowerInput.includes('study') || lowerInput.includes('plan')) return responses.study;
    if (lowerInput.includes('test') || lowerInput.includes('exam')) return responses.test;
    
    return "I understand you're asking about language learning. Could you be more specific so I can provide better assistance?";
  };

  const generateSuggestions = (userInput: string) => {
    return ['Tell me more', 'Show examples', 'Practice now', 'Different approach'];
  };

  const startVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setInputMessage("How do I use particles in Japanese?");
    }, 3000);
  };

  return (
    <SharedCard className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <HiSparkles className="text-white" />
            </div>
            <div>
              <h3 className="font-bold">AI Learning Assistant</h3>
              <p className="text-sm text-gray-600 font-normal">{contextPrompts[context]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <FaCog />
            </Button>
            <Button size="sm" variant="outline">
              <FaHistory />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn(
              "flex gap-3",
              message.type === 'user' && "flex-row-reverse"
            )}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0",
                message.type === 'ai' 
                  ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white"
                  : "bg-gradient-to-br from-blue-500 to-green-500 text-white"
              )}>
                {message.type === 'ai' ? <HiSparkles /> : '👤'}
              </div>
              
              <div className={cn(
                "max-w-[80%] space-y-2",
                message.type === 'user' && "items-end"
              )}>
                <div className={cn(
                  "p-3 rounded-lg",
                  message.type === 'ai'
                    ? "bg-gray-100 text-gray-900"
                    : "bg-blue-500 text-white"
                )}>
                  <p className="text-sm">{message.content}</p>
                  <span className={cn(
                    "text-xs mt-1 block",
                    message.type === 'ai' ? "text-gray-500" : "text-blue-100"
                  )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                {/* AI Suggestions */}
                {message.type === 'ai' && message.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => onSuggestionSelect?.(suggestion)}
                        className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm">
                <HiSparkles />
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-6 pt-4 border-t">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                placeholder="Ask me anything about language learning..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-12"
              />
              <button
                onClick={startVoiceInput}
                className={cn(
                  "absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors",
                  isListening 
                    ? "bg-red-500 text-white animate-pulse"
                    : "text-gray-400 hover:text-purple-500"
                )}
              >
                <FaMicrophone />
              </button>
            </div>
            <Button 
              onClick={() => sendMessage(inputMessage)}
              className="bg-purple-500 hover:bg-purple-600"
              disabled={!inputMessage.trim()}
            >
              <FaPaperPlane />
            </Button>
          </div>
        </div>
      </CardContent>
    </SharedCard>
  );
}

// 💡 AI LEARNING INSIGHTS
export function AILearningInsights({ userProgress }: { userProgress?: any }) {
  const insights = [
    {
      type: 'strength',
      title: 'Strong in Vocabulary',
      description: 'You\'ve mastered 85% of N5 vocabulary words',
      icon: FaBookOpen,
      color: 'green',
      action: 'Continue to N4 vocab'
    },
    {
      type: 'weakness',
      title: 'Grammar Needs Practice',
      description: 'Focus on particle usage - は vs が',
      icon: FaPen,
      color: 'orange',
      action: 'Practice grammar'
    },
    {
      type: 'suggestion',
      title: 'Listening Improvement',
      description: 'Try conversation practice sessions',
      icon: FaHeadphones,
      color: 'blue',
      action: 'Start listening'
    },
    {
      type: 'achievement',
      title: 'Consistency Streak',
      description: '7 days of daily practice! Keep it up!',
      icon: FaChartLine,
      color: 'purple',
      action: 'View achievements'
    }
  ];

  const colorClasses = {
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-red-500',
    blue: 'from-blue-500 to-purple-500',
    purple: 'from-purple-500 to-pink-500'
  };

  return (
    <SharedCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaChartLine className="text-purple-500" />
          AI Learning Insights
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br",
              colorClasses[insight.color as keyof typeof colorClasses]
            )}>
              <insight.icon />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
              <Button size="sm" variant="outline" className="text-xs">
                {insight.action}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </SharedCard>
  );
}

// 🎯 AI STUDY RECOMMENDATIONS
export function AIStudyRecommendations() {
  const recommendations = [
    {
      title: 'Daily Kanji Practice',
      description: 'Review 5 new kanji characters based on your current level',
      duration: '15 minutes',
      difficulty: 'Medium',
      priority: 'High',
      icon: FaPen
    },
    {
      title: 'Conversation Practice',
      description: 'Practice speaking with AI tutor about daily topics',
      duration: '20 minutes', 
      difficulty: 'Easy',
      priority: 'Medium',
      icon: FaComments
    },
    {
      title: 'Grammar Quiz',
      description: 'Test your understanding of particle usage',
      duration: '10 minutes',
      difficulty: 'Hard',
      priority: 'High',
      icon: FaQuestionCircle
    }
  ];

  const priorityColors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700'
  };

  return (
    <SharedCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaLightbulb className="text-yellow-500" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <rec.icon />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              </div>
              <Badge className={priorityColors[rec.priority as keyof typeof priorityColors]}>
                {rec.priority}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>⏱️ {rec.duration}</span>
                <span>📊 {rec.difficulty}</span>
              </div>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                <FaPlay className="mr-1" />
                Start
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </SharedCard>
  );
}

// 🔄 AI PROGRESS TRACKER
export function AIProgressTracker() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const progressData = {
    overall: 76,
    vocabulary: 85,
    grammar: 62,
    listening: 71,
    reading: 79,
    speaking: 68
  };

  const analyzeProgress = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <SharedCard>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaChartLine className="text-blue-500" />
            AI Progress Analysis
          </div>
          <Button 
            size="sm" 
            onClick={analyzeProgress}
            disabled={isAnalyzing}
            className="bg-purple-500 hover:bg-purple-600"
          >
            {isAnalyzing ? <FaSync className="animate-spin" /> : <HiSparkles />}
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiSparkles className="text-purple-500 text-xl animate-pulse" />
            </div>
            <p className="text-gray-600">AI is analyzing your learning patterns...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(progressData).map(([skill, progress]) => (
              <div key={skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{skill}</span>
                  <span className="text-sm text-gray-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </SharedCard>
  );
}