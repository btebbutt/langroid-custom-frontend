import React from 'react';

interface StatusIndicatorProps {
    status: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
    return (
        <div
            className="justify-center items-center self-stretch px-2 my-auto h-6 font-bold text-right text-red-700 border-red-700 border-solid aspect-square border-[0.639px] leading-[92%] rounded-[127.778px]"
            role="button"
            tabIndex={0}
            aria-label={status === '?' ? 'Status unknown' : `Status: ${status}`}
        >
            {status}
        </div>
    );
};

export default StatusIndicator;
