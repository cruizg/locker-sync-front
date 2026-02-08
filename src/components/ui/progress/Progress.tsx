// 'use client';
import React from 'react'


export const Progress = ({ progress }: any) => {
    const percentage = progress
    ? ((progress.processed / progress.total) * 100).toFixed(2)
    : 0;

  return (
    <div className="w-full h-5 border border-gray-300">
      <div
        className="h-full bg-green-500"
        style={{ width: `${percentage}%` }}
      >{Math.round(Number(percentage))}%</div>
    </div>
  );
}

export default Progress
