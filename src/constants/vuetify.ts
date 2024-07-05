export type TextFieldVariant = 'underlined' | 'filled' | 'outlined' | 'plain' | 'solo' | 'solo-inverted' | 'solo-filled' | undefined;

export type Density = null | 'default' | 'comfortable' | 'compact';

export type InfiniteScrollSide = 'start' | 'end' | 'both';

export type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error';

export interface InfiniteScrollLoadOptions {
  side: InfiniteScrollSide;
  done: (status: InfiniteScrollStatus) => void;
}
