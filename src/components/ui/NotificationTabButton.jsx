import { Button } from 'antd';

const NotificationTabButton = ({
  isActive,
  text,
  onClick,
  isMobileSize = false,
}) => {
  return (
    <Button
      className={`${isMobileSize ? 'w-18' : 'w-24'} uppercase min-w-fit`}
      style={{
        borderRadius: '9999px',
        background: isActive ? '#85E872' : '#FAFAFA',
        fontSize: isMobileSize ? 12 : 16,
      }}
      onClick={() => onClick(text)}
      type="text"
    >
      {text}
    </Button>
  );
};

export default NotificationTabButton;
