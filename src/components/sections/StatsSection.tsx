'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Users, ShoppingBag, Wrench } from 'lucide-react';

const stats = [
  {
    icon: Trophy,
    value: 31,
    suffix: '+',
    label: 'Years Experience',
    description: 'Serving Trichy since 1993',
    color: 'from-[#4F46E5] to-indigo-600',
    bg: 'bg-indigo-50 dark:bg-indigo-950/20',
  },
  {
    icon: Users,
    value: 5000,
    suffix: '+',
    label: 'Happy Customers',
    description: 'And counting every day',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: ShoppingBag,
    value: 10000,
    suffix: '+',
    label: 'Products Sold',
    description: 'Across all categories',
    color: 'from-green-500 to-green-700',
    bg: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: Wrench,
    value: 3000,
    suffix: '+',
    label: 'Services Completed',
    description: 'Expert repairs & upgrades',
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (inView && !hasStarted.current) {
      hasStarted.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-[#111827]" ref={ref}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-sm font-semibold mb-4">
            Our Achievement
          </div>
          <h2 className="section-title text-gray-900 dark:text-[#F8FAFC]">
            Trusted by Thousands
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Three decades of excellence in laptop sales and service in Trichy
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card text-center group hover:scale-105"
            >
              <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className={`text-2xl md:text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-bold text-gray-900 dark:text-[#F8FAFC] text-base mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500 dark:text-[#94A3B8]">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
