import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface ProtokollEditorProps {
    content: string|undefined;
    setContent: (content: string) => void;
    onSave: () => void;
}

const ProtokollEditor: React.FC<ProtokollEditorProps> = ({ content, setContent, onSave }) => {
    return (
        <div>
            <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Schreibe hier dein Protokoll..."
                theme="snow"
            />
            <button onClick={()=>onSave(content)}>Speichern</button>
        </div>
    );
};

export default ProtokollEditor;