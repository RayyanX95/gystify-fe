import { Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
            <Mail className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-gray-900">Summa</span>
          </Link>
          <div className="text-sm text-gray-600">
            © 2025 Summa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
