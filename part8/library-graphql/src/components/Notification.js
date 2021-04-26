const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <div>
      <span style={{ color: 'red' }}>{message}</span>
    </div>
  );
};

export default Notification;
