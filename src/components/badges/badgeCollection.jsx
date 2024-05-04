import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import Image from 'next/image';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function BadgeCollecion({ openCollection, setOpenCollection, level }) {

    return (
        <Drawer
            open={openCollection}
            onClose={() => setOpenCollection(false)}
            anchor='left'
            size='sm'
            slotProps={{
                content: {
                    sx: {
                        bgcolor: 'transparent',
                        p: { md: 3, sm: 0 },
                        boxShadow: 'none',
                    },
                },
            }}
        >
            <Sheet
                sx={{
                    borderRadius: 'md',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    height: '100%',
                    overflow: 'auto',
                }}
            >
                <ModalClose />
                <DialogTitle className="text-violet-800" >Badge verzameling</DialogTitle>
                <Divider sx={{ mt: 'auto', background: 'darkviolet' }} />
                <DialogContent className="flex w-full flex-col items-center">
                    <div className='w-full'>
                        {level === 0 ?
                            <div> Je hebt momenteel nog geen badges... </div> :
                            <div> Jouw badges: </div>
                        }
                    </div>
                    <List>
                        {Array.from({ length: level }, (v, i) => (
                            <ListItem key={i}>
                                <Image alt="badge" width={180} height={180} src={`/images/badgelvl${i + 1}.png`} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Sheet>
        </Drawer>
    )

}