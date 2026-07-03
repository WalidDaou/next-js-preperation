// app/about/page.tsx
'use client'


import useApiRequest from "@/hooks/useApiRequest";
import {useApi} from "@/hooks/api";
import {useEffect, useState} from 'react'
import Stringifier from "postcss/lib/stringifier";

const Page = () => {

    const {get, loading} = useApi();

    const [result, setResult] = useState<any>(null)


    useEffect(() => {
        const testCall = async () => {
            const data = await get('/test')
            setResult(data)
        }


        testCall()

    }, [])


    async function getData(url: string): Promise<any> {

        try {


            const responce = await fetch(url, {method: 'get'})

            if (!responce.ok) {
                throw new Error(`Error  ${responce?.status}`)
            }

            const data = await responce?.json()
            return data;

        } catch (e) {
            console.error(e)
        }

    }


    const [array, setArray] = useState<object[]>([])


    const getdataTwo = async () => {

    }

    return (
        <div>

            hello

            {array && array?.length > 0 && array.map((item: object, index: number) => (

                <div key={index}>

                </div>

            ))}

            {loading ? <p>Loading...</p> : <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    )
}

export default Page