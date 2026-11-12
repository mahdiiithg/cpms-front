import Header from '@/components/Header';
import { pageSurfaceClass } from '@/lib/brandTheme';

const DashboardLayout = ({ children }) => {
  return (
    <div className={`${pageSurfaceClass} flex min-h-screen flex-col`}>
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
