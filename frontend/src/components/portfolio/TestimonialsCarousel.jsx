import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsCarousel({ props = {} }) {
  const {
    heading = "Don't Take My Word For It",
    items = [
      {
        id: 't1',
        quote: "Working together was the best decision we made for our brand. The results exceeded every expectation we had.",
        author: "Sarah Chen",
        role: "CEO, NexGen Solutions",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=80&h=80&fit=crop"
      },
      {
        id: 't2',
        quote: "If you want someone who actually cares about the outcome — not just shipping code — this is your person.",
        author: "Marcus Reid",
        role: "Product Lead, Verve Studios",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
      },
      {
        id: 't3',
        quote: "Our conversion rate jumped 40% after the redesign. Simply outstanding quality of work.",
        author: "Amira Patel",
        role: "Head of Growth, FlowBase",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
      }
    ]
  } = props;

  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  const item = items[current];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="badge badge-indigo inline-flex mb-6">Testimonials</div>
        <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-16">{heading}</h2>

        <div className="relative glass gradient-border rounded-3xl p-10 md:p-14">
          {/* Big quote icon */}
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-8">
            <Quote className="w-6 h-6 text-indigo-400" />
          </div>

          <motion.div
            key={current}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-slate-200 text-xl md:text-2xl font-medium leading-relaxed mb-10">
              "{item.quote}"
            </p>

            <div className="flex items-center justify-center gap-4">
              {item.avatar && (
                <img src={item.avatar} alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40" />
              )}
              <div className="text-left">
                <div className="font-bold text-white">{item.author}</div>
                <div className="text-sm text-slate-500">{item.role}</div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-indigo-500' : 'w-1.5 bg-white/20'}`} />
              ))}
            </div>
            <button onClick={next}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
