import React from 'react';
import { Anvil, Aperture, History, LayoutDashboard } from 'lucide-react';

const ICONS = {
  oracle: Aperture,
  forge: Anvil,
  hindsight: History,
  manager: LayoutDashboard,
};

export default function ProductIcon({ product, className = '' }) {
  const Icon = ICONS[product];

  if (!Icon) return null;

  return (
    <span
      className={`product-icon product-icon--${product} ${className}`.trim()}
      data-product-icon={product}
      aria-hidden="true"
    >
      <Icon strokeWidth={1.65} />
    </span>
  );
}
