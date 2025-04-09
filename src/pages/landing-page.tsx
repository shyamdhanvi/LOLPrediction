// app/page.tsx
"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, Trophy, BarChart2, Zap, Shield, Star } from "lucide-react"

interface FormData {
  riotId: string
  tagline: string
  region: string
  predictionType: "current" | "last"
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    riotId: "",
    tagline: "",
    region: "",
    predictionType: "current",
  })
  
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Prediction failed")
      }

      const data = await response.json()
      setPredictionResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1428] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#17313A] bg-[#091428]/95 backdrop-blur supports-[backdrop-filter]:bg-[#091428]/60">
        <div className="container flex h-16 items-center justify-between px-4">
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
            <Button variant="outline" className="hidden sm:flex border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#091428]">
              Sign In
            </Button>
            <Button className="bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428]">
              Get Started
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Background"
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
                Our advanced AI analyzes your gameplay data to predict match outcomes with incredible accuracy. 
                Gain the edge you need to climb the ranks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428] text-lg py-6 px-8">
                  Try It Now
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-[#C89B3C] text-[#C89B3C] hover:bg-[#C89B3C] hover:text-[#091428] text-lg py-6 px-8">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl shadow-[#0AC8B9]/20">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Gameplay"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-16 h-16 rounded-full bg-black/50 border-white/50 hover:bg-black/70 hover:scale-110 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="sr-only">Play video</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prediction Form Section */}
      <section className="py-20 bg-[#0A1428]">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0E2029] to-[#17313A] rounded-lg p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Predict Your Next Match?</h2>
                <p className="text-gray-300 mb-6">
                  Enter your details below to get started with your first prediction
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      <SelectItem value="na1">North America (NA)</SelectItem>
                      <SelectItem value="euw1">Europe West (EUW)</SelectItem>
                      <SelectItem value="eun1">Europe Nordic & East (EUNE)</SelectItem>
                      <SelectItem value="kr">Korea (KR)</SelectItem>
                      <SelectItem value="br1">Brazil (BR)</SelectItem>
                      <SelectItem value="la1">Latin America North (LAN)</SelectItem>
                      <SelectItem value="la2">Latin America South (LAS)</SelectItem>
                      <SelectItem value="oc1">Oceania (OCE)</SelectItem>
                      <SelectItem value="ru">Russia (RU)</SelectItem>
                      <SelectItem value="tr1">Turkey (TR)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={formData.predictionType}
                    onValueChange={(value) => setFormData({ ...formData, predictionType: value as "current" | "last" })}
                  >
                    <SelectTrigger className="bg-[#091428] border-[#17313A] text-white">
                      <SelectValue placeholder="Prediction Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#091428] border-[#17313A] text-white">
                      <SelectItem value="current">Current Match Prediction</SelectItem>
                      <SelectItem value="last">Last Match Prediction</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    type="submit"
                    className="w-full bg-[#0AC8B9] hover:bg-[#0AC8B9]/80 text-[#091428] text-lg py-4 px-6"
                    disabled={loading}
                  >
                    {loading ? "Predicting..." : "Get Prediction"}
                  </Button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>

              {/* Prediction Results */}
              <div className="md:col-span-1">
                {predictionResult && (
                  <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">
                        Prediction Result
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300 space-y-4">
                      {predictionResult.error ? (
                        <p>{predictionResult.error}</p>
                      ) : (
                        <>
                          {formData.predictionType === "current" ? (
                            <>
                              <p>Victory Predicted: {predictionResult.victory_predicted ? "Yes" : "No"}</p>
                              <p>Team: {predictionResult.team}</p>
                              <p>Champion: {predictionResult.champion}</p>
                              <p>Role: {predictionResult.role}</p>
                            </>
                          ) : (
                            <>
                              <p>Match Result: {predictionResult.won ? "Victory" : "Defeat"}</p>
                              <p>Correct Prediction: {predictionResult.correct ? "Yes" : "No"}</p>
                              <p>Team: {predictionResult.team}</p>
                              <p>Champion: {predictionResult.champion}</p>
                              <p>Role: {predictionResult.role}</p>
                            </>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#091428]">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Prediction Tool?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our advanced machine learning algorithms analyze thousands of data points
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
                  Analyzes player performance, champion matchups, and team compositions
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
                  Get predictions for current matches or analyze past games
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
                  Uses official Riot APIs and never stores personal information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#0A1428]">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied players who improved their gameplay
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
              <CardHeader>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 italic">
                  "This tool helped me climb from Silver to Platinum! The accuracy is incredible."
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                    D
                  </div>
                  <div>
                    <div className="font-semibold">DariusMain99</div>
                    <div className="text-sm text-gray-400">Diamond II</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
              <CardHeader>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 italic">
                  "As a support main, this tool showed me optimal champion matchups"
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                    L
                  </div>
                  <div>
                    <div className="font-semibold">LuxSupport</div>
                    <div className="text-sm text-gray-400">Platinum III</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card className="bg-[#0E2029] border-[#17313A] shadow-lg">
              <CardHeader>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C89B3C] text-[#C89B3C]" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 italic">
                  "The real-time analysis feels like having a professional coach"
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#0AC8B9] flex items-center justify-center text-[#091428] font-bold">
                    Y
                  </div>
                  <div>
                    <div className="font-semibold">YasuoOrAFK</div>
                    <div className="text-sm text-gray-400">Gold I</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#091428]">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Answers to common questions about our prediction tool
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-[#0E2029] border-[#17313A] rounded-lg">
              <AccordionTrigger className="text-white hover:text-[#0AC8B9] px-6 py-4">
                How accurate are the predictions?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-6 py-4">
                Our model achieves ~95% accuracy, though League's complexity means no prediction is perfect
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-[#0E2029] border-[#17313A] rounded-lg">
              <AccordionTrigger className="text-white hover:text-[#0AC8B9] px-6 py-4">
                Is this endorsed by Riot Games?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-6 py-4">
                We use official Riot APIs but are not officially endorsed
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-[#0E2029] border-[#17313A] rounded-lg">
              <AccordionTrigger className="text-white hover:text-[#0AC8B9] px-6 py-4">
                Do I need an account?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-6 py-4">
                No account needed for basic predictions - create one for advanced features
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

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
                Advanced match prediction for League of Legends players
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
              Not endorsed by Riot Games. Trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}