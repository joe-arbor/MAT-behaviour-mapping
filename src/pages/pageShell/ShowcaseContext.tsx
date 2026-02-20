import React from 'react';
import type { ShowcaseSection } from './showcaseSections';

export interface ShowcaseContextValue {
  setSelectedId: (id: string) => void;
  setExpanded: (fn: (prev: Set<string>) => Set<string>) => void;
  sections: ShowcaseSection[];
  byCategory: Map<string, ShowcaseSection[]>;
}

export const ShowcaseContext = React.createContext<ShowcaseContextValue | null>(null);
