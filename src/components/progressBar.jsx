import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from "@mui/material";

export default function ProgressBar({
    doneTodos,
}) {

    useEffect(() => {
        if (doneTodos.length === 0 )
            setShowProgressNumber( 0 )
        else if (doneTodos.length%5 === 0) {
            setShowProgressNumber(100)
            setIsConfettiVisible(true);
            setTimeout(() => {
                setShowProgressNumber(0);
                setIsConfettiVisible(false)
              }, 1500);}
        else{
            setShowProgressNumber( doneTodos.length%5 * 20)
        }
    }, [doneTodos])

    //const { width, height } = useWindowSize()
    const [showProgressNumber, setShowProgressNumber] = useState(0)
    const [isConfettiVisible, setIsConfettiVisible] = useState(false);

    return (
        <div className="flex flex-col justify-center" >
            {isConfettiVisible
            &&
            <Confetti
            width={1900}
            height={500}
                confettiSource={{x: 730, y: 60, w: 30, h:0}}
            />
            }
            <div className="flex flex-row justify-between" >
                <p>Score: {doneTodos.length}</p>
                <button
                    className="inline-flex justify-center rounded-md border p-1 border-transparent items-center bg-violet-100 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => console.log(allTodos)}
                > Progress</button>
            </div>

            <div className="flex flex-row gap-2 items-center">
                <img alt="emptybadge" src='./images/emptybadge.png' className="h-8"></img>
                <Box className="w-36">
                    <LinearProgress variant="determinate" value={showProgressNumber} />
                </Box>
                <img alt="badge" src='./images/medail.png' className="h-8"></img>

            </div>

        </div>
    )
}