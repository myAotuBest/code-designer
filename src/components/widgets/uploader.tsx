import React, {
  ChangeEvent,
  MouseEvent,
  DragEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Button, Modal } from 'antd';
import styles from './uploader.less';
import Cropper from 'cropperjs';

type UploadStaus = 'ready' | 'loading' | 'success' | 'error';
type FileListType = 'picture' | 'text';
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStaus;
  raw: File;
  resp?: any;
  url?: string | ArrayBuffer;
}

export interface SuccessProps {
  resp: any;
  file: UploadFile;
  list: UploadFile[];
}

export interface IProps {
  action: string;
  beforeUpload?: (file: File) => Promise<File> | boolean;
  listType?: FileListType;
  autoUpload?: boolean;
  success?: (value: SuccessProps) => void;
  fail?: Function;
  src?: string;
}

interface CropDataProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Uploader: React.FC<IProps> = (props) => {
  console.log(props);

  // let [imageBase64, setImageBase64] = useState<string | ArrayBuffer>('')
  let [status, setStatus] = useState<UploadStaus>('ready');
  let [isDragOver, setIsDragOver] = useState<boolean>(false);
  let inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFlieList] = useState<UploadFile[]>([]);
  const [resultImg, setResultImg] = useState<string | ArrayBuffer>(props.src);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const cropperImg = useRef<null | HTMLImageElement>(null);
  let cropper: Cropper;
  let imageBase64: string | ArrayBuffer = '';
  let cropData: CropDataProps | null = null;
  // let fileList = new Array() as UploadFile[]
  const beforeUploadCheck = (files: FileList | null) => {
    if (files) {
      // 上传所需文件
      const uploaderFile = files[0];
      if (props.beforeUpload) {
        const result = props.beforeUpload(uploaderFile);
        if (result && result instanceof Promise) {
          result
            .then((processFile) => {
              if (processFile instanceof File) {
                addFileToList(processFile);
              } else {
                throw new Error(
                  'beforeUpload Promise should return File object'
                );
              }
            })
            .catch((e) => {
              console.error(e);
            });
        } else if (result === true) {
          addFileToList(uploaderFile);
        }
      } else {
        addFileToList(uploaderFile);
      }
    }
  };
  const handleFileChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    beforeUploadCheck(files);
  };

  // 点击div
  const handleClick = (e: MouseEvent) => {
    inputRef && inputRef.current && inputRef.current.click();
  };
  const addFileToList = async (uploadedFile: File) => {
    //  setFileObj()
    let fileObj: UploadFile = {
      uid: uuidv4(),
      name: uploadedFile.name,
      size: uploadedFile.size,
      raw: uploadedFile,
      status: 'ready',
    };
    let reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.addEventListener('load', function (e) {
      imageBase64 = e.target.result;
      // fileObj.url = URL.createObjectURL(uploadedFile);
      fileObj.url = imageBase64;
      setFlieList([...fileList, fileObj]);
      if (props.autoUpload) {
        postFile(fileObj);
      }
      reader = null;
    });
  };
  const postFile = (readyFile: UploadFile) => {
    const formData = new FormData();
    formData.append('file', readyFile.raw);
    axios
      .post(props.action, formData)
      .then(({ data }) => {
        if (data) {
          readyFile.status = 'success';
          readyFile.resp = data;
          // setRespArr([data, ...respArr]);
          setResultImg(readyFile.url);
          // setPageBackground(`url(${readyFile.url}) no-repeat center / 100% 100%`)
          props.success({ resp: data, file: readyFile, list: fileList });
        } else {
          readyFile.status = 'error';
          props.fail(new Error(data));
        }
      })
      .catch((err) => {
        readyFile.status = 'error';
        props.fail(new Error(err));
      })
      .finally(() => {
        if (inputRef.current && inputRef.current.value) {
          inputRef.current.value = '';
        }
      });
  };

  const handleDrag = (e: DragEvent, over: boolean) => {
    e.preventDefault();
    setIsDragOver(over);
  };
  const handleDrap = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer) {
      beforeUploadCheck(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    // console.log('isModalVisible', isModalVisible)
    if (isModalVisible) {
      if (cropperImg.current) {
        cropper = new Cropper(cropperImg.current, {
          crop(event) {
            const { x, y, width, height } = event.detail;
            cropData = {
              x: Math.floor(x),
              y: Math.floor(y),
              width: Math.floor(width),
              height: Math.floor(height),
            };
          },
        });
      }
    }
  }, [isModalVisible]);
  const handleCropper = () => {
    setIsModalVisible(true);

    // cropper = null
  };
  const handleOk = () => {
    setIsModalVisible(false);
    if (cropData) {
      // console.log(cropData)
      let res = cropper
        .getCroppedCanvas({ imageSmoothingQuality: 'high' })
        .toDataURL('image/jpeg');
      setResultImg(res);
      // setPageBackground(`url(${res}) no-repeat center / 100% 100%`)
      cropper.destroy();
    }
  };
  const handleCancel = () => {
    if (cropper) {
      console.log('销毁le');
      cropper.destroy();
      setIsModalVisible(false);
    }
  };

  const handleDelete = (e: MouseEvent) => {
    setResultImg('');
    // setPageBackground('')
    fileList.splice(fileList.length - 1, 1);
  };

  return (
    <div>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        onChange={(e: ChangeEvent) => handleFileChange(e)}
      />
      {!resultImg ? (
        <div
          className={styles.uploader_box}
          onClick={(e: MouseEvent) => handleClick(e)}
          onDragOver={(e: DragEvent) => {
            handleDrag(e, true);
          }}
          onDragLeave={(e: DragEvent) => {
            handleDrag(e, false);
          }}
          onDrop={(e: DragEvent) => handleDrap(e)}
        >
          {/* {props.children} */}
          <p className={styles.uploader_box_span}>
            <span>上传背景图片</span>
            <br />
            <span>可拖拽至此区域</span>
          </p>
        </div>
      ) : (
        <div className={styles.uploader_box_img}>
          <div
            style={{
              background: `url(${resultImg}) no-repeat center / 100% 100%`,
              width: '150px',
              height: '150px',
            }}
          ></div>
          <div>
            <Button onClick={handleCropper}>裁剪图片</Button>
            <br></br>
            <Button onClick={(e: MouseEvent) => handleClick(e)}>
              重新上传
            </Button>
            <br></br>
            <Button onClick={(e: MouseEvent) => handleDelete(e)}>
              删除图片
            </Button>
          </div>
        </div>
      )}
      {/* modal */}
      <Modal
        width={700}
        title="裁剪图片"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ width: '100%' }}>
          <img
            ref={cropperImg}
            src={fileList[0] && (fileList[0].url as string)}
            alt=""
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </Modal>
    </div>
  );
};
export default Uploader;
