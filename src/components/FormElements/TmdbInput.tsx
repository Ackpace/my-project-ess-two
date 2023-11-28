import { useState } from 'react'
import classNames from "classnames";
import './tmdb-input.scss';
 
export enum InputTypes {
    text = 'text',
    email = 'email',
    password = 'password',
    file = 'file'
}

interface TmdbInputProps {
    type: InputTypes,
    placeholder?: string,
    id?: string,
    label?: string,
    isHiddenInput?: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TmdbInput(props: TmdbInputProps) {
    const [isInputFocused, setisInputFocused] = useState(false)

    const labelClasses = classNames(
        'input-label',
        { 'hidden-input-label': props.isHiddenInput },
        { 'focused': isInputFocused }
    )
    return (
        <div className='imdb-input-container'>
            {(props.label || (props.isHiddenInput && !props.label)) && <label className={labelClasses} htmlFor='tmdb-input'>{props.label}</label>}
            <input
                className='tmdb-input'
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                id={props.isHiddenInput ? 'tmdb-input' : props.id}
                hidden={props.isHiddenInput}
                onFocus={() => { setisInputFocused(true) }}
                onBlur={() => { setisInputFocused(false) }}
            />
        </div>
    )
} 

export default TmdbInput