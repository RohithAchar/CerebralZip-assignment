import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

import { StatsCard } from "../components/StatsCard";
import { PrrResponse } from "../utils/types";
import { getPrr } from "../utils/api";
import { Sidebar } from "../components/Sidebar";
import { isAuthenticated } from "../utils/auth";
import ComparisonChart from "../components/ComparisonChart";
import ScoreCard from "../components/SalesScore";
import CustomersChart from "../components/CustomersChart";
import FeedbackCard from "../components/CommunityFeedback";
import ProductsTable from "../components/ProductsTable";

export default function Dashboard() {
  const [prr, setPrr] = useState<PrrResponse | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        alert("You are not authenticated. Redirecting to login page...");
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPrr();
        setPrr(response);
      } catch (error) {
        console.error("Error fetching PRR data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center text-center">
          <LoaderCircle className="h-10 w-10 animate-spin text-blue-500" />
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[224px_1fr_300px] gap-4 bg-[#F4F5F8] p-4">
      <div className="w-56">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 bg-white space-y-12 rounded-2xl shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Compare to</span>
            <select className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm">
              <option>Last year</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <StatsCard
            title="Purchases"
            value={prr?.purchases || 0}
            change={32}
          />
          <StatsCard title="Revenue" value={prr?.revenue || 0} change={49} />
          <StatsCard title="Refunds" value={prr?.refunds || 0} change={-7} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 pl-6">
              Comparison
            </h2>
            <div>
              <select className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm">
                <option>6 months</option>
              </select>
            </div>
          </div>
          <ComparisonChart />
        </div>
        <ProductsTable />
      </div>
      <div className="w-full space-y-4">
        <ScoreCard />
        <CustomersChart />
        <FeedbackCard />
      </div>
    </div>
  );
}
