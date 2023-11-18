import { NavLink } from "react-router-dom";
import classNames from "classnames";
import "./button.scss";

export enum ButtonTypes {
  gradientFill,
  noBorder,
  circle,
  avatar
}

export enum ButtonSizes {
  small = 'small',
  medium = 'medium',
}

interface ButtonProps {
  linkTo?: string;
  children?: JSX.Element | string | null;
  type?: ButtonTypes
  size?: ButtonSizes
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Button = (props: ButtonProps) => {
  const buttonClasses = classNames(
    'button',
    { 'medium-size': props.size === ButtonSizes.medium },
    { 'small-size': props.size === ButtonSizes.small },
    { 'nav-link': props.linkTo },
    { 'gradient-fill': props.type === ButtonTypes.gradientFill },
    { 'circle': props.type === ButtonTypes.circle },
    { 'avatar': props.type === ButtonTypes.avatar },
    { 'no-border': props.type === ButtonTypes.noBorder }
  )

  return props.linkTo ? (
    <div className='relative'
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <NavLink className={buttonClasses} to={props.linkTo}>
        {props.children}
      </NavLink>
    </div> 
  ) : (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
