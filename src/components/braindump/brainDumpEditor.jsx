import { Editor } from "novel-lightweight";
import { useState } from "react";

export default function BrainDumpEditor() {
  const [data, setData] = useState('');
//   (`

//   ## Dit is een plaats waar je kan schrijven wat je wil

//   ### **Het werkt zoals notion** 

//   druk op de lijn hieronder en gebruik '/' voor commandos



//   Je kan ook gewoon in markdown typen als je dat kent, maar is niet verplicht

//   je kan je *elementen* selecteren en **bewerken** zoals je zelf dat wilt

//   - je kan dus ook bulletpoints maken onder andere
//   - Een ander puntje

//   of ook

//   1. een numbered list maken
//   2. een tweede onderdeel

//   ## Zelfs een todo list

//   - [ ] Vuilbakken buiten zetten

//   - [ ] katten eten geven

//   - [ ] deze lijst checken

//   Je kan zelf code snippets hierin steken!

//   \`\`\`
//   // Code snippet van deze drawer
//   <Drawer> 
//     <Sheet>
//       <ModalClose />
//       <DialogTitle> Brain Dump</DialogTitle>
//         <Divider />
//         <DialogContent>
//           <BrainDumpEditor/>
//         </DialogContent>   
//     </Sheet>
//   </Drawer>
//   \`\`\`
// `);

  return (
    <Editor
      className="rounded-md bg-slate-50 border border-slate-200"
      defaultValue={data}
      disableLocalStorage={false}
      onUpdate={(editor) => {
        setData(editor?.storage.markdown.getMarkdown());
      }}
      spell

    />
  );
}



/*

## Dit is een plaats waar je kan schrijven wat je wil

### Het werkt zoals notion 

- je kan dus ook bulletpoints maken onder andere
- Een ander puntje 

of ook

1. een numbered list maken
2. een tweede onderdeel

## Zelfs een todo list

- [ ] Vuilbakken buiten zetten

- [ ] katten eten geven

- [ ] deze lijst checken

*/