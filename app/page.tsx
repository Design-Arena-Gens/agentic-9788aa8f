'use client';

import { useState } from 'react';
import { neetSyllabus } from '@/lib/neet-syllabus';
import { BookOpen, Brain, FlaskConical, Atom } from 'lucide-react';

export default function Home() {
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'notes' | 'flashcards' | 'quiz'>('notes');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const subjectIcons: Record<string, any> = {
    'physics-11': Atom,
    'physics-12': Atom,
    'chemistry-11': FlaskConical,
    'chemistry-12': FlaskConical,
    'biology-11': Brain,
    'biology-12': Brain,
  };

  const currentSubject = neetSyllabus.find(s => s.id === selectedSubject);
  const currentChapter = currentSubject?.chapters.find(c => c.id === selectedChapter);
  const currentTopic = currentChapter?.topics.find(t => t.id === selectedTopic);

  const resetView = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
    setSelectedTopic(null);
    setViewMode('notes');
    setQuizAnswers({});
    setShowResults(false);
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!currentTopic) return { correct: 0, total: 0 };
    const total = currentTopic.quiz.length;
    const correct = currentTopic.quiz.filter(q => quizAnswers[q.id] === q.correctAnswer).length;
    return { correct, total };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-indigo-900 mb-2">
                {language === 'hi' ? 'NEET UG तैयारी ऐप' : 'NEET UG Preparation App'}
              </h1>
              <p className="text-gray-600">
                {language === 'hi'
                  ? 'भौतिकी, रसायन विज्ञान और जीव विज्ञान की पूर्ण तैयारी'
                  : 'Complete preparation for Physics, Chemistry, and Biology'}
              </p>
            </div>
            <button
              onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              {language === 'hi' ? 'English' : 'हिंदी'}
            </button>
          </div>
        </header>

        {/* Subject Selection */}
        {!selectedSubject && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neetSyllabus.map(subject => {
              const Icon = subjectIcons[subject.id];
              return (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-indigo-100 p-6 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors">
                      <Icon className="w-12 h-12 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {language === 'hi' ? subject.name : subject.nameEn}
                    </h2>
                    <p className="text-gray-600">{subject.class}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Chapter Selection */}
        {selectedSubject && !selectedChapter && currentSubject && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-900">
                {language === 'hi' ? currentSubject.name : currentSubject.nameEn} - {currentSubject.class}
              </h2>
              <button
                onClick={resetView}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {currentSubject.chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter.id)}
                  className="text-left bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl hover:shadow-md transition-all border-2 border-transparent hover:border-indigo-300"
                >
                  <div className="flex items-start">
                    <span className="text-3xl font-bold text-indigo-300 mr-4">{index + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {language === 'hi' ? chapter.title : chapter.titleEn}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {chapter.topics.length} {language === 'hi' ? 'विषय' : 'topics'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Topic Selection */}
        {selectedChapter && !selectedTopic && currentChapter && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-900">
                {language === 'hi' ? currentChapter.title : currentChapter.titleEn}
              </h2>
              <button
                onClick={() => setSelectedChapter(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
              </button>
            </div>
            <div className="space-y-4">
              {currentChapter.topics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className="w-full text-left bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-md transition-all border-2 border-transparent hover:border-indigo-300"
                >
                  <div className="flex items-start">
                    <span className="text-2xl font-bold text-indigo-400 mr-4">{index + 1}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {language === 'hi' ? topic.title : topic.titleEn}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>{topic.flashcards.length} {language === 'hi' ? 'फ्लैशकार्ड' : 'flashcards'}</span>
                        <span>{topic.quiz.length} {language === 'hi' ? 'प्रश्न' : 'questions'}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Topic Content */}
        {selectedTopic && currentTopic && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-900">
                {language === 'hi' ? currentTopic.title : currentTopic.titleEn}
              </h2>
              <button
                onClick={() => {
                  setSelectedTopic(null);
                  setViewMode('notes');
                  setQuizAnswers({});
                  setShowResults(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {language === 'hi' ? 'वापस जाएं' : 'Go Back'}
              </button>
            </div>

            {/* View Mode Selector */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setViewMode('notes')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  viewMode === 'notes'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BookOpen className="inline-block w-5 h-5 mr-2" />
                {language === 'hi' ? 'नोट्स' : 'Notes'}
              </button>
              <button
                onClick={() => setViewMode('flashcards')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  viewMode === 'flashcards'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {language === 'hi' ? 'फ्लैशकार्ड' : 'Flashcards'}
              </button>
              <button
                onClick={() => {
                  setViewMode('quiz');
                  setQuizAnswers({});
                  setShowResults(false);
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  viewMode === 'quiz'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {language === 'hi' ? 'क्विज़' : 'Quiz'}
              </button>
            </div>

            {/* Notes View */}
            {viewMode === 'notes' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-indigo-900 mb-4">
                    {language === 'hi' ? 'विस्तृत विवरण' : 'Detailed Explanation'}
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {language === 'hi' ? currentTopic.explanation : currentTopic.explanationEn}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">
                    {language === 'hi' ? 'मुख्य बिंदु' : 'Key Points'}
                  </h3>
                  <ul className="space-y-3">
                    {(language === 'hi' ? currentTopic.keyPoints : currentTopic.keyPointsEn).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">●</span>
                        <span className="text-gray-800 text-lg">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Flashcards View */}
            {viewMode === 'flashcards' && (
              <div className="space-y-6">
                {currentTopic.flashcards.map((card, index) => (
                  <FlashcardComponent key={card.id} card={card} index={index} language={language} />
                ))}
              </div>
            )}

            {/* Quiz View */}
            {viewMode === 'quiz' && (
              <div className="space-y-6">
                {!showResults ? (
                  <>
                    {currentTopic.quiz.map((question, index) => (
                      <div key={question.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-purple-900 mb-4">
                          {language === 'hi' ? 'प्रश्न' : 'Question'} {index + 1}
                        </h3>
                        <p className="text-gray-800 text-lg mb-4">
                          {language === 'hi' ? question.question : question.questionEn}
                        </p>
                        <div className="space-y-3">
                          {(language === 'hi' ? question.options : question.optionsEn).map((option, optIndex) => (
                            <button
                              key={optIndex}
                              onClick={() => setQuizAnswers({ ...quizAnswers, [question.id]: optIndex })}
                              className={`w-full text-left p-4 rounded-lg transition-all ${
                                quizAnswers[question.id] === optIndex
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-white hover:bg-gray-100'
                              }`}
                            >
                              <span className="font-semibold mr-3">{String.fromCharCode(65 + optIndex)}.</span>
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length !== currentTopic.quiz.length}
                      className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {language === 'hi' ? 'जमा करें' : 'Submit'}
                    </button>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl text-center">
                      <h3 className="text-3xl font-bold text-green-900 mb-4">
                        {language === 'hi' ? 'परिणाम' : 'Results'}
                      </h3>
                      <p className="text-5xl font-bold text-green-700 mb-2">
                        {calculateScore().correct}/{calculateScore().total}
                      </p>
                      <p className="text-xl text-gray-700">
                        {Math.round((calculateScore().correct / calculateScore().total) * 100)}%
                      </p>
                    </div>
                    {currentTopic.quiz.map((question, index) => (
                      <div key={question.id} className={`p-6 rounded-xl ${
                        quizAnswers[question.id] === question.correctAnswer
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50'
                          : 'bg-gradient-to-r from-red-50 to-orange-50'
                      }`}>
                        <h3 className="text-xl font-bold mb-2">
                          {language === 'hi' ? 'प्रश्न' : 'Question'} {index + 1}
                        </h3>
                        <p className="text-gray-800 text-lg mb-4">
                          {language === 'hi' ? question.question : question.questionEn}
                        </p>
                        <div className="space-y-2 mb-4">
                          {(language === 'hi' ? question.options : question.optionsEn).map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-lg ${
                                optIndex === question.correctAnswer
                                  ? 'bg-green-200 font-semibold'
                                  : quizAnswers[question.id] === optIndex
                                  ? 'bg-red-200'
                                  : 'bg-white'
                              }`}
                            >
                              <span className="font-semibold mr-3">{String.fromCharCode(65 + optIndex)}.</span>
                              {option}
                              {optIndex === question.correctAnswer && (
                                <span className="ml-2 text-green-700">✓ {language === 'hi' ? 'सही' : 'Correct'}</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="font-semibold text-blue-900 mb-2">
                            {language === 'hi' ? 'व्याख्या:' : 'Explanation:'}
                          </p>
                          <p className="text-gray-800">
                            {language === 'hi' ? question.explanation : question.explanationEn}
                          </p>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setShowResults(false);
                      }}
                      className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
                    >
                      {language === 'hi' ? 'फिर से प्रयास करें' : 'Try Again'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FlashcardComponent({ card, index, language }: { card: any; index: number; language: 'hi' | 'en' }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="cursor-pointer perspective-1000"
    >
      <div
        className={`relative w-full h-64 transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 flex flex-col justify-center backface-hidden shadow-lg">
          <p className="text-white text-2xl font-semibold text-center">
            {language === 'hi' ? card.question : card.questionEn}
          </p>
          <p className="text-indigo-100 text-center mt-4">
            {language === 'hi' ? 'उत्तर देखने के लिए क्लिक करें' : 'Click to see answer'}
          </p>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-8 flex flex-col justify-center backface-hidden shadow-lg rotate-y-180">
          <p className="text-white text-xl text-center">
            {language === 'hi' ? card.answer : card.answerEn}
          </p>
          <p className="text-green-100 text-center mt-4">
            {language === 'hi' ? 'प्रश्न देखने के लिए क्लिक करें' : 'Click to see question'}
          </p>
        </div>
      </div>
    </div>
  );
}
