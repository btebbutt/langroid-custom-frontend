import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
    useChatInteract,
    useChatMessages,
    IStep,
} from "@chainlit/react-client";



export function Playground() {
    const [inputValue, setInputValue] = useState("");
    const { sendMessage } = useChatInteract();
    const { messages } = useChatMessages();

    const handleSendMessage = () => {
        const content = inputValue.trim();
        if (content) {
            const message: IStep = {
                id: uuidv4(),
                name: "user",
                type: "user_message",
                output: content,
                createdAt: new Date().toISOString(),
            };
            sendMessage(message, []);
            setInputValue("");
        }
    };

    const renderMessage = (message: IStep) => {
        const dateOptions: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
        };
        const date = new Date(message.createdAt).toLocaleTimeString(undefined, dateOptions);
        return (
            <div key={message.id} className="flex items-start space-x-2">
                <div className="w-20 text-sm text-green-500">{message.name}</div>
                <div className="flex-1 border rounded-lg p-2">
                    <p className="text-black dark:text-white">{message.output}</p>
                    <small className="text-xs text-gray-500">{date}</small>
                </div>
            </div>
        );
    };

    return (
        // Apply the scrollable container to the entire Playground
        <div className="playground-container bg-gray-100 dark:bg-gray-900 flex flex-col" style={{ borderRadius: '10px' }}>

            <div style={{ backgroundColor: '#d00404', height: '50px' }}>
                {/* Add your content for the red section here */}
            </div>

            <div className="flex-1 overflow-auto p-6">
                <div className="space-y-4">
                    {messages.map((message) => renderMessage(message))}
                </div>
            </div>
            <div className="border-t p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                    <Input
                        autoFocus
                        className="flex-1"
                        id="message-input"
                        placeholder="Type a message"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button onClick={handleSendMessage} type="submit">
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
}
