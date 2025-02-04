export interface PrrResponse {
  purchases: number;
  revenue: number;
  refunds: number;
}

export interface SalesData {
  id: number;
  month: string;
  last_year: number;
  this_year: number;
}

export interface SalesScore {
  score: number;
  title: string;
  message: string;
}

export interface CustomerDeviceData {
  date2: string;
  unique_count: number;
  cumulative_tweets: number;
}

export interface CommunityFeedback {
  negative: number;
  positive: number;
  neutral: number;
}

export interface StatsCardProps {
  title: string;
  value: number;
  change: number;
}
