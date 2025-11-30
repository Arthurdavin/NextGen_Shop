/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from "react";
import { Facebook, Github, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const members = [
  { name: "Member 1", position: "Developer", img: "/davin.jpg", socials: { facebook: "https://www.facebook.com/share/1HH3eGX4ZV/?mibextid=wwXIfr", github: "https://github.com/Arthurdavin" } },
  { name: "Member 2", position: "Designer", img: "/vatey.jpg", socials: { facebook: "https://www.facebook.com/share/16mzykABKM/", github: "https://github.com/Sovannvatey" } },
  { name: "Member 3", position: "Marketing", img: "/kormva.png", socials: { facebook: "https://www.facebook.com/kormvong.vaa", github: "https://github.com/Kormvaa" } },
  { name: "Member 4", position: "Marketing", img: "/somrach.png", socials: { facebook: "https://www.facebook.com/share/14R55g2nn8G/", github: "https://github.com/SamrachHub" } },
  { name: "Member 5", position: "Support", img: "/koghour.png", socials: { facebook: "https://www.facebook.com/k.ng.h.ur/", github: "https://github.com/KONGHOUR" } },
  { name: "Member 6", position: "Editor", img: "/borey1.png", socials: { facebook: "https://www.facebook.com/share/17Yk2Ly4pE/?mibextid=wwXIfr", github: "#" } },
];

const values = [
  { title: "Our Mission", desc: "To make shopping easy, enjoyable, and trustworthy." },
  { title: "Our Vision", desc: "To become the most trusted modern marketplace." },
  { title: "Our Core Values", desc: "Clarity, innovation, quality, and customer care." },
  { title: "Why We Started", desc: "To help people shop confidently and effortlessly." },
];

const SocialLinks = ({ socials }: any) => (
  <div className="flex justify-center gap-4 mt-3 text-gray-600 dark:text-gray-300">
    {[{ icon: Facebook, link: socials.facebook }, { icon: Github, link: socials.github }].map((s, i) => (
      <a
        key={i}
        href={s.link}
        target="_blank"
        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      >
        <s.icon className="w-5 h-5" />
      </a>
    ))}
  </div>
);

const ValueCard = ({ title, desc }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all p-6 rounded-xl border border-gray-100 dark:border-gray-700"
  >
    <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const TeamCard = ({ member }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="text-center group p-5 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800"
  >
    <div className="overflow-hidden rounded-xl">
      <Image
        src={member.img}
        alt={member.name}
        width={260}
        height={280}
        className="mx-auto rounded-xl object-cover group-hover:scale-105 transition-all duration-500"
      />
    </div>
    <h3 className="mt-4 font-semibold text-lg text-gray-900 dark:text-gray-100">{member.name}</h3>
    <p className="text-gray-500 dark:text-gray-300 text-sm">{member.position}</p>
    <SocialLinks socials={member.socials} />
  </motion.div>
);

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">

      {/* HEADER */}
      <motion.section
        className="flex flex-col md:flex-row items-center gap-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* LEFT - TEXT */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-100">Our Story</h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Founded in 2018, NextGen is a modern shopping marketplace created to redefine 
            how people shop online. Our journey started with a single goal — to bring 
            clarity, innovation, and trust into every shopping experience.
            <br /><br />
            Over the years, we’ve grown into a community-driven platform focused on 
            quality, transparency, and seamless digital experiences. We believe 
            shopping should feel simple, inspiring, and connected — not stressful.
            <br /><br />
            Today, NextGen continues to grow with passion, creativity, and a vision to 
            empower customers through technology, design, and a commitment to excellence.
          </p>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl shadow-lg overflow-hidden"
          >
            <Image
              src="/aboutus.png"
              alt="Our Story"
              width={650}
              height={420}
              className="rounded-xl object-cover w-full h-full transition-transform duration-700 ease-in-out hover:scale-105"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* VALUES */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">Our Values</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <ValueCard key={i} {...v} />
          ))}
        </div>
      </div>

      {/* TEAM */}
      <div>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Team Members</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
          {members.map((m, i) => (
            <TeamCard key={i} member={m} />
          ))}
        </div>
      </div>

    </div>
  );
}
