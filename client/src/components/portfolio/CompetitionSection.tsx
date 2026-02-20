import { motion } from "framer-motion";
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, Tooltip } from "recharts";

const ratingData = [
  { month: 'Jan', rating: 1500 },
  { month: 'Feb', rating: 1650 },
  { month: 'Mar', rating: 1600 },
  { month: 'Apr', rating: 1800 },
  { month: 'May', rating: 1950 },
  { month: 'Jun', rating: 2100 },
  { month: 'Jul', rating: 2250 },
  { month: 'Aug', rating: 2200 },
  { month: 'Sep', rating: 2350 },
];

const skillsData = [
  { subject: 'DP', A: 90, fullMark: 100 },
  { subject: 'Graphs', A: 85, fullMark: 100 },
  { subject: 'Math', A: 95, fullMark: 100 },
  { subject: 'Greedy', A: 80, fullMark: 100 },
  { subject: 'Strings', A: 75, fullMark: 100 },
];

function Counter({ value, label }: { value: string, label: string }) {
  return (
    <motion.div 
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <span className="text-4xl md:text-5xl font-heading font-medium text-foreground">{value}</span>
      <span className="text-sm uppercase tracking-wider text-muted-foreground">{label}</span>
    </motion.div>
  );
}

export function CompetitionSection() {
  return (
    <section id="04-competition" className="w-full min-h-screen py-24 flex flex-col justify-center">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-primary opacity-80 block mb-2">
            Track 04
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight">
            Rhythm & Precision
          </h2>
        </motion.div>

        {/* Top Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-border py-12">
          <Counter value="2350" label="Current Rating" />
          <Counter value="2410" label="Peak Rating" />
          <Counter value="1,240+" label="Problems Solved" />
          <Counter value="Top 1%" label="Global Rank" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Line Graph */}
          <motion.div
            className="bg-card border border-border p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg font-heading mb-6 text-muted-foreground">Rating Progression</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ratingData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: 'hsl(var(--accent))', strokeWidth: 0 }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            className="bg-card border border-border p-6 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-lg font-heading mb-6 text-muted-foreground">Algorithm Proficiency</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Skill"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    animationDuration={2000}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}