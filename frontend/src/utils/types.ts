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
  date: string;
  webSales: number;
  offlineSales: number;
}

export interface CustomerDeviceDataResponse {
  date: string;
  web_sales: number;
  offline_sales: number;
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

export interface Product {
  id: number;
  name: string;
  image_url: string;
  soldAmount: number;
  unitPrice: number;
  revenue: number;
  rating: number;
}
