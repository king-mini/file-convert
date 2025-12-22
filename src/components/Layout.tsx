import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MetaUpdater from './MetaUpdater';
import Loading from './Loading';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  // lang logic removed as it was only for Footer

  return (
    <div className="layout">
      <MetaUpdater />
      <Header />
      <main className="layout-main">
        <Suspense fallback={<Loading />}>
          {children || <Outlet />}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
