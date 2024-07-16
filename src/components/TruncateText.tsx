import React from 'react'
interface TruncateTextProp {
    children : string;
    maxLength: number;
}
const TruncateText: React.FC<TruncateTextProp> = ({ children, maxLength }) => {
    const truncate = (text: string, maxLength: number) => {
        return text.length < maxLength
            ? text
            : text.slice(0, maxLength) + "...";
    }
    return (
        <span>
            {truncate(children, maxLength)}
        </span>
    )
}

export default TruncateText