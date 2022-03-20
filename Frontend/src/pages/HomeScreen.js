import React from 'react';

import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Content from '../layout/Content';
import Footer from '../layout/Footer';

const Dashboard = () => {
  return (
    <div className='d-flex flex-column justify-content-between'>
      <Header />
      <Sidebar />
      <Content />
      <Footer />
    </div>
  );
};

export default Dashboard;
