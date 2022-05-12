import RNFS from 'react-native-fs';
import {useRef, useState} from 'react';
import {Alert} from 'react-native';
import {unzip} from 'react-native-zip-archive';

const useDownloadAssets = () => {
    const [dowloading, setDownloading] = useState(false);
    const [percent, setPercent] = useState(0);
    const assetsBaseFolder = useRef('');

    const start = async (gameId: string) => {
        if (!gameId) return;

        setPercent(0);
        setDownloading(true);
        try {
            assetsBaseFolder.current = `${RNFS.DocumentDirectoryPath}/${gameId}/`;

            await downloadFile(gameId);
            await unZipAssets();

            setDownloading(false);

            // RETURN ASSETS PATH
            return assetsBaseFolder.current + 'assets/';
        } catch (err: any) {
            Alert.alert('Error', err.message);
            return null;
        }
    };

    const downloadFile = async (gameId: string) => {
        const isExist = await RNFS.exists(assetsBaseFolder.current + 'assets/');
        const destination = assetsBaseFolder.current + 'assets.zip';

        if (isExist) return;

        try {
            if (!(await RNFS.exists(assetsBaseFolder.current))) {
                await RNFS.mkdir(assetsBaseFolder.current);
            }
            const url = `https://vtv24.github.io/cdn/${gameId}/assets.zip`;

            const result = await RNFS.downloadFile({
                fromUrl: url,
                toFile: destination,
                begin: () => {
                    console.log('start download', url);
                },
                progress: data => {
                    const percentage =
                        ((100 * data.bytesWritten) / data.contentLength) | 0;
                    setPercent(percentage);
                },
            }).promise;

            if (
                !(result && result.statusCode >= 200 && result.statusCode < 300)
            ) {
                throw new Error();
            }
        } catch (err) {
            console.log('err', err);
            throw new Error('Download failed');
        }
    };

    const unZipAssets = async () => {
        const file = assetsBaseFolder.current + 'assets.zip';
        if (!(await RNFS.exists(file))) return;

        try {
            await unzip(file, assetsBaseFolder.current);
            await RNFS.unlink(file);
        } catch {
            throw new Error('Unzip failed');
        }
    };

    return {percent, dowloading, start, assetsBaseFolder: assetsBaseFolder};
};

export default useDownloadAssets;
