import { ICONS } from './icons';

export const quickActionsData = [
  { id: 1, title: 'Log Meal', iconName: ICONS.restaurant, color: '#10B981' },
  { id: 2, title: 'Scan Food', iconName: ICONS.barcode, color: '#3B82F6' },
  { id: 3, title: 'Add Water', iconName: ICONS.water, color: '#06B6D4' },
  { id: 4, title: 'Weigh In', iconName: ICONS.scale, color: '#8B5CF6' },
] as const;
