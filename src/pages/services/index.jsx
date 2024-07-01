import { Button } from '@mui/material'
import {ServiceTable} from '@ui'
import {Service} from '@modal'
import { useEffect, useState } from 'react';
import { service } from '@service';
const Index = () =>{
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])

    const  getData = async()=>{
        try {
            const response = await service.get()
            if(response.status === 200 && response?.data?.services){
                setData(response?.data?.services)
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getData()
    })
    return(
    <>
    <Service open={open} handleClose={()=>setOpen(false)} />    
    <div className="flex flex-col gap-4">
        <div className="flex justify-end">
            <Button variant='contained' type="primary" onClick={()=>setOpen(true)} >ADD</Button>
        </div>
        <ServiceTable data={data}/>
    </div>
    </>
    )
}
export default Index