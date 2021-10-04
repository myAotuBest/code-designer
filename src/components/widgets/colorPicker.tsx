import React, { useState, useCallback } from 'react';
import { SketchPicker } from 'react-color';
import styles from './colorPicker.less';
interface IProps {
  onChange: Function;
  color?: string;
}

const ColorPicker: React.FC<IProps> = (props) => {
  const [displayColorPicker, setSisplayColorPicker] = useState(false);
  const [color, setColor] = useState(props?.color || 'black');

  const handleClick = () => {
    setSisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setSisplayColorPicker(false);
  };

  const handleChange = useCallback(
    (color) => {
      setColor(color.hex);
      props.onChange(color.hex);
    },
    [color]
  );

  return (
    <div>
      <div
        className={styles.swatch}
        style={{ background: color }}
        onClick={handleClick}
      >
        <div className={styles.color} />
      </div>
      {displayColorPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
