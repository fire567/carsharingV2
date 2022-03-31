import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import classes from './LocationInput.module.css';

const LocationInput = ({
  label,
  placeholder,
  setText,
  text,
  items,
  disabled,
}) => {
  const [dropdown, setDropDown] = useState(false);
  const ref = useRef(null);

  const inputHandler = (word) => {
    setText(word);
  };

  useEffect(() => {
    const dropDownHandler = (event) => {
      ref.current.contains(event.target)
        ? setDropDown(true)
        : setDropDown(false);
    };

    document.addEventListener('mousedown', dropDownHandler);
    return () => {
      document.removeEventListener('mousedown', dropDownHandler);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      setText('');
    }
  }, [disabled, setText]);

  const dropdownHandler = (word) => {
    setText(word);
    setDropDown(false);
  };

  const deleteTextHandler = () => {
    setText('');
    setDropDown(false);
  };

  return (
    <div className={classes.input_form}>
      <label>{label}</label>
      <div className={classes.input_ref} ref={ref}>
        <input
          className={classes.input}
          onChange={(event) => inputHandler(event.target.value)}
          value={text}
          onClick={() => setDropDown(true)}
          disabled={disabled}
          placeholder={`Начните вводить ${placeholder} ...`}
        />
        {text && <span className={classes.close} onClick={deleteTextHandler} />}
        {dropdown && !disabled && (
          <div
            className={classNames(classes.dropdown, {
              [classes.dropdown_filled]: items.length > 0,
              [classes.dropdown_empty]: items.length === 0,
            })}
          >
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  className={classes.current_item}
                  key={item.id}
                  onClick={() => dropdownHandler(item.address ? item.address : item.name)
                  }
                >
                  {item.address ? item.address : item.name}
                </li>
              ))
            ) : (
              <li
                className={classNames(classes.current_item, {
                  [classes.current_item_filled]: items.length > 0,
                  [classes.current_item_empty]: items.length === 0,
                })}
              >
                Нет доступных пунктов
              </li>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInput;
