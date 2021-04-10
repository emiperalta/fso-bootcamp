import { forwardRef, useImperativeHandle, useState } from 'react';

const Toggable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisible = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisible };
  });

  return (
    <>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </span>

      <span style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </span>
    </>
  );
});

export default Toggable;
