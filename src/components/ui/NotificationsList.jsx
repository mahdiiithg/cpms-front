import NotificationItem from './NotificationItem';

const NotificationsList = ({ messages }) => {
  return (
    <>
      {messages.length > 0 ? (
        messages.map((notif) => (
          <NotificationItem key={notif.id} notif={notif} />
        ))
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center text-center text-gray-400">
          <h2 className="text-lg font-semibold md:text-xl">No Notifications</h2>
          <p className="text-sm text-gray-500 md:text-base">
            You’re all caught up! New updates will show here.
          </p>
        </div>
      )}
    </>
  );
};

export default NotificationsList;
