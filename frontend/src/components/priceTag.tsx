import React from 'react';

interface PriceTagProps {
    amount: number | string;
}

const PriceTag: React.FC<PriceTagProps> = ({ amount }) => {
    return (
        <div className="justify-center items-end py-2 pl-16 text-sm leading-6 text-right text-black bg-white rounded border-black border-solid border-[0.5px]">
            ${amount}
        </div>
    );
};

export default PriceTag;
