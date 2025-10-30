/**
 * Pagination Configuration Utility
 * Reads pagination settings from CSS variables in globals.css
 */

export type SectionType = 'events' | 'teams' | 'gallery' | 'developers' | 'default';

interface PaginationConfig {
  mobile: number;
  desktop: number;
}

/**
 * Get the minimum number of items required before pagination appears
 */
export function getPaginationThreshold(): number {
  if (typeof window === 'undefined') return 2; // SSR fallback
  
  const threshold = getComputedStyle(document.documentElement)
    .getPropertyValue('--pagination-threshold')
    .trim();
  
  return parseInt(threshold) || 2;
}

/**
 * Get pagination configuration for a specific section
 * @param section - The section type (events, teams, gallery, developers, or default)
 * @returns Object with mobile and desktop items per page
 */
export function getPaginationConfig(section: SectionType = 'default'): PaginationConfig {
  if (typeof window === 'undefined') {
    // SSR fallback values
    return { mobile: 6, desktop: 9 };
  }

  const styles = getComputedStyle(document.documentElement);
  
  const mobileVar = `--pagination-${section}-mobile`;
  const desktopVar = `--pagination-${section}-desktop`;
  
  const mobile = parseInt(styles.getPropertyValue(mobileVar).trim()) || 6;
  const desktop = parseInt(styles.getPropertyValue(desktopVar).trim()) || 9;
  
  return { mobile, desktop };
}

/**
 * Check if pagination should be enabled for a given number of items
 * @param itemCount - Total number of items
 * @param config - Pagination config (mobile/desktop items per page)
 * @param isMobile - Whether the current viewport is mobile
 * @returns boolean indicating if pagination should be shown
 */
export function shouldShowPagination(
  itemCount: number,
  config: PaginationConfig,
  isMobile: boolean
): boolean {
  const threshold = getPaginationThreshold();
  const itemsPerPage = isMobile ? config.mobile : config.desktop;
  
  // Show pagination only if:
  // 1. Items exceed threshold
  // 2. Items would require more than 1 page
  return itemCount > threshold && itemCount > itemsPerPage;
}
