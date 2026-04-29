import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type { BehaviourTypeMappings } from './categoryMappingDerived';

export interface BehaviourCategoryMappingContextValue {
  mappings: BehaviourTypeMappings;
  setMappings: Dispatch<SetStateAction<BehaviourTypeMappings>>;
}

const BehaviourCategoryMappingContext =
  createContext<BehaviourCategoryMappingContextValue | null>(null);

export function BehaviourCategoryMappingProvider({ children }: { children: ReactNode }) {
  const [mappings, setMappings] = useState<BehaviourTypeMappings>({});
  const value = useMemo(
    () => ({ mappings, setMappings }),
    [mappings],
  );

  return (
    <BehaviourCategoryMappingContext.Provider value={value}>
      {children}
    </BehaviourCategoryMappingContext.Provider>
  );
}

export function useBehaviourCategoryMapping(): BehaviourCategoryMappingContextValue {
  const ctx = useContext(BehaviourCategoryMappingContext);
  if (!ctx) {
    throw new Error(
      'useBehaviourCategoryMapping must be used within BehaviourCategoryMappingProvider',
    );
  }
  return ctx;
}
