import { notFound } from "next/navigation";
import { teamMembers } from "@/lib/data/team";
import { Container } from "@/components/layout";
import { Users, MapPin, Building, Link as LinkIcon, Book, Star, GitFork, BookOpen } from "lucide-react";
import React from "react";



export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const member = teamMembers.find((m) => m.slug === resolvedParams.slug);

  if (!member) {
    notFound();
  }

  const githubProfile = member.githubProfile || {
    username: member.name.toLowerCase().replace(/\s+/g, '-'),
    followers: "0",
    following: "0",
    repos: 0
  };



  return (
    <main className="bg-[#080808] min-h-screen relative overflow-hidden bg-grid-pattern-lg [mask-image:linear-gradient(to_bottom,white,transparent)]">
      
      <Container className="relative z-10 pt-32 pb-24">
        


        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Sidebar */}
          <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-6">
            <div className="relative w-full aspect-square rounded-full overflow-hidden border border-stroke p-2 bg-[#0a0a0a]">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                 <img src={member.image} alt={member.name} className="w-full h-full object-cover scale-[1.08] block" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <h1 className="font-display text-3xl text-bone">{member.name}</h1>
              <p className="font-label-mono text-lg text-bone tracking-wide">{githubProfile.username}</p>
            </div>

            <p className="text-bone font-body-sm leading-relaxed">{member.description}</p>

            <button className="w-full py-2 rounded-md bg-surface border border-stroke text-bone font-label-mono hover:border-accent hover:text-accent transition-colors">
              Follow
            </button>

            <div className="flex items-center gap-4 text-sm text-bone font-body-sm">
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-accent transition-colors">
                <Users size={16} />
                <span className="text-bone font-medium">{githubProfile.followers}</span> followers
              </div>
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-accent transition-colors">
                <span className="text-bone font-medium">{githubProfile.following}</span> following
              </div>
            </div>

            <div className="flex flex-col gap-3 text-sm text-bone font-body-sm border-t border-stroke pt-6">
              <div className="flex items-center gap-2">
                <Building size={16} />
                <span>ZeroAxiis</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Cyberspace</span>
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon size={16} />
                <a href="#" className="hover:text-accent hover:underline">zeroaxiis.com</a>
              </div>
            </div>

            <div className="border-t border-stroke pt-6">
               <h2 className="font-label-mono text-sm tracking-wide text-bone mb-4">Organizations</h2>
               <div className="w-10 h-10 rounded-md bg-surface border border-stroke flex items-center justify-center cursor-pointer hover:border-accent">
                 <span className="font-display text-accent font-bold text-lg">Z</span>
               </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full flex-1 flex flex-col gap-8">
             
             {/* Pinned Repos */}
             <div className="flex flex-col gap-4">
               <h2 className="font-label-mono text-sm tracking-wide text-bone">Pinned</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="p-4 rounded-xl border border-stroke bg-[#0a0a0a] flex flex-col gap-3">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <Book size={16} className="text-bone" />
                           <a href="#" className="font-label-mono text-accent hover:underline text-sm font-medium tracking-wide">
                             {i % 2 === 0 ? "zeroaxiis-core" : "neural-engine-v2"}
                           </a>
                         </div>
                         <span className="text-[10px] uppercase font-label-mono tracking-widest text-bone border border-stroke rounded-full px-2 py-0.5">Public</span>
                       </div>
                       <p className="text-xs text-bone leading-relaxed line-clamp-2">
                         {i % 2 === 0 ? "The core engine powering all of ZeroAxiis platforms. High performance computing layer." : "Advanced machine learning model generation and training pipeline for adaptive systems."}
                       </p>
                       <div className="mt-auto pt-2 flex items-center gap-4 text-[11px] font-label-mono text-bone">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${i % 2 === 0 ? "bg-blue-400" : "bg-yellow-400"}`} />
                            {i % 2 === 0 ? "TypeScript" : "Python"}
                          </div>
                          <div className="flex items-center gap-1 hover:text-accent cursor-pointer transition-colors">
                            <Star size={14} />
                            {Math.floor(Math.random() * 100) + 10}
                          </div>
                          <div className="flex items-center gap-1 hover:text-accent cursor-pointer transition-colors">
                            <GitFork size={14} />
                            {Math.floor(Math.random() * 20)}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
             </div>


          </div>
        </div>
      </Container>
    </main>
  );
}
