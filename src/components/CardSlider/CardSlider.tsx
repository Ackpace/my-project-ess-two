import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import Loader from "../../components/Loader/Loader";
import Button, { ButtonTypes } from "../Button/Button";
import "./card-slider.scss";
 
interface CardSliderProps {
  children: JSX.Element[] | JSX.Element | undefined;
  isLoading: boolean;
}

const getWindowSize = () => {
  const { innerWidth } = window;
  return innerWidth;
};

const CardSlider = ({ children, isLoading }: CardSliderProps) => {
  const [windowSize, setWindowSize] = useState(getWindowSize);
  const [offset, setOffset] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const contentsRef = useRef<HTMLDivElement>(null);

  // called initially
  useEffect(() => {
    setScrollX(contentsRef.current?.scrollLeft ?? -1);
    // Update the state with new window width
    const handleResize = () => {
      setWindowSize(getWindowSize);
    };

    // Add a listener
    window.addEventListener("resize", handleResize);

    // Clean up the listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const refObject = contentsRef.current;
    refObject!.scrollLeft = scrollX;
    setIsScrollEnd(refObject!.scrollWidth <= scrollX + offset + 66);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollX]);

  const scroll = (scrollOffset: number) => {
    setOffset(scrollOffset);
    const refObject = contentsRef.current;

    if (refObject!.scrollWidth > scrollX + 66) {
      setScrollX(scrollX + scrollOffset ?? -1);
    }
  };

  return (
    <div className="card-slider-container">
      {
        // scrollX round down bc it could be sth like 0.2
        Math.floor(scrollX) > 0 ? (
          <div className="scroll-button left">
            <Button
              type={ButtonTypes.circle}
              onClick={() => scroll((windowSize / 2) * -1)}
              children={<FontAwesomeIcon icon={faAngleLeft} />}
            />
          </div>
        ) : null
      } 

      <div className="contents space-x-4" ref={contentsRef}>
        {isLoading ? <Loader /> : children}
      </div>

      {!isScrollEnd && (
        <div className="scroll-button right">
          <Button
            type={ButtonTypes.circle}
            onClick={() => scroll(windowSize / 2)}
            children={<FontAwesomeIcon icon={faAngleRight} />}
          />
        </div>

      )}
    </div>
  );
};

export default CardSlider;

CardSlider.defaultProps = {
  isLoading: false
}