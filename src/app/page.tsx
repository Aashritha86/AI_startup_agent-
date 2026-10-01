'use client';

import React from 'react';
import { useStartupStore } from '@/store/use-startup-store';
import { IdeaInputForm } from '@/components/startup/idea-input-form';
import { DashboardTabsView } from '@/components/startup/dashboard-tabs';

export default function HomePage() {
  const { currentStartup } = useStartupStore();

  return (
    <div className="w-full pb-16">
      {!currentStartup ? (
        <IdeaInputForm />
      ) : (
        <DashboardTabsView />
      )}
    </div>
  );
}
