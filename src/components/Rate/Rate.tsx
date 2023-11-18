import './rate.scss'

export enum SizeType {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

interface Props {
    rate: number;
    size: SizeType
}

const Rate = ({ rate, size }: Props) => {

    const getPercentage = (num: number): number => {
        return Math.round(num * 10)
    }

    return (
        <div className={`c100 p${getPercentage(rate)} ${size} ${getPercentage(rate) < 70 ? 'orange' : ''}`}>
            <span>{getPercentage(rate)}%</span>
            <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
            </div>
        </div>
    );
}; 

Rate.defaultProps = {
    rate: 0,
    size: SizeType.small
}

export default Rate;
