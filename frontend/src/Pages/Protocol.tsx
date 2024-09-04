import React from 'react';
import axios from 'axios';
import ProtokollEditor from '../types/ProtokollEditor';
import useLocalStorageState from "use-local-storage-state";

const Protocol: React.FC = () => {
    const [content, setContent] = useLocalStorageState<string>('');
    const handleSave = async (content: string) => {
        try {
            await axios.post('/api/saveDocument', { content });
            alert('Dokument erfolgreich gespeichert!');
        } catch (error) {
            console.error('Fehler beim Speichern des Dokuments:', error);
            alert('Fehler beim Speichern des Dokuments.');
        }
    };

    const handleExportToPdf = async () => {
        try {
            const response = await axios.post('/api/exportToPdf', { content }, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'protokoll.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Fehler beim Exportieren des Dokuments als PDF:', error);
            alert('Fehler beim Exportieren des Dokuments als PDF.');
        }
    };

    return (
        <div>
            <ProtokollEditor content={content} setContent={setContent} onSave={handleSave} />
            <button onClick={handleExportToPdf}>
                Als PDF exportieren
            </button>
        </div>
    );
};

export default Protocol;