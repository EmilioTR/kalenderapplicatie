import React, { useEffect, useState } from 'react'

import LinearProgress from '@mui/material/LinearProgress';
import { Box } from "@mui/material";

import ConfettiPoppers from '@/components/badges/confettiPoppers';
import Image from 'next/image';
import CongratulationDialog from '@/components/badges/congratulationDialog'; 

export default function ProgressBar({
    doneTodos,
}) {

    useEffect(() => {
        if (doneTodos.length === 0 )
            setShowProgressNumber( 0 )
        else if (doneTodos.length%5 === 0) {
            setShowProgressNumber(100)
            setIsConfettiVisible(true);
            setShowCongratulations(true)
            setLevel(Math.floor(doneTodos.length/5))
            setTimeout(() => {
                setShowProgressNumber(doneTodos.length%5 * 20);
                setIsConfettiVisible(false)
              }, 1500);}
        else{
            setShowProgressNumber( doneTodos.length%5 * 20)
        }
    }, [doneTodos])

    //const { width, height } = useWindowSize()
    const [showProgressNumber, setShowProgressNumber] = useState(0)
    const [isConfettiVisible, setIsConfettiVisible] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [level, setLevel] = useState(0);


    return (
        <>
        {isConfettiVisible
            &&
            <ConfettiPoppers/>
        }

        <div className="flex flex-col justify-center" >
            
            {/* <div className="flex flex-row justify-between" >
                <p>Score: {doneTodos.length}</p> */}
                {/* <button
                    className="inline-flex justify-center rounded-md border p-1 border-transparent items-center bg-violet-100 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => console.log(allTodos)}
                    > Progress
                </button> */}
            {/* </div> */}

            <div className="flex flex-row gap-1 items-center">
                <Image alt="current" width={80} height={80}  src={`/images/badgelvl${level}.png`} />
                <Box className="w-36">
                    <LinearProgress variant="determinate" value={showProgressNumber} />
                </Box>
                <Image alt="next" width={80} height={80} src={`/images/badgelvl${level + 1}.png`} />

            </div>
                <CongratulationDialog {...{ showCongratulations, setShowCongratulations, level }} />
        </div>
    </>
    )
}