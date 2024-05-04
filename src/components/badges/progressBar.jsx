import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from "@mui/material";
import ConfettiPoppers from '@/components/badges/confettiPoppers';
import Image from 'next/image';
import CongratulationDialog from '@/components/badges/congratulationDialog';
import BadgeCollecion from '@/components/badges/badgeCollection'

export default function ProgressBar({ doneTodos }) {
    useEffect(() => {
        if (doneTodos.length === 0)
            setShowProgressNumber(0)
        else if (doneTodos.length % 5 === 0) {
            setShowProgressNumber(100)
            setIsConfettiVisible(true);
            setShowCongratulations(true)
            setLevel(Math.floor(doneTodos.length / 5))
            setTimeout(() => {
                setShowProgressNumber(doneTodos.length % 5 * 20);
                setIsConfettiVisible(false)
            }, 1500);
        }
        else {
            setShowProgressNumber(doneTodos.length % 5 * 20)
        }
    }, [doneTodos])

    const [showProgressNumber, setShowProgressNumber] = useState(0)
    const [isConfettiVisible, setIsConfettiVisible] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [level, setLevel] = useState(0);
    const [openCollection, setOpenCollection] = useState(false);

    return (
        <>
            {isConfettiVisible
                &&
                <ConfettiPoppers />
            }

            <div className="flex flex-col justify-center" >
                <div className="flex flex-row justify-between mx-5 mb-1">
                    {level < 5 && <div>
                        Level: {level}
                    </div>}
                    <button
                        className="inline-flex justify-center rounded-md border w-fit py-1 px-3 border-transparent items-center bg-violet-100 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setOpenCollection(true)}
                    >
                        Verzameling
                    </button>
                </div>

                {level >= 5 ?
                    <div className='flex justify-center mt-1'>
                        <Image alt="max" width={100} height={100} src={`/images/badgelvl${level}.png`} />
                    </div>
                    :
                    <div className="flex flex-row gap-1 items-center">
                        <Image alt="current" width={80} height={80} src={`/images/badgelvl${level}.png`} />
                        <Box className="w-36">
                            <LinearProgress variant="determinate" value={showProgressNumber} />
                        </Box>
                        <Image alt="next" width={80} height={80} src={`/images/badgelvl${level + 1}.png`} />

                    </div>
                }

                <CongratulationDialog {...{ showCongratulations, setShowCongratulations, level }} />
                <BadgeCollecion {...{ openCollection, setOpenCollection, level }}></BadgeCollecion>
            </div>
        </>
    )
}