"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, Trophy, BarChart2, Zap, Shield, Star } from "lucide-react"

export default function LandingPage() {
  const [formData, setFormData] = useState({
    riotId: "",
    tagline: "",
    region: "",
    predictionType: "current",
  })
  const [playVideo, setPlayVideo] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      riot_user_name: formData.riotId,   
      riot_tag_line: formData.tagline,     
      region: formData.region,                   
      prediction_type: formData.predictionType, 
    };
  
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Prediction Result:", result);
        setPredictionResult(result)
        // Redirect or show result on UI
        // e.g., setPredictionResult(result);
      } else {
        console.error("Prediction Error:", result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("Error connecting to Flask server:", error);
      alert("Could not connect to prediction server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#17313A] bg-[#091428]/95 backdrop-blur supports-[backdrop-filter]:bg-[#091428]/60">
        <div className="container flex h-16 items-center justify-between">
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
            <Button
              variant="outline"
              className="hidden sm:flex border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#091428]"
            >
              Sign In
            </Button>
            <Link href='#predict'>
            <Button className="bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428]">
              Get Started
              <ChevronRight className="ml-1 h-1 w-1" />
            </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.svg?height=800&width=1920"
              alt="League of Legends Champions"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1428]"></div>
          </div>

          <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40">
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
                <Link href="#predict">
                    <Button className="bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428] text-lg py-6 px-8">
                      Try It Now
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#091428] text-lg py-6 px-8"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative h-[450px] rounded-lg overflow-hidden shadow-2xl shadow-[#0AC8B9]/20">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/oautjk0v9pI?rel=0&modestbranding=1&autoplay=1&mute=1"
                  title="League of Legends Gameplay"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#091428] py-12">
          <div className="container px-4">
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
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Prediction Tool?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our advanced machine learning algorithms analyze thousands of data points to give you the most accurate
                predictions possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
                <CardHeader>
                  <BarChart2 className="h-12 w-12 text-[#0AC8B9] mb-4" />
                  <CardTitle className="text-xl text-white">Advanced Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Our system analyzes player performance, champion matchups, team compositions, and historical data to
                    provide accurate predictions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
                <CardHeader>
                  <Zap className="h-12 w-12 text-[#0AC8B9] mb-4" />
                  <CardTitle className="text-xl text-white">Real-Time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Get predictions for your current match or analyze your last game with our real-time processing
                    system.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
                <CardHeader>
                  <Shield className="h-12 w-12 text-[#0AC8B9] mb-4" />
                  <CardTitle className="text-xl text-white">Secure & Reliable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Your data is secure with us. We use official Riot APIs and never store your personal information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-[#091428]">
          <div className="container px-4">
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
                <Card className="bg-[#0E2029] border-[#17313A] shadow-lg mt-8 pt-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Enter Your Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Provide your Riot ID, tagline, and select your region. Choose whether you want a prediction for
                      your current or last match.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0AC8B9] text-[#091428] flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <Card className="bg-[#0E2029] border-[#17313A] shadow-lg mt-8 pt-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Our AI Analyzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Our advanced machine learning model analyzes your match data, player statistics, and team
                      compositions.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0AC8B9] text-[#091428] flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <Card className="bg-[#0E2029] border-[#17313A] shadow-lg mt-8 pt-8">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Get Your Prediction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Receive a detailed prediction with win probability, key factors influencing the outcome, and tips
                      to improve your chances.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20 bg-[#0A1428]">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Watch how our prediction tool works and how it can help you improve your gameplay.
              </p>
            </div>
            <div className="relative max-w-4xl mx-auto h-[500px] rounded-lg overflow-hidden shadow-2xl shadow-[#0AC8B9]/20">
              {!playVideo ? (
                <>
                  {/* YouTube Thumbnail */}
                  <img
                    src="https://img.youtube.com/vi/Oza63bLiJRg/maxresdefault.jpg"
                    alt="League of Legends Gameplay"
                    className="object-cover w-full h-full rounded-lg"
                  />

                  {/* Golden Play Button */}
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => setPlayVideo(true)}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      style={{ width: "88px", height: "88px" }}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="playBtn_goldGradCenter" x1="12.6005" y1="47.5209" x2="86.6005" y2="47.5209">
                          <stop offset="0" stopColor="rgb(137, 107, 55)" />
                          <stop offset="0.5" stopColor="rgb(200, 180, 86)" />
                          <stop offset="1" stopColor="rgb(137, 107, 55)" />
                        </linearGradient>
                        <linearGradient id="playBtn_goldGradTop" x1="53.4222" y1="27.9995" x2="53.4222" y2="67.0005">
                          <stop offset="0" stopColor="rgb(195, 165, 93)" />
                          <stop offset="1" stopColor="rgb(104, 74, 32)" />
                        </linearGradient>
                      </defs>
                      <circle fill="url(#playBtn_goldGradTop)" cx="50" cy="50" r="43.5" />
                      <circle fill="#000" cx="50" cy="50" r="41" />
                      <g>
                        <circle fill="url(#playBtn_goldGradCenter)" cx="50" cy="50" r="34" />
                        <circle fill="#000" cx="50" cy="50" r="30" />
                        <path
                          fill="url(#playBtn_goldGradTop)"
                          d="M68.29,49.69l-28-16.5v33L68.29,49.69"
                        />
                      </g>
                    </svg>
                  </div>
                </>
              ) : (
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube-nocookie.com/embed/Oza63bLiJRg?autoplay=1&modestbranding=1&rel=0"
                  title="League of Legends Gameplay"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-[#091428]">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join thousands of satisfied players who have improved their gameplay with our predictions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic">
                    "This tool helped me climb from Silver to Platinum in just one month! The predictions are incredibly
                    accurate and the tips helped me improve my gameplay."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                      D
                    </div>
                    <div>
                      <div className="font-semibold text-white">DariusMain99</div>
                      <div className="text-sm text-gray-400">Diamond II</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic">
                    "As a support main, I was struggling to carry games. This tool showed me which matchups favor my
                    champion pool and when to pick what. Game changer!"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                      L
                    </div>
                    <div>
                      <div className="font-semibold text-white">LuxSupport</div>
                      <div className="text-sm text-gray-400">Platinum III</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic">
                    "I was skeptical at first, but the accuracy of these predictions is mind-blowing. It's like having a
                    coach analyze your games in real-time."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                      Y
                    </div>
                    <div>
                      <div className="font-semibold text-white">YasuoOrAFK</div>
                      <div className="text-sm text-gray-400">Gold I</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Try It Now Section */}
        <section id="predict" className="py-20 bg-[#0A1428]">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0E2029] to-[#17313A] rounded-lg p-8 md:p-12 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ready to Predict Your Next Match?</h2>
                  <p className="text-gray-300 mb-6">
                    Enter your details below to get started with your first prediction. It's free and takes just a few
                    seconds.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Riot ID"
                      value={formData.riotId}
                      onChange={(e) => setFormData({ ...formData, riotId: e.target.value })}
                      required
                      className="bg-[#091428] border-[#17313A] text-white"
                    />
                    <Input
                      type="text"
                      placeholder="Tagline"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      required
                      className="bg-[#091428] border-[#17313A] text-white"
                    />
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger className="bg-[#091428] border-[#17313A] text-white">
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#091428] border-[#17313A] text-white">
                        <SelectItem value="NA">North America (NA)</SelectItem>
                        <SelectItem value="EUW">Europe West (EUW)</SelectItem>
                        <SelectItem value="EUNE">Europe Nordic & East (EUNE)</SelectItem>
                        <SelectItem value="KR">Korea (KR)</SelectItem>
                        <SelectItem value="BR">Brazil (BR)</SelectItem>
                        <SelectItem value="LAN">Latin America North (LAN)</SelectItem>
                        <SelectItem value="LAS">Latin America South (LAS)</SelectItem>
                        <SelectItem value="OCE">Oceania (OCE)</SelectItem>
                        <SelectItem value="RU">Russia (RU)</SelectItem>
                        <SelectItem value="TR">Turkey (TR)</SelectItem>
                        <SelectItem value="JP">Japan (JP)</SelectItem>
                        <SelectItem value="TW">Taiwan (TW)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.predictionType}
                      onValueChange={(value) => setFormData({ ...formData, predictionType: value })}
                    >
                      <SelectTrigger className="bg-[#091428] border-[#17313A] text-white">
                        <SelectValue placeholder="Prediction Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#091428] border-[#17313A] text-white">
                        <SelectItem value="current">Current Match Prediction</SelectItem>
                        <SelectItem value="last">Last Match Prediction</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="submit" className="w-full bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428]">
                      Get Prediction
                    </Button>
                  </form>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                    {predictionResult ? (
                        <div className="flex flex-col justify-center items-center h-full text-white px-6 py-4 space-y-4">
                          <h2 className="text-2xl font-bold text-center text-white">Prediction Result</h2>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full text-sm md:text-base">
                            <div className="text-right text-gray-400 font-medium">Team:</div>
                            <div className="text-left">{predictionResult.team}</div>

                            <div className="text-right text-gray-400 font-medium">Role:</div>
                            <div className="text-left">{predictionResult.role}</div>

                            <div className="text-right text-gray-400 font-medium">Champion:</div>
                            <div className="text-left">{predictionResult.champion}</div>

                            <div className="text-right text-gray-400 font-medium">Match Won:</div>
                            <div className="text-left">{predictionResult.won ? "Yes" : "No"}</div>

                            <div className="text-right text-gray-400 font-medium">Prediction Correct:</div>
                            <div className="text-left">
                              {predictionResult.correct && predictionResult.correct.length > 0
                                ? predictionResult.correct[0] === true
                                  ? "Yes"
                                  : "No"
                                : "Pending"}
                            </div>
                          </div>
                        </div>
                        ) : (
                          <div
                            className="rounded-2xl w-full h-full"
                            style={{
                              backgroundImage: `url("https://cmsassets.rgpub.io/sanity/images/dsfx7636/universe/db24370ba8674557039c865f6ce0d92128881326-1215x717.jpg")`,
                              backgroundPosition: "76.1317% 3.06834%",
                              backgroundSize: "250%",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        )}
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-[#091428]">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Got questions? We've got answers. If you don't see your question here, feel free to contact us.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-[#0E2029] border-[#17313A] rounded-lg px-6">
                  <AccordionTrigger className="text-white hover:text-[#0AC8B9]">
                    How accurate are the predictions?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Our prediction model has been trained on millions of matches and achieves an accuracy rate of
                    approximately 95%. However, League of Legends is a complex game with many variables, so no
                    prediction can be 100% accurate.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="bg-[#0E2029] border-[#17313A] rounded-lg px-6">
                  <AccordionTrigger className="text-white hover:text-[#0AC8B9]">
                    Is this approved by Riot Games?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Our service uses the official Riot Games API and complies with their terms of service. However, we
                    are not affiliated with or endorsed by Riot Games.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="bg-[#0E2029] border-[#17313A] rounded-lg px-6">
                  <AccordionTrigger className="text-white hover:text-[#0AC8B9]">
                    Do I need to create an account?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    No, you don't need to create an account to use our basic prediction service. However, creating an
                    account allows you to save your match history, track your progress, and access advanced features.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="bg-[#0E2029] border-[#17313A] rounded-lg px-6">
                  <AccordionTrigger className="text-white hover:text-[#0AC8B9]">
                    Which regions are supported?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    We support all major regions including NA, EUW, EUNE, KR, BR, LAN, LAS, OCE, RU, TR, and JP. If your
                    region is not listed, please contact us.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="bg-[#0E2029] border-[#17313A] rounded-lg px-6">
                  <AccordionTrigger className="text-white hover:text-[#0AC8B9]">
                    Is there a premium version?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Yes, our premium version offers more detailed analytics, champion-specific recommendations, team
                    composition analysis, and unlimited predictions. Free users are limited to 5 predictions per day.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-[#0A1428]">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Climb the Ranks?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of players who are already using our prediction tool to improve their gameplay and climb
              the ranked ladder.
            </p>
            <Button className="bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428] text-lg py-6 px-8">
              Get Started Now
              <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#091428] border-t border-[#17313A] py-12">
        <div className="container px-4">
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

