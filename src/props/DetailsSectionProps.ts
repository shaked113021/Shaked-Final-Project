export interface DetailsSectionProps {
  title: string;
  items: string[];
  // When given, each item links to the page this returns
  getItemPath?: (item: string) => string;
}
