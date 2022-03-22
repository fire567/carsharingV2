import React, { useState, useEffect, useRef} from "react";
import classes from "./LocationInput.module.css";

const LocationInput = ({label, placeholder, setText, text, items, disabled}) => {
    const [dropdown, setDropDown] = useState(false)
    const ref = useRef(null)

    const inputHandler = (text) => {
        setText(text)
    }

    useEffect(() => {
        const dropDownHandler = (event) => {
            ref.current.contains(event.target) ? setDropDown(true) : setDropDown(false)
        }

        document.addEventListener("mousedown", dropDownHandler);
        return () => {
            document.removeEventListener("mousedown", dropDownHandler);
        };
    }, [])

    useEffect(() => {
        if(disabled){
            setText("")
        }
    }, [disabled])

    const dropdownHandler = (text) => {
        setText(text)
        setDropDown(false)
    }

    const deleteTextHandler = () => {
        setText("")
        setDropDown(false)
    }

    return(
        <div className={classes.input_form}>
            <label>{label}</label>
            <div className={classes.input_ref} ref={ref}>
                <input 
                    className={classes.input} 
                    onChange={(event) => inputHandler(event.target.value)} 
                    value={text}
                    onClick={() => setDropDown(true)}
                    disabled={disabled}
                    placeholder={`Начните вводить ${placeholder} ...`}>
                </input>
                {text ? 
                    <span className={classes.close} onClick={() => deleteTextHandler()}></span> : null
                }
                {dropdown && !disabled ?
                    <div className={classes.dropdown}>
                        {items.map((item) => (
                            <li className={classes.current_item} key={item.id} onClick={() => dropdownHandler(item.address ? item.address : item.name)}>
                                {item.address ? item.address : item.name}
                            </li>
                        ))}
                    </div> : null
                }
            </div>
        </div>
    )
}

export default LocationInput;