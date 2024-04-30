import { useEffect } from "react";
import { useState } from "react";
import { ChainlitAPI, sessionState, useChatSession } from "@chainlit/react-client";
import { Playground } from "./components/playground";
import { useRecoilValue } from "recoil";


import Header from "@/components/header";
import Banner from "@/components/banner";
import AlertComponent from "@/components/alertComponent";

const CHAINLIT_SERVER = "http://localhost:8000";
const userEnv = {};

const apiClient = new ChainlitAPI(CHAINLIT_SERVER);

interface Amounts {
    [key: string]: number;
}
function App() {
    const { connect } = useChatSession();
    const session = useRecoilValue(sessionState);

    useEffect(() => {
        if (session?.socket.connected) {
            return;
        }
        fetch(apiClient.buildEndpoint('/custom-auth'))
            .then((res) => res.json())
            .then((data) => {
                connect({ client: apiClient, userEnv, accessToken: `Bearer: ${data.token}` });
            });
    }, [session, connect]);

    // Initialize state to manage multiple amounts
    const [amounts, setAmounts] = useState<Amounts>({});

    // Function to update individual amount
    const setAmount = (id: string, value: number) => {
        setAmounts((prevAmounts) => ({
            ...prevAmounts,
            [id]: value,
        }));




    };



    return (
        <>


            <Header />
            <Banner />
            <div className="relative" style={{ marginTop: '40px' }}>
                <div className="absolute left-20">
                    <div className="flex flex-col">
                        <header className="text-2xl font-bold leading-8 text-black pl-16">
                            <h1>Your Personalised Package:</h1>
                        </header>
                        <AlertComponent
                            logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/be051a227710fa99e9efda725e8d0dc36c64fad96e941813d07d6250884eadb2?apiKey=b1f64df9aada44c6ba1728b031344f7b&"
                            alertText="PUBLIC & PRODUCT LIABILITY"
                            status="?"
                            amount={amounts['publicLiability'] || 0}
                            setAmount={(value) => setAmount('publicLiability', value)}
                        />
                        <AlertComponent
                            logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/fb7d406f3707aefeb694b288abea645b643e28df498e96faa3a88f8ae3b4f096?apiKey=b1f64df9aada44c6ba1728b031344f7b&"
                            alertText="FIRE AND ACCIDENTAL DAMAGE"
                            status="?"
                            amount={amounts['fireDamage'] || 0}
                            setAmount={(value) => setAmount('fireDamage', value)}
                        />
                        <AlertComponent
                            logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/af6837406a2497c1255b86413c1138e2c55b3fc5c643e05f560bafd57e9bd20b?apiKey=b1f64df9aada44c6ba1728b031344f7b&"
                            alertText="GLASS"
                            status="?"
                            amount={amounts['glass'] || 0}
                            setAmount={(value) => setAmount('glass', value)}
                        />
                        <AlertComponent
                            logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/a7ffd8559e286d4d85db00334a22a1a956d9835240ad8d97e82af98af62a149e?apiKey=b1f64df9aada44c6ba1728b031344f7b&"
                            alertText="PERSONAL EQUIPMENT"
                            status="?"
                            amount={amounts['personalEquipment'] || 0}
                            setAmount={(value) => setAmount('personalEquipment', value)}
                        />
                        <AlertComponent
                            logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/89dc158bec91bc71c7b35c5b9752238d239eb70b38f3256e62653dee21b33b55?apiKey=b1f64df9aada44c6ba1728b031344f7b&"
                            alertText="THEFT"
                            status="?"
                            amount={amounts['theft'] || 0}
                            setAmount={(value) => setAmount('theft', value)}
                        />
                    </div>

                    <button className="justify-center items-center px-16 py-4 mt-3 ml-16 max-w-full text-base font-bold text-center text-lime-900 whitespace-nowrap rounded border border-solid border-[color:var(--Color-Functional-Primary--Dark,#558000)] w-[522px] max-md:px-5">
                        Go to quote
                    </button>

                    <button className="flex gap-2.5 justify-center px-5 py-2.5 mt-60 ml-16 text-base font-bold text-center text-lime-700 whitespace-nowrap bg-white rounded border border-solid border-[color:var(--Color-Functional-Primary--Dark,#558000)] max-md:mt-10 max-md:ml-2.5 items-center">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/91c9b9f5d1f2a509afd2c46fab93912852f90f3b085e3f35ce1e33c252fedf1b?apiKey=b1f64df9aada44c6ba1728b031344f7b&" alt="" className="w-4 aspect-square" />
                        Back to packages
                    </button>


            </div>
            </div>


            <div className="playground-container">
                <Playground />
            </div>




        </>
    );
}

export default App;