import React from 'react';
import StatusIndicator from "@/components/statusIndicator"; // Ensure this path matches your file structure

interface AlertComponentProps {
    logoUrl: string;
    alertText: string;
    status: string;
    amount: number;
    setAmount: (amount: number) => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({ logoUrl, alertText, status, amount, setAmount }) => {
    return (
        <section className="flex justify-between items-center px-6 py-3 ml-16 max-w-full whitespace-nowrap border-solid border-b-[0.5px] border-b-black w-[522px] md:flex-wrap md:px-5">
            <div className="flex gap-3 items-center pr-20 text-base">
                <img
                    loading="lazy"
                    src={logoUrl}
                    className="w-8 h-8" // Adjusted to ensure the image does not stretch
                    alt={alertText}
                />
                <div className="text-black uppercase leading-[150%]">
                    {alertText}
                </div>
                <StatusIndicator status={status} />
            </div>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="py-2 pl-3 pr-3 text-sm leading-6 text-right text-black bg-white rounded border-black border-solid border-[0.5px] w-full max-w-xs" // Adjusted styles for input
                style={{ textAlign: 'left' }} // Ensure text aligns left within the input
            />
        </section>
    );
};

export default AlertComponent;
