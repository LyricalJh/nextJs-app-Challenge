import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Assets {
    exchange:string;
    ticker:string;
    companyName:string;
    numberOfShares:number;
    sharePrice:number;
    currencyCode:string;
    exchangeRate:number;
    interactive:boolean;
    currentPrice:number;
    exerciseOptionPrice?:number;
}

interface RichesInfo {
    id:string;
    state:string;
    city:string;
    name:string;
    country:string;
    position:number;
    financialAssets:Assets[]
    thumbnail:string;
    squareImage:string;
    bio:string[];
    about:string[];
    netWorth:number;
    industries:string[];
}

export default function Riches(){
    const router = useRouter();
    const [data,setData] = useState<RichesInfo>();
    useEffect(()=> {
        if(router.query.id){
            fetch(`https://billions-api.nomadcoders.workers.dev/person/${router.query.id}`)
            .then(response => response.json())
            .then(json => setData(json));
        }
    },[router])
    console.log(data);
    return (
        <>
        <div className="flex justify-center rounded-md items-center ml-36 mt-32 bg-orange-50 w-5/6 p-6">
            <div className="flex flex-col ml-10 mt-10">
            <Image className="" src={data?.squareImage ? data?.squareImage : ""} width={400} height={600} alt={""} />
            <h1 className="font-medium text-2xl mt-5">{data?.name}</h1>
            <span className="font-medium text-lg mt-2">{data?.netWorth}</span>
            <span className="font-medium text-lg mt-2">{data?.country}</span>
            <span className="font-medium text-lg mt-2">{data?.industries}</span>
            <p className="font-medium text-base mt-2">{data?.bio}</p>
            </div>
        </div>

        <div className="flex flex-col rounded-md mt-10 ml-36 mb-10 bg-orange-50 w-5/6 p-6">
            <h1 className="text-2xl font-medium">FinancialAssets</h1>
            <div className="grid grid-cols-4 gap-4">
                {data && data?.financialAssets?.map((data,index) => <div className="flex flex-col w-48  mt-6 border-2 rounded-md border-slate-500 p-2" key={index}>
                    <span>Tickers : {data?.ticker}</span>
                    <span>CompanyName : {data.companyName}</span>
                    <span>sharePrice : {data?.sharePrice}</span>
                    <span>exchangeRate : {data?.exchangeRate}</span>
                </div>)}
            </div>
        </div>
        </>
    )
}