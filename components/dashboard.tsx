import Reports from "./reports"
import TopicTicker from "./topic-ticker"
import MustReads from "./must-reads"
import NewsletterPlanning from "./newsletter-planning"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Reports />
      <TopicTicker />
      <MustReads />
      <NewsletterPlanning />
    </div>
  )
}

