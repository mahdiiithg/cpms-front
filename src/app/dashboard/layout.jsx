import SessionWrapper from '../../components/shared/SessionWrapper';
import Header from '../../components/ui/Header';

const DashboardLayout = (props) => {
  return (
    <SessionWrapper>
      <div className="flex h-screen flex-col overflow-y-auto bg-white p-3">
        <Header />
        {props.children}
      </div>
    </SessionWrapper>
  );
};

export default DashboardLayout;
