import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';
import BrainDumpEditor from '@/components//braindump/brainDumpEditor'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function BrainDumpDrawer({ openDrawer, setOpenDrawer }) {

    return (
        <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            anchor='right'
            size='lg'
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
                <DialogTitle className="text-violet-800" >Brain Dump</DialogTitle>
                <Divider sx={{ mt: 'auto', background: 'darkviolet' }} />
                <DialogContent>
                    <div className='flex flex-row justify-between w-full p-2'>
                        <ChevronLeftIcon />
                        <p className='pb-2'>Vandaag</p>
                        <ChevronRightIcon />
                    </div>
                    <BrainDumpEditor />
                </DialogContent>
            </Sheet>
        </Drawer>
    )

}