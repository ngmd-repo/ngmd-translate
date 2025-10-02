export type TranslocoInterpolationValue = {
  key: string;
  value: string;
  params: Record<string, unknown> | null;
  translation: Record<string, string>;
};

export type TPluralFlags = {
  isZero: boolean;
  isOne: boolean;
  isFew: boolean;
  isMany: boolean;
  isOther: boolean;
};
