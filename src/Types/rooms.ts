export interface IStudio {
  _id: string;
  sid: string;
  createdAt : string;
  region: string;
  title: string;
  category: string;
  rating: number;
  totalReviews: number;
  location: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  description: string;
  images: string[];
  amenities: string[];
  host: {
    name: string;
    verified: boolean;
  };
  reviews: {
    reviewerName: string;
    reviewerPhoto: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}


export interface IMyStudioDetails {
  _id: string;
  title: string;
  category: string;
  region: string;
  location: string;
  description: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  images: string[];
  amenities: string[];
  userName: string;
  userEmail: string;
  createdAt: string;
}