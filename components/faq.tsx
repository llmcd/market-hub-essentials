"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What are the costs involved?",
      answer:
        "We offer a partnership with no upfront costs to property owners. Installation, equipment, maintenance, and restocking are all handled by us.",
    },
    {
      question: "How much space do I need?",
      answer:
        "Space requirements vary by solution. Smart coolers need as little as 10 square feet, while full micro markets typically require 150-300 square feet. We can customize solutions to fit your available space.",
    },
    {
      question: "Who handles maintenance and restocking?",
      answer:
        "We handle everything. Our team manages regular restocking, equipment maintenance, cleaning, and technical support. You simply provide the space, power and enjoy the benefits.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "All our solutions accept credit cards, debit cards, mobile payments (Apple Pay, Google Pay), and contactless payments. We do not handle cash to ensure security and convenience.",
    },
    {
      question: "How quickly can you install?",
      answer:
        "After initial consultation and space approval, most installations are completed within 2-4 weeks. Smart coolers can often be installed in just a few days.",
    },
    {
      question: "What products will be available?",
      answer:
        "We customize product selection based on your audience and preferences. Options include fresh food, healthy snacks, beverages, grab-and-go meals, and specialty items. We continuously optimize based on sales data.",
    },
    {
      question: "Is there a minimum commitment?",
      answer:
        "We typically work with 1 year agreements, but terms are flexible based on your needs. Our goal is a long-term partnership that benefits both parties.",
    },
    {
      question: "How do you ensure food safety?",
      answer:
        "All equipment includes temperature monitoring, automated alerts, and regular inspections. We follow strict food safety protocols and comply with all local health regulations.",
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium mb-4">
            Questions & Answers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-balance">
            Everything you <span className="font-medium">need to know</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 flex items-start justify-between gap-4 text-left group"
              >
                <span className="font-serif text-xl md:text-2xl font-medium group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-6 h-6 text-primary">{openIndex === index ? <Minus /> : <Plus />}</span>
              </button>

              {openIndex === index && <div className="pb-6 text-muted-foreground leading-relaxed">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
