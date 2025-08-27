'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Menu, X, ChevronDown } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Team', href: '/team' },
  ],
  apps: [
    { name: 'All Apps', href: '/apps' },
    { name: 'Invoice Generator', href: '/apps/invoice' },
    { name: 'Project Management', href: '/apps/project-management' },
    { name: 'CRM', href: '/apps/crm' },
    { name: 'File Manager', href: '/apps/files' },
  ],
  company: [
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ]
}

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-steel-800 border-b-4 border-gold">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo-dark.webp"
                alt="LRPDM Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-gold font-bold text-xl hidden sm:block">
              LRPDM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-gold transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}

            {/* Apps Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:text-gold">
                  Apps <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-steel-700 border-gold">
                {navigation.apps.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="text-white hover:text-gold">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/contact"
              className="text-white hover:text-gold transition-colors font-medium"
            >
              Contact
            </Link>

            <Button className="bg-gold hover:bg-gold-dark text-steel-800">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white hover:text-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-white hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-steel-600 my-2"></div>
            {navigation.apps.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-white hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-steel-600 my-2"></div>
            <div className="px-3 py-2">
              <Button className="w-full bg-gold hover:bg-gold-dark text-steel-800">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}