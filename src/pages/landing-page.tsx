"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Trophy, BarChart2, Zap, Shield, Star } from "lucide-react"

// Define types for form data
interface FormData {
  riotId: string
  tagline: string
  region: string
  predictionType: string
}

export default function LandingPage() {
  const [formData, setFormData] = useState<FormData>({
    riotId: "",
    tagline: "",
    region: "",
    predictionType: "current",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // This would redirect to the main prediction page
    window.location.href = "/predict"
  }

  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#17313A] bg-[#091428]/95 backdrop-blur supports-[backdrop-filter]:bg-[#091428]/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[#C89B3C]" />
            <span className="text-xl font-bold">LoL Predictor</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-[#C89B3C]">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-[#C89B3C]">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-[#C89B3C]">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm font-medium transition-colors hover:text-[#C89B3C]">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex px-4 py-2 border border-[#C89B3C] text-[#C89B3C] rounded hover:bg-[#C89B3C] hover:text-[#091428] transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428] rounded flex items-center">
              Get Started
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=800&width=1920"
              alt="League of Legends Champions"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1428]"></div>
          </div>

          <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Predict Your <span className="text-[#0AC8B9]">League</span> Matches Before They Begin
                </h1>
                <p className="text-lg text-gray-300 max-w-[600px]">
                  Our advanced AI analyzes your gameplay data to predict match outcomes with incredible accuracy. Gain
                  the edge you need to climb the ranks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428] text-lg py-3 px-6 rounded flex items-center">
                    Try It Now
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </button>
                  <button className="border border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#091428] text-lg py-3 px-6 rounded transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl shadow-[#0AC8B9]/20">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="League of Legends Gameplay"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-black/50 border border-white/50 hover:bg-black/70 hover:scale-110 transition-all flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="sr-only">Play video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#091428] py-12">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-[#C89B3C]">95%</p>
                <p className="text-gray-400">Prediction Accuracy</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-[#C89B3C]">1M+</p>
                <p className="text-gray-400">Matches Analyzed</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-[#C89B3C]">50K+</p>
                <p className="text-gray-400">Active Users</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-[#C89B3C]">200+</p>
                <p className="text-gray-400">Regions Covered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-[#0A1428]">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Prediction Tool?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our advanced machine learning algorithms analyze thousands of data points to give you the most accurate
                predictions possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <BarChart2 className="h-12 w-12 text-[#0AC8B9]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Advanced Analytics</h3>
                <p className="text-gray-300">
                  Our system analyzes player performance, champion matchups, team compositions, and historical data to
                  provide accurate predictions.
                </p>
              </div>

              <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <Zap className="h-12 w-12 text-[#0AC8B9]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Real-Time Updates</h3>
                <p className="text-gray-300">
                  Get predictions for your current match or analyze your last game with our real-time processing system.
                </p>
              </div>

              <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <Shield className="h-12 w-12 text-[#0AC8B9]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Secure & Reliable</h3>
                <p className="text-gray-300">
                  Your data is secure with us. We use official Riot APIs and never store your personal information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-[#091428]">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Getting your match prediction is simple and takes just a few seconds.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0AC8B9] text-[#091428] flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg mt-8 pt-8">
                  <h3 className="text-xl font-bold text-white mb-2">Enter Your Details</h3>
                  <p className="text-gray-300">
                    Provide your Riot ID, tagline, and select your region. Choose whether you want a prediction for your
                    current or last match.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0AC8B9] text-[#091428] flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg mt-8 pt-8">
                  <h3 className="text-xl font-bold text-white mb-2">Our AI Analyzes</h3>
                  <p className="text-gray-300">
                    Our advanced machine learning model analyzes your match data, player statistics, and team
                    compositions.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0AC8B9] text-[#091428] flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg mt-8 pt-8">
                  <h3 className="text-xl font-bold text-white mb-2">Get Your Prediction</h3>
                  <p className="text-gray-300">
                    Receive a detailed prediction with win probability, key factors influencing the outcome, and tips to
                    improve your chances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20 bg-[#0A1428]">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Watch how our prediction tool works and how it can help you improve your gameplay.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto h-[500px] rounded-lg overflow-hidden shadow-2xl shadow-[#0AC8B9]/20">
              <Image
                src="/placeholder.svg?height=500&width=900"
                alt="League of Legends Gameplay"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-black/50 border border-white/50 hover:bg-black/70 hover:scale-110 transition-all flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="sr-only">Play video</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-[#091428]">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join thousands of satisfied players who have improved their gameplay with our predictions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">
                  "This tool helped me climb from Silver to Platinum in just one month! The predictions are incredibly
                  accurate and the tips helped me improve my gameplay."
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                    D
                  </div>
                  <div>
                    <div className="font-semibold">DariusMain99</div>
                    <div className="text-sm text-gray-400">Diamond II</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">
                  "As a support main, I was struggling to carry games. This tool showed me which matchups favor my
                  champion pool and when to pick what. Game changer!"
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                    L
                  </div>
                  <div>
                    <div className="font-semibold">LuxSupport</div>
                    <div className="text-sm text-gray-400">Platinum III</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">
                  "I was skeptical at first, but the accuracy of these predictions is mind-blowing. It's like having a
                  coach analyze your games in real-time."
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                    Y
                  </div>
                  <div>
                    <div className="font-semibold">YasuoOrAFK</div>
                    <div className="text-sm text-gray-400">Gold I</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Try It Now Section */}
        <section className="py-20 bg-[#0A1428]">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0E2029] to-[#17313A] rounded-lg p-8 md:p-12 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ready to Predict Your Next Match?</h2>
                  <p className="text-gray-300 mb-6">
                    Enter your details below to get started with your first prediction. It's free and takes just a few
                    seconds.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Riot ID"
                      value={formData.riotId}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, riotId: e.target.value })
                      }
                      required
                      className="w-full p-3 bg-[#091428] border border-[#17313A] text-white rounded focus:outline-none focus:border-[#0AC8B9]"
                    />
                    <input
                      type="text"
                      placeholder="Tagline"
                      value={formData.tagline}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, tagline: e.target.value })
                      }
                      required
                      className="w-full p-3 bg-[#091428] border border-[#17313A] text-white rounded focus:outline-none focus:border-[#0AC8B9]"
                    />
                    <select
                      value={formData.region}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFormData({ ...formData, region: e.target.value })
                      }
                      required
                      className="w-full p-3 bg-[#091428] border border-[#17313A] text-white rounded focus:outline-none focus:border-[#0AC8B9]"
                    >
                      <option value="">Select Region</option>
                      <option value="na1">North America (NA)</option>
                      <option value="euw1">Europe West (EUW)</option>
                      <option value="eun1">Europe Nordic & East (EUNE)</option>
                      <option value="kr">Korea (KR)</option>
                      <option value="br1">Brazil (BR)</option>
                      <option value="la1">Latin America North (LAN)</option>
                      <option value="la2">Latin America South (LAS)</option>
                      <option value="oc1">Oceania (OCE)</option>
                      <option value="ru">Russia (RU)</option>
                      <option value="tr1">Turkey (TR)</option>
                      <option value="jp1">Japan (JP)</option>
                    </select>
                    <select
                      value={formData.predictionType}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setFormData({ ...formData, predictionType: e.target.value })
                      }
                      required
                      className="w-full p-3 bg-[#091428] border border-[#17313A] text-white rounded focus:outline-none focus:border-[#0AC8B9]"
                    >
                      <option value="current">Current Match Prediction</option>
                      <option value="last">Last Match Prediction</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full p-3 bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428] rounded font-medium"
                    >
                      Get Prediction
                    </button>
                  </form>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="League of Legends Champion"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-[#091428]">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Got questions? We've got answers. If you don't see your question here, feel free to contact us.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 group">
                <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center">
                  How accurate are the predictions?
                  <span className="transition group-open:rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="text-gray-300 mt-3">
                  Our prediction model has been trained on millions of matches and achieves an accuracy rate of
                  approximately 95%. However, League of Legends is a complex game with many variables, so no prediction
                  can be 100% accurate.
                </div>
              </details>

              <details className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 group">
                <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center">
                  Is this approved by Riot Games?
                  <span className="transition group-open:rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="text-gray-300 mt-3">
                  Our service uses the official Riot Games API and complies with their terms of service. However, we are
                  not affiliated with or endorsed by Riot Games.
                </div>
              </details>

              <details className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 group">
                <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center">
                  Do I need to create an account?
                  <span className="transition group-open:rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="text-gray-300 mt-3">
                  No, you don't need to create an account to use our basic prediction service. However, creating an
                  account allows you to save your match history, track your progress, and access advanced features.
                </div>
              </details>

              <details className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 group">
                <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center">
                  Which regions are supported?
                  <span className="transition group-open:rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="text-gray-300 mt-3">
                  We support all major regions including NA, EUW, EUNE, KR, BR, LAN, LAS, OCE, RU, TR, and JP. If your
                  region is not listed, please contact us.
                </div>
              </details>

              <details className="bg-[#0E2029] border border-[#17313A] rounded-lg p-6 group">
                <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center">
                  Is there a premium version?
                  <span className="transition group-open:rotate-180">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="text-gray-300 mt-3">
                  Yes, our premium version offers more detailed analytics, champion-specific recommendations, team
                  composition analysis, and unlimited predictions. Free users are limited to 5 predictions per day.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-[#0A1428]">
          <div className="container px-4 text-center mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Climb the Ranks?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of players who are already using our prediction tool to improve their gameplay and climb
              the ranked ladder.
            </p>
            <button className="bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428] text-lg py-3 px-6 rounded flex items-center mx-auto">
              Get Started Now
              <ChevronRight className="ml-1 h-5 w-5" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#091428] border-t border-[#17313A] py-12">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-[#C89B3C]" />
                <span className="text-xl font-bold">LoL Predictor</span>
              </div>
              <p className="text-gray-400">
                Advanced match prediction for League of Legends players. Improve your gameplay and climb the ranks.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-[#0AC8B9]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-gray-400 hover:text-[#0AC8B9]">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-gray-400 hover:text-[#0AC8B9]">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-gray-400 hover:text-[#0AC8B9]">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#0AC8B9]">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#0AC8B9]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#0AC8B9]">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#0AC8B9]">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#0AC8B9]">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#0AC8B9]">
                    Reddit
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#0AC8B9]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#17313A] text-center text-gray-400">
            <p>© {new Date().getFullYear()} LoL Predictor. All rights reserved.</p>
            <p className="mt-2 text-sm">
              LoL Predictor isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or
              anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games
              are trademarks or registered trademarks of Riot Games, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

