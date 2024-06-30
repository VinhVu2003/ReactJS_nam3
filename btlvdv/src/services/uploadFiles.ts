import axios from 'axios';

export default async function uploadFiles(Files?: any): Promise<any> {
    let listImage: string[] = [];
    try {
        if (Files && Files.fileList && Array.isArray(Files.fileList)) {
            await Promise.all(Files.fileList.map(async (file: any) => {
                const formData: FormData = new FormData();
                const data = file.originFileObj;
                formData.append('file', data);
                try {
                    const res = await axios.post("https://localhost:44381/api/UpLoad_/upload", formData, {
                        headers: {
                            "Custom-Header": "value"
                        }
                    });
                    console.log("uploadthanhcong");
                    listImage.push(res.data.filePath);
                } catch (err) {
                    console.log("UploadFile fail" + err);
                }
            }));
        } else {
            console.log("Invalid Files object or fileList is not an array.");
        }

        return listImage;
    } catch (error) {
        console.error("Error uploading files:", error);
        return null;
    }
}

