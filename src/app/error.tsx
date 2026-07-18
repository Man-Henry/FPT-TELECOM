'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Home, RotateCcw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="mb-4 h-16 w-16 text-destructive" />
      <h2 className="mb-4 text-3xl font-bold tracking-tight">Đã xảy ra lỗi</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Đã có sự cố xảy ra khi tải trang. Vui lòng thử lại hoặc quay về trang chủ.
      </p>
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        <Button onClick={reset} className="w-full gap-2" size="lg">
          <RotateCcw className="h-4 w-4" />
          Thử lại
        </Button>
        <Link href="/">
          <Button variant="outline" className="w-full gap-2" size="lg">
            <Home className="h-4 w-4" />
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );
}