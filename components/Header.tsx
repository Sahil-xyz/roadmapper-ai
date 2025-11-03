"use client"

import { useState } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/app/providers"
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link"

export function Header() {
  
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { isSignedIn } = useUser();


  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xs border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">Roadmapper AI</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-foreground/70 hover:text-foreground transition">
            HOME
          </Link>
          <Link href="/roadmap/generate" className="text-sm text-foreground/70 hover:text-foreground transition">
            GENERATE
          </Link>
          <Link href="/roadmap/display" className="text-sm text-foreground/70 hover:text-foreground transition">
            ROADMAPS
          </Link>
          <Link href="/about" className="text-sm text-foreground/70 hover:text-foreground transition">
            ABOUT
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-card transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-foreground" />
            ) : (
              <Moon size={20} className="text-foreground" />
            )}
          </button>
          {
            isSignedIn? (
              <SignOutButton />
            ) : (
              <>
              <SignInButton>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignInButton>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </SignInButton>
              </>
            )
          }
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-card transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-foreground" />
            ) : (
              <Moon size={20} className="text-foreground" />
            )}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-md">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-sm text-foreground/70 hover:text-foreground">
              HOME
            </Link>
            <Link href="/generate" className="block text-sm text-foreground/70 hover:text-foreground">
              GENERATE
            </Link>
            <Link href="/roadmap" className="block text-sm text-foreground/70 hover:text-foreground">
              ROADMAPS
            </Link>
            <Link href="/about" className="block text-sm text-foreground/70 hover:text-foreground">
              ABOUT
            </Link>
            <div className="flex gap-2 pt-2">
              {
                isSignedIn ? (
                  <SignOutButton />
                ) : (
                  <SignInButton />
                )
              }
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
