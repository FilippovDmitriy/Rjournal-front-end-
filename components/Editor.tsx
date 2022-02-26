import React, {useEffect} from 'react';
import EditorJS, {OutputData} from '@editorjs/editorjs';

type Props = {
    setBlocks: (blocks: OutputData['blocks']) => void
    initialBlocks?: OutputData['blocks']
}

const SimpleImage = require('@editorjs/simple-image');

const Editor: React.FC<Props> = ({setBlocks, initialBlocks}) => {

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            tools: {
                image: SimpleImage,
            },
            data: {
                // @ts-ignore
              blocks: initialBlocks,
            },
            placeholder: 'Введите текст вашей статьи',
            async onChange() {
                const { blocks } = await editor.save();
                setBlocks(blocks);
            }
        });

        return () => {
            editor.isReady.then(() => {
                editor.destroy();
            }).catch(e => console.log('ERROR editor cleanup', e));
        }
    }, []);

    return (
        <div id='editor'/>
    );
};

export default Editor;
