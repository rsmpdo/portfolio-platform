import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Sparkles, Briefcase, MapPin, ArrowRight } from 'lucide-react';

const jobs = [
  { title: "Senior Full Stack Engineer (React/Node)", location: "Remote Worldwide", type: "Full-time" },
  { title: "Lead UI/UX Designer", location: "Remote Worldwide", type: "Full-time" },
  { title: "DevOps & Cloud Infrastructure Engineer", location: "Remote Worldwide", type: "Full-time" }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge badge-indigo inline-flex mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Team</span>
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-6">
            Build the Future of<br />
            <span className="gradient-text">Creator Portfolios</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We are a fast-moving, remote-first team passionate about design, performance, and empowering creators around the globe.
          </p>
        </div>

        <div className="space-y-4 mb-20">
          {jobs.map((job, idx) => (
            <div key={idx} className="glass gradient-border rounded-2xl p-6 flex items-center justify-between hover:border-indigo-500/40 transition">
              <div>
                <h3 className="font-heading font-bold text-lg text-white mb-1">{job.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-400" />
                    <span>{job.location}</span>
                  </div>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <Link to="/register" className="btn-primary px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5">
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
