export default function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
