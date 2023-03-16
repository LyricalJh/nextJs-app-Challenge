import Image from "next/image";
import type {NextPage} from "next";
import { useEffect, useState } from "react";
import Link from "next/link";

interface DataInfo {
    id: string;
    name: string;
    squareImage: string;
    netWorth: number;
    industries:[]

}

const Home: NextPage = () => {
  const [data,setData] = useState<DataInfo[]>([]);
  const [money, setMoney] = useState(Object);
  const numberFormat2 = new Intl.NumberFormat('en',  {notation: 'compact'});
  useEffect(() => {
    fetch(`https://billions-api.nomadcoders.workers.dev/`).then(response => response.json()).then(json => setData(json));
  },[])

  return (
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4 mt-24">

          {data && data?.slice(0,40).map((data) => 
          
          <div key={data?.id} className="flex flex-col border w-50 rounded-md p-2">
            <Link href={`/person/${data.id}`}>
            <Image className="rounded-md" src={data?.squareImage} width={340} height={400} alt={""} />
            </Link>
            <h1 className="text-lg font-medium mt-4">{data.name}</h1>
            <span className="text-sm font-medium">{numberFormat2.format(Number(data?.netWorth))} / {data.industries}</span>
          </div>
          )}
        </div>
      </div> 
  )
}

export default Home;