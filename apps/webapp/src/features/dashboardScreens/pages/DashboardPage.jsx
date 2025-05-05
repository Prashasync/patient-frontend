import React from 'react';
import BottomNavBar from '../../../shared/components/BottomNavBar';
import '../../../shared/styles/bottomNavBar.css';
import Bell from '../../../assets/icons/Union.png';
import Search from '../../../assets/icons/search_line.svg';
import Grid from '../../../assets/icons/grid-line.svg';
import MoodChart from '../components/MoodChart';
import MoodHistoryCard from '../components/MoodHistoryCard';
import DataInsights from '../components/DataInsights';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-white text-black font-poppins">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <img src={Grid} alt="Menu" className="w-6 h-6" />
        </div>
        <div className="flex items-center space-x-4">
          <img src={Search} alt="Search" className="w-6 h-6" />
          <img src={Bell} alt="Notifications" className="w-6 h-6" />
        </div>
      </header>

      {/* Greeting */}
      <section className="px-4 mb-4">
        <h1 className="text-xl font-semibold">Good morning, Matt,</h1>
        <p className="text-lg">How do you feel today</p>
      </section>

      {/* Mood Chart */}
      <section className="px-4 mb-4">
        <MoodChart />
      </section>

      {/* Mood History */}
      <section className="px-4 mb-4">
        <MoodHistoryCard />
      </section>

      {/* Data Insights */}
      <section className="px-4 mb-20">
        <DataInsights />
      </section>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </div>
  );
};

export default DashboardPage;
