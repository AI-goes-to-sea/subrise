"use client";
import React from 'react';
import TypewriterComponent from 'typewriter-effect'

export default function LandingTypeWrite ({
  arrs
}: {
  arrs: string[];
}) {
  return (
    <TypewriterComponent 
      options={{
        // strings: [`您的${LogoTitle}使用和流量获取终极指南`],
        strings: arrs,
        autoStart: true,
        loop: true,
      }}
    />
  )
}