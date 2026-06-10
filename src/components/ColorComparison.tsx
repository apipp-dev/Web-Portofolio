import React from "react";
import { motion } from "motion/react";

const videos = [
  {
    title: "Before",
    subtitle: "Raw Footage",
    youtubeId: "ZtTFeg-QRnQ",
    url: "https://youtube.com/shorts/ZtTFeg-QRnQ",
    badge: "BEFORE (RAW)",
    accent: "cyan",
  },
  {
    title: "After",
    subtitle: "Graded Result",
    youtubeId: "7Oobz3ZgHOM",
    url: "https://youtube.com/shorts/7Oobz3ZgHOM",
    badge: "AFTER (GRADED)",
    accent: "violet",
  },
];

const youtubeEmbed = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1&fs=0`;

export const ColorComparison = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {videos.map((item, index) => (
        <motion.a
          key={item.youtubeId}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass card-3d-kinetic group relative overflow-hidden rounded-[2.5rem] p-5 border border-white/10 bg-white/[0.03]"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.08 }}
        >
          <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-black">
            <iframe
              src={youtubeEmbed(item.youtubeId)}
              title={`${item.title} ${item.subtitle}`}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="youtube-compare-grid-iframe"
            />

            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 pointer-events-none" />

            <div
              className={`absolute left-4 bottom-4 z-20 px-4 py-2 rounded-full border bg-black/70 backdrop-blur-xl text-[10px] font-black uppercase tracking-widest pointer-events-none ${
                item.accent === "cyan"
                  ? "border-cyan/40 text-cyan"
                  : "border-violet-light/40 text-violet-light"
              }`}
            >
              {item.badge}
            </div>
          </div>

          <div className="px-2 pt-5 text-left">
            <p
              className={`text-[10px] font-black uppercase tracking-[.3em] mb-2 ${
                item.accent === "cyan" ? "text-cyan" : "text-violet-light"
              }`}
            >
              {item.subtitle}
            </p>

            <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-cyan transition-colors">
              {item.title}
            </h3>

            <p className="text-gray-500 text-xs mt-3 leading-relaxed">
              Klik card untuk membuka video full di YouTube.
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
};
