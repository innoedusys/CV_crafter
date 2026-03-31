import { FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-card py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 font-display text-lg text-foreground">
            <FileText className="h-5 w-5 text-primary" />
            ResumeForge
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Daqiqalar ichida professional rezyumeni onlayn yarating. Bepul va ATS-ga mos.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ResumeForge. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
