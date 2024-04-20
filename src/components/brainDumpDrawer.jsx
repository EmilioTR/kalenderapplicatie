import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Sheet from '@mui/joy/Sheet';
import Divider from '@mui/joy/Divider';


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
                <DialogContent sx={{ gap: 2, p: 1 }}>
                    what a crawy night
                    
                </DialogContent>
            </Sheet>
        </Drawer>
    )

}