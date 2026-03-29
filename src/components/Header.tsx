import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl text-foreground">
          <FileText className="h-6 w-6 text-primary" />
          ResumeForge
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/builder"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Build My Resume
          </Link>
        </nav>
      </div>
    </header>
  );
}
